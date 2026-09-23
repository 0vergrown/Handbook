---
title: Powers on an entity
description: Detect, read, grant, revoke and suppress powers from Java — and store state per entity.
---

Everything here needs two imports and one habit: intern your ids.

```java
import dev.overgrown.apoli.power.ApoliIds;        // built-in type ids
import dev.overgrown.apoli.power.PowerContainer;
import dev.overgrown.apoli.power.PowerLookup;

private static final ResourceLocation GLIDE = MyMod.id("glide");
```

## Is this power active?

"Active" means attached, not suppressed, and its own `condition` passing right now. That is almost always the question you mean:

```java
if (PowerLookup.hasActive(player, GLIDE)) {
    // …
}
```

It takes a plain `Entity`, tolerates `null`, and returns `false` for an entity with no container. Safe to call every tick.

The **type id**, not the power id, is what goes in. `PowerLookup.hasActive(entity, GLIDE)` asks "does this entity have *any* active power whose `"type"` is `mymod:glide`" — which is what a handler wants, because a pack may define three different glide powers.

### Attached versus active

```java
PowerContainer container = PowerContainer.of(entity);
boolean attached = container != null && container.hasPower(MyMod.id("my_pack:winged"));
```

`hasPower` takes the **power** id and ignores suppression and conditions. Use it for GUI listings, commands and persistence checks — not for gameplay.

## Read its config

```java
GlidePower.Cfg cfg = PowerLookup.firstActive(entity, GLIDE, GlidePower.Cfg.class);
if (cfg != null) {
    motion = motion.scale(cfg.speed());
}
```

When several powers of the type can apply at once, fold them. `collect` appends into a list you own, which keeps the loop plain and the allocations yours to control:

```java
private static final List<GlidePower.Cfg> SCRATCH = new ArrayList<>();

float total = 0f;
SCRATCH.clear();
PowerLookup.collect(entity, GLIDE, GlidePower.Cfg.class, SCRATCH);
for (int i = 0; i < SCRATCH.size(); i++) total += SCRATCH.get(i).speed();
```

> `forEach` is the shorter spelling, but a lambda that closes over a local is an allocation, and a local cannot be reassigned from inside one anyway. On a cold path use `forEach`; on a hot one use `collect` into a reused list, as above. A `static` scratch list is only safe on the server thread — give it a `ThreadLocal` or a field if yours is touched from the render thread too.

When you need the id as well as the config — to write a resource, trigger a cooldown, or attribute an effect:

```java
PowerLookup.forEachEntry(entity, GLIDE, GlidePower.Cfg.class, (powerId, cfg) -> {
    holder.setAuxInt(powerId, cfg.duration());
});
```

`forEach` and `forEachEntry` also push the power onto the attribution stack, so anything that happens inside is credited to it in the ledger. `hasActive` and `firstActive` do not.

## Grant and revoke

```java
PowerContainer container = PowerContainer.of(entity);
if (container == null) return;

container.addPower(powerId, MyMod.id("my_artefact"));     // the source is yours to name
container.removePower(powerId, MyMod.id("my_artefact"));
```

The second argument is a **source**: a plain id with no registry behind it, naming who is responsible. Use one id per system you own.

Sources are reference-counted. If an origin and your artefact both grant `my_pack:winged`, your `removePower` does not take it away — it only drops your claim, and the power stays until the origin lets go too. That is the behaviour you want; it is also why `onRemoved` on a power type must check `holder.hasPower(powerId)` before undoing anything.

To drop everything your system granted at once — on unequip, on a class change:

```java
container.removeAllFromSource(MyMod.id("my_artefact"));
```

`removePowerCompletely(powerId)` ignores reference counting and rips the power off whoever granted it. It is for admin commands, not for gameplay.

## Suppress instead of revoke

When the power should come back exactly as it was — a debuff, a silence, a phase of a boss fight — suppress it rather than revoking it. The power stays attached, keeps its resources and its aux data, and goes completely inert:

```java
container.suppressPower(powerId, MyMod.id("silenced"));
// …later
container.unsuppressPower(powerId, MyMod.id("silenced"));
container.unsuppressAllFromSource(MyMod.id("silenced"));   // release every one at once
```

Suppression is reference-counted per source too, so two systems can silence the same power and it comes back only when both release it.

If your own power type holds external state — an attribute modifier, a render flag — implement the two hooks so it stands down cleanly:

```java
@Override public void onSuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { removeModifier(holder); }
@Override public void onUnsuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { addModifier(holder); }
```

## What does this source grant?

The reverse lookup, and it works for origins, layers, skill trees and `apoli:multiple` powers alike:

```java
import dev.overgrown.apoli.power.PowerSources;

Set<ResourceLocation> powers = PowerSources.powersOf(sourceId);  // null when unknown
```

Teach it about your own system once, and every source-aware feature — `/apoli:power sources`, `grant_all`, the ledger, other addons — learns it:

```java
PowerSources.register(new PowerSources.Provider() {
    @Override
    public @Nullable Collection<ResourceLocation> powersOf(ResourceLocation sourceId) {
        ArtefactDef def = ArtefactRegistry.get(sourceId);
        return def == null ? null : def.powers();      // null, not empty, when unknown
    }

    @Override
    public void collectSources(Collection<ResourceLocation> out) {
        for (ArtefactDef def : ArtefactRegistry.all()) out.add(def.id());
    }
});
```

## Per-entity state

A `PowerType` is a singleton — one instance for the whole server — so it must not hold per-entity fields. State goes on the container, keyed by power id:

```java
@Override
public void tick(ResourceLocation powerId, Cfg cfg, PowerContainer holder) {
    int charge = holder.getAuxIntOr(powerId, 0);
    if (charge >= cfg.maxCharge()) return;

    if (holder instanceof PowerContainerImpl impl) {
        impl.setAuxInt(powerId, charge + 1);
        holder.markDirty();
    }
}
```

| Store | Use |
| --- | --- |
| one number | `getAuxIntOr` / `setAuxInt` |
| several numbers | `getAuxInts` / `setAuxInts` |
| anything else | `getAuxNbt` / `setAuxNbt` |
| throwaway per-tick scratch | `scratchInts(powerId, length)` |

`scratchInts` is memory-only: never saved, never synced. It is the right home for a schedule or an interpolation cursor that would be wrong to restore from disk.

**Every write needs `markDirty()`.** The container serves a cached NBT tag to chunk saves and to `nbt=` selectors; without the mark, your change is invisible to both and is lost on restart.

## The early-out ladder

Every built-in handler opens the same way, and a hot-path one should too:

```java
PowerContainer container = PowerContainer.of(entity);
if (container == null || container.isEmpty()) return;
List<ResourceLocation> powers = container.powersOfType(GLIDE);
if (powers.isEmpty()) return;
// only now build a context, allocate, or read the level
```

The three cheap checks eliminate almost every entity on a busy server before anything expensive runs. `PowerLookup` already does this internally — the ladder only matters when you walk the container yourself.
