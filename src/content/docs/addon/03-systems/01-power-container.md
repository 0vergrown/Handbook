---
title: The power container
description: "Where an entity's powers live, and the full API for reading and changing them."
---

Every entity that can have powers owns a power container. It is the runtime home of that entity's powers: what it has, who granted each one, what is suppressed, and any scratch data for each power. Your power type's hooks receive it as `holder`.

## Getting one

```java
PowerContainer container = PowerContainer.of(entity);
if (container == null || container.isEmpty()) return;
```

`PowerContainer.of` takes a plain `Entity`, not a `LivingEntity`, because powers work on projectiles, item entities and armour stands as well as mobs. It returns null for an entity that has never been given a container, so null-check it before anything else. `isEmpty()` is the cheap second check and the first line of almost every built-in handler.

Going the other way:

```java
LivingEntity owner = container.owner();
Entity raw = container.rawOwner();
```

`owner()` is null when the owner isn't living, and `rawOwner()` is always the real entity.

## Reading

```java
boolean has = container.hasPower(powerId);
Set<ResourceLocation> all = container.allPowers();
Set<ResourceLocation> srcs = container.allSources();
Set<ResourceLocation> from = container.sourcesOf(powerId);
List<ResourceLocation> ids = container.powersOfType(ApoliIds.ELYTRA_FLIGHT);
```

`hasPower` checks whether this exact power is on the entity, `allPowers` and `allSources` list every power ID and every source ID, `sourcesOf` says who granted one power, and `powersOfType` finds the powers of one type.

`powersOfType` takes the canonical type ID, not an alias. `ApoliIds` holds interned constants for the built-in types, so use those instead of building a `ResourceLocation` at the call site. For your own types, keep a `private static final ResourceLocation` next to the code that needs it.

> [!NOTE]
> `hasPower` answers whether the power is attached, which isn't the same as whether it is doing anything. A power can be attached and suppressed, or attached with a `condition` that is currently false. For the question you usually mean, see [reading powers](/docs/addon/systems/reading-powers).

## Changing what it holds

```java
container.addPower(powerId, sourceId);
container.removePower(powerId, sourceId);
container.removeAllFromSource(sourceId);
container.removePowerCompletely(powerId);
container.clear();
```

In order, these grant a power from a source, release one source's claim on it, drop everything a source granted, remove a power for every source at once, and remove everything. The first four return `true` when they changed something.

Because a power can be granted by several sources at once, the container counts them, and `removePower` only detaches the power when the last source lets go. That is why `onRemoved` must not assume it is the final removal. Check `holder.hasPower(powerId)` first, as the built-in types do, and only undo the effect once it is false:

```java
@Override
public void onRemoved(ResourceLocation powerId, Cfg cfg, PowerContainer holder, ResourceLocation source) {
    if (holder.hasPower(powerId)) return;
    undo(holder);
}
```

`addPower` and `removePower` are the same calls [`apoli:multiple`](/docs/datapack/powers/multiple) uses to attach its sub-powers, with the parent power as the source. Anything can be a source ID: an origin, a skill tree, a command or another power.

## Suppression

Suppressing a power leaves it attached but inert, and it is counted per source in the same way:

```java
container.suppressPower(powerId, sourceId);
container.unsuppressPower(powerId, sourceId);
container.suppressAll(powerIds, sourceId);
container.unsuppressAllFromSource(sourceId);

boolean off = container.isSuppressed(powerId);
Set<ResourceLocation> suppressed = container.suppressedPowers();
Set<ResourceLocation> by = container.suppressionSourcesOf(powerId);
```

Your power type hears about it through two hooks, so a power that applied an attribute modifier or started a render effect can take it down and put it back:

```java
@Override public void onSuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { }
@Override public void onUnsuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { }
```

A suppressed power doesn't tick and should be treated as absent by every read. Every helper on `PowerLookup` already skips suppressed powers, and if you walk `allPowers()` yourself, you have to check `isSuppressed` too.

## Auxiliary data

A `PowerType` is a singleton: one instance serves every entity in the world, so it must be stateless. State for each holder goes in the container's aux storage, keyed by power ID:

```java
int ticks = holder.getAuxIntOr(powerId, 0);

if (holder instanceof PowerContainerImpl impl) {
    impl.setAuxInt(powerId, ticks + 1);
    int[] slots = impl.getAuxInts(powerId);
    impl.setAuxInts(powerId, new int[] { 1, 2, 3 });
    CompoundTag nbt = impl.getAuxNbt(powerId);
    impl.setAuxNbt(powerId, tag);
    int[] scratch = impl.scratchInts(powerId, 4);
}
```

`getAuxInts` and `setAuxInts` hold several values, as table resources do, and `getAuxNbt` and `setAuxNbt` hold anything that isn't an int. The read side (`getAuxInt`, `getAuxIntOr`, `getAuxInts`) is on the `PowerContainer` interface, and the write side lives on `PowerContainerImpl`, so check for it with `instanceof`, as the built-in types do.

`scratchInts` is the odd one out: it returns a mutable array that only lives in memory and is never written to disk or sent to the client. Use it for schedules and interpolation state that would be wrong to save.

> [!WARNING]
> Storing per-entity state in a field on your `PowerType` is the classic addon bug, because every entity in the world would share it. Always key state by the holder.

## Persistence and syncing

`markDirty()` tells the container that its saved form and its synced form are both out of date:

```java
impl.setAuxInt(powerId, value);
holder.markDirty();
```

`setAuxInt` and `setAuxInts` call it themselves when the value changes. `setAuxNbt` clears the cached save tag and sends the tag to the owning player, but doesn't mark the container dirty, so call `markDirty()` after it when other clients need the change, and after any other change to saved state. A stale cache that never saves is a data loss bug, which is worse than a slow one.

Saving is a hot path in its own right. An entity's NBT is written for every chunk save and for every `nbt=` selector candidate, so the container serves a cached save tag instead of encoding again. That cache is what `markDirty()` clears.

## Performance shape

Lookups you do every tick, on every hit or for every entity in a selector must be O(1) against the container's own indexes. `powersOfType` reads a type index instead of scanning. Never walk `allPowers()` on a hot path. Every built-in type checks things in this order, and only does the expensive part after the last check:

```java
PowerContainer container = PowerContainer.of(entity);
if (container == null || container.isEmpty()) return;
List<ResourceLocation> powers = container.powersOfType(TYPE_ID);
if (powers.isEmpty()) return;
```

See [performance](/docs/addon/systems/performance) for the rest of the rules.
