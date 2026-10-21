---
title: Powers on an entity
description: "Detecting, reading, granting, revoking and suppressing powers from Java, and storing state for each entity."
---

Everything here needs a few imports and one habit: intern your IDs. `ApoliIds` holds the IDs of the built-in types.

```java
import dev.overgrown.apoli.power.ApoliIds;
import dev.overgrown.apoli.power.PowerContainer;
import dev.overgrown.apoli.power.PowerLookup;

private static final ResourceLocation GLIDE = MyMod.id("glide");
```

## Is this power active?

Active means attached, not suppressed, and its own `condition` passing right now. That is almost always the question you mean:

```java
if (PowerLookup.hasActive(player, GLIDE)) {
    startGliding(player);
}
```

It takes a plain `Entity`, accepts `null`, and returns `false` for an entity with no container. It is safe to call every tick.

The type ID goes in, not the power ID. `PowerLookup.hasActive(entity, GLIDE)` asks whether the entity has any active power whose `"type"` is `mymod:glide`, which is what a handler wants, because a pack may define three different glide powers.

### Attached versus active

```java
private static final ResourceLocation WINGED = ResourceLocation.fromNamespaceAndPath("my_pack", "winged");

PowerContainer container = PowerContainer.of(entity);
boolean attached = container != null && container.hasPower(WINGED);
```

`hasPower` takes the power ID and ignores suppression and conditions. Use it for lists in screens, commands and persistence checks, and not for gameplay.

## Read its config

```java
GlidePower.Cfg cfg = PowerLookup.firstActive(entity, GLIDE, GlidePower.Cfg.class);
if (cfg != null) {
    motion = motion.scale(cfg.speed());
}
```

When several powers of the type can apply at once, fold them together. `collect` adds them to a list you own, which keeps the loop plain and leaves the allocations in your hands:

```java
private static final List<GlidePower.Cfg> SCRATCH = new ArrayList<>();

float total = 0f;
SCRATCH.clear();
PowerLookup.collect(entity, GLIDE, GlidePower.Cfg.class, SCRATCH);
for (int i = 0; i < SCRATCH.size(); i++) total += SCRATCH.get(i).speed();
```

> [!TIP]
> `forEach` is shorter to write, but a lambda that captures a local is an allocation, and a local can't be reassigned from inside one anyway. On a cold path use `forEach`, and on a hot one use `collect` into a reused list, as above. A `static` scratch list is only safe on the server thread, so give it a `ThreadLocal` or a field if yours is used from the render thread too.

When you need the ID as well as the config, to write a resource, trigger a cooldown or attribute an effect:

```java
PowerLookup.forEachEntry(entity, GLIDE, GlidePower.Cfg.class, (powerId, cfg) -> {
    holder.setAuxInt(powerId, cfg.duration());
});
```

`forEach` and `forEachEntry` also push the power onto the attribution stack, so anything that happens inside is credited to it in the ledger. `hasActive` and `firstActive` don't.

## Grant and revoke

```java
PowerContainer container = PowerContainer.of(entity);
if (container == null) return;

container.addPower(powerId, MyMod.id("my_artefact"));
container.removePower(powerId, MyMod.id("my_artefact"));
```

The second argument is a source: a plain ID with no registry behind it, naming who is responsible, and the name is yours to choose. Use one ID for each system you own.

Sources are counted. If an origin and your artefact both grant `my_pack:winged`, your `removePower` doesn't take it away. It only drops your claim, and the power stays until the origin lets go too. That is the behaviour you want, and it is also why `onRemoved` on a power type must check `holder.hasPower(powerId)` before undoing anything.

To drop everything your system granted at once, on unequip or on a class change:

```java
container.removeAllFromSource(MyMod.id("my_artefact"));
```

`removePowerCompletely(powerId)` ignores the counting and takes the power away from whoever granted it. It is for admin commands, not for gameplay.

## Suppress instead of revoke

When the power should come back exactly as it was, as with a debuff, a silence or a phase of a boss fight, suppress it instead of revoking it. The power stays attached, keeps its resources and aux data, and goes completely inert. `unsuppressPower` lifts it again later, and `unsuppressAllFromSource` releases every power that source suppressed at once:

```java
container.suppressPower(powerId, MyMod.id("silenced"));
container.unsuppressPower(powerId, MyMod.id("silenced"));
container.unsuppressAllFromSource(MyMod.id("silenced"));
```

Suppression is counted per source too, so two systems can silence the same power and it only comes back when both release it.

If your own power type holds outside state, such as an attribute modifier or a render flag, implement the two hooks so it switches off cleanly:

```java
@Override public void onSuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { removeModifier(holder); }
@Override public void onUnsuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { addModifier(holder); }
```

## What does this source grant?

The reverse lookup works for origins, layers, skill trees and `apoli:multiple` powers alike, and returns null for a source it doesn't know:

```java
import dev.overgrown.apoli.power.PowerSources;

Set<ResourceLocation> powers = PowerSources.powersOf(sourceId);
```

Tell it about your own system once, and every feature that knows about sources picks it up: `/apoli:power has` (which lists each power with its sources), `grant_all`, the ledger, and other addons. Return null, not an empty set, for a source you don't know:

```java
PowerSources.register(new PowerSources.Provider() {
    @Override
    public @Nullable Collection<ResourceLocation> powersOf(ResourceLocation sourceId) {
        ArtefactDef def = ArtefactRegistry.get(sourceId);
        return def == null ? null : def.powers();
    }

    @Override
    public void collectSources(Collection<ResourceLocation> out) {
        for (ArtefactDef def : ArtefactRegistry.all()) out.add(def.id());
    }
});
```

## Per-entity state

A `PowerType` is a singleton, one instance for the whole server, so it must not hold fields for each entity. State goes on the container, keyed by power ID:

```java
@Override
public void tick(ResourceLocation powerId, Cfg cfg, PowerContainer holder) {
    int charge = holder.getAuxIntOr(powerId, 0);
    if (charge >= cfg.maxCharge()) return;

    if (holder instanceof PowerContainerImpl impl) {
        impl.setAuxInt(powerId, charge + 1);
    }
}
```

| Store | Use |
| --- | --- |
| One number | `getAuxIntOr` and `setAuxInt` |
| Several numbers | `getAuxInts` and `setAuxInts` |
| Anything else | `getAuxNbt` and `setAuxNbt` |
| Throwaway scratch space for each tick | `scratchInts(powerId, length)` |

`scratchInts` only lives in memory, and is never saved or synced. It is the right home for a schedule or an interpolation cursor that would be wrong to restore from disk.

> [!WARNING]
> The container serves a cached NBT tag to chunk saves and to `nbt=` selectors, and a change it isn't told about is invisible to both and lost on restart. `setAuxInt` and `setAuxInts` mark the container dirty themselves when the value changes. Every other write, including `setAuxNbt`, needs a `markDirty()`.

## The early-out ladder

Every built-in handler opens the same way, and a handler on a hot path should too. Only after these checks does it build a context, allocate or read the level:

```java
PowerContainer container = PowerContainer.of(entity);
if (container == null || container.isEmpty()) return;
List<ResourceLocation> powers = container.powersOfType(GLIDE);
if (powers.isEmpty()) return;
```

The three cheap checks rule out almost every entity on a busy server before anything expensive runs. `PowerLookup` already does this internally, so the ladder only matters when you walk the container yourself.
