---
title: The power container
description: Where an entity's powers live, and the full API for reading and mutating them.
---

Every entity that can have powers owns a **power container**. It is the runtime home of that entity's powers: what it has, who granted each one, what is currently suppressed, and any per-power scratch data. Your power type's hooks receive it as `holder`.

## Getting one

```java
PowerContainer container = PowerContainer.of(entity);   // null when the entity has none
if (container == null || container.isEmpty()) return;
```

`PowerContainer.of` takes a plain `Entity`, not a `LivingEntity` — powers work on projectiles, item entities and armour stands as well as mobs. It returns **null** for an entity that has never been given a container, so null-check it before anything else. `isEmpty()` is the cheap second gate and is the first line of almost every built-in handler.

Going the other way:

```java
LivingEntity owner = container.owner();    // null if the owner is not living
Entity raw = container.rawOwner();         // always the real entity
```

## Reading

```java
boolean has = container.hasPower(powerId);            // is this exact power on the entity?
Set<ResourceLocation> all = container.allPowers();    // every power id
Set<ResourceLocation> srcs = container.allSources();  // every source id
Set<ResourceLocation> from = container.sourcesOf(powerId);  // who granted this one
List<ResourceLocation> ids = container.powersOfType(ApoliIds.ELYTRA_FLIGHT);  // by type
```

`powersOfType` takes the **canonical** type id, not an alias. `ApoliIds` holds interned constants for the built-in types — use those rather than building a `ResourceLocation` at the call site. For your own, keep a `private static final ResourceLocation` next to the code that needs it.

> `hasPower` answers "is this power attached", which is not the same as "is it doing anything". A power can be attached and suppressed, or attached with a `condition` that is currently false. For the question you usually mean, see [reading powers](/docs/addon/systems/reading-powers).

## Mutating

```java
container.addPower(powerId, sourceId);            // grant, from a source
container.removePower(powerId, sourceId);         // release one source's claim
container.removeAllFromSource(sourceId);          // drop everything that source granted
container.removePowerCompletely(powerId);         // force-remove, every source
container.clear();                                // everything
```

Each returns `true` when it actually changed something.

Because a power can be granted by several sources at once, the container **reference-counts** them: `removePower` only detaches when the *last* source lets go. That is why `onRemoved` must not assume it is the final removal — check `holder.hasPower(powerId)` first, exactly as the built-ins do:

```java
@Override
public void onRemoved(ResourceLocation powerId, Cfg cfg, PowerContainer holder, ResourceLocation source) {
    if (holder.hasPower(powerId)) return;   // another source still holds it
    // now it is really gone — undo the effect
}
```

`addPower`/`removePower` are the same calls [`apoli:multiple`](/docs/datapack/powers/multiple) uses to attach its sub-powers, with the parent power as the *source*. Anything can be a source id — an origin, a skill tree, a command, another power.

## Suppression

Suppressing a power leaves it attached but inert. It is reference-counted per source in the same way:

```java
container.suppressPower(powerId, sourceId);
container.unsuppressPower(powerId, sourceId);
container.suppressAll(powerIds, sourceId);
container.unsuppressAllFromSource(sourceId);

boolean off = container.isSuppressed(powerId);
Set<ResourceLocation> suppressed = container.suppressedPowers();
Set<ResourceLocation> by = container.suppressionSourcesOf(powerId);
```

Your power type is told about it through two hooks, so a power that applied an attribute modifier or started a render effect can stand down and back up:

```java
@Override public void onSuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { }
@Override public void onUnsuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { }
```

A suppressed power still ticks *nothing* and should be treated as absent by every read. Every helper on `PowerLookup` already skips suppressed powers; if you walk `allPowers()` yourself, you have to check `isSuppressed` yourself too.

## Auxiliary data

A `PowerType` is a **singleton**: one instance serves every entity in the world, so it must be stateless. Per-holder state goes in the container's aux storage, keyed by power id:

```java
int ticks = holder.getAuxIntOr(powerId, 0);

if (holder instanceof PowerContainerImpl impl) {
    impl.setAuxInt(powerId, ticks + 1);
    int[] slots = impl.getAuxInts(powerId);          // multi-value resources
    impl.setAuxInts(powerId, new int[] { 1, 2, 3 });
    CompoundTag nbt = impl.getAuxNbt(powerId);       // anything that is not an int
    impl.setAuxNbt(powerId, tag);
    int[] scratch = impl.scratchInts(powerId, 4);    // in-memory only, never saved
}
```

The read side (`getAuxInt`, `getAuxIntOr`, `getAuxInts`) is on the `PowerContainer` interface. The write side lives on `PowerContainerImpl` — instance-check for it, as the built-ins do.

`scratchInts` is the odd one out: it hands back a mutable array that lives only in memory and is never written to disk or sent to the client. Use it for schedules and interpolation state that would be wrong to persist.

> Storing per-entity state in a field on your `PowerType` is the classic addon bug: every entity in the world would share it. Always key state by the holder.

## Persistence & syncing

`markDirty()` tells the container its saved form and its synced form are both stale:

```java
impl.setAuxInt(powerId, value);
holder.markDirty();
```

Every mutation path you add needs a `markDirty()`. A stale cache that never persists is a **data-loss bug**, which is worse than a slow one — the aux setters themselves do not guess when you are finished.

Serialization is a hot path in its own right: an entity's NBT is written for every chunk save and for every `nbt=` selector candidate, so the container serves a cached save tag rather than re-encoding. That cache is what `markDirty()` invalidates.

## Performance shape

Lookups you do per tick, per hit or per entity in a selector must be O(1) against the container's own indexes — `powersOfType` reads a type index, not a scan. Never walk `allPowers()` on a hot path. The early-out ladder every built-in uses is:

```java
PowerContainer container = PowerContainer.of(entity);
if (container == null || container.isEmpty()) return;
List<ResourceLocation> powers = container.powersOfType(TYPE_ID);
if (powers.isEmpty()) return;
// only now do the expensive part
```

See [performance](/docs/addon/systems/performance) for the rest of the rules.
