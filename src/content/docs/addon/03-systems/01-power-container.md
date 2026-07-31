---
title: The power container
description: Where an entity's powers live, and how to read and mutate them.
---

Every entity that can have powers owns a **power container**. It's the runtime home of that entity's powers: what it has, who granted each one, and any per-power scratch data. Your power type's hooks receive it as `holder`.

## What it holds

- the set of powers on the entity,
- the **source** that granted each power (an id — an origin, a command, another power),
- optional **auxiliary data** per power (counters, timers, cached state).

Because a power can be granted by several sources at once, the container reference-counts them. A power is only truly removed when its *last* source lets go — which is why `onRemoved` should check before undoing anything permanent.

## Reading it

```java
LivingEntity entity = holder.owner();      // the entity itself
boolean has = holder.hasPower(powerId);    // does it have this power?
```

## Mutating it

```java
holder.addPower(powerId, sourceId);           // grant, from a source
holder.removePower(powerId, sourceId);        // release one source's claim
holder.removePowerCompletely(powerId);        // force-remove, all sources
```

`addPower`/`removePower` are the same calls [`apoli:multiple`](/docs/datapack/powers/multiple) uses to attach and detach its sub-powers — the parent power is the *source*.

## Auxiliary data

Powers that need to remember something between ticks — a cooldown counter, an accumulated value — store it on the container rather than in a field on the power object. A `PowerType` is a **singleton**: one instance serves every entity, so it must be stateless. Per-holder state goes in the container's aux storage:

```java
if (holder instanceof PowerContainerImpl impl) {
    int ticks = impl.getAuxInt(powerId).orElse(0);
    impl.setAuxInt(powerId, ticks + 1);
}
```

> Storing per-entity state in a field on your `PowerType` is the classic addon bug: every entity would share it. Always key state by the holder — via aux data or a map keyed by the entity's UUID that you clean up on removal.

## Persistence & syncing

The container is saved with the entity and synced to the client that needs it. When you mutate power state, mark it dirty so the change is written and sent — a stale cache that never persists is a data-loss bug, worse than a slow one. Apoli exposes the dirty/mark hooks alongside the aux setters; use them whenever you change stored state.

## Performance shape

Lookups you do per tick or per hit must be O(1) against the container's indexes, never a walk over all powers. The container maintains those indexes and invalidates them on change — lean on them instead of scanning.
