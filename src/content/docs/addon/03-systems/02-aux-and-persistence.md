---
title: Auxiliary state & persistence
description: Store per-power data that saves with the entity and survives relog.
---

A [`PowerType`](/docs/addon/api/registering-power-types) is a **singleton** — one instance serves every entity — so it must be stateless. Anything a power needs to remember between ticks (a counter, a timer, an accumulated value) lives in the [power container](/docs/addon/systems/power-container)'s **auxiliary data**, keyed by power id.

## Reading & writing aux data

Aux accessors live on `PowerContainerImpl`:

```java
if (holder instanceof PowerContainerImpl impl) {
    int ticks = impl.getAuxInt(powerId).orElse(0);
    impl.setAuxInt(powerId, ticks + 1);
}
```

There are typed accessors for the common cases (`getAuxInt`/`setAuxInt`, and a general NBT tag via `getAuxNbt`/`setAuxNbt`). Store what you need under the power's own id so it never collides with another power.

## Clean up on removal

Aux data outlives nothing it shouldn't — remove it when the power is truly gone:

```java
@Override public void onRemoved(ResourceLocation id, Cfg cfg, PowerContainer holder, ResourceLocation source) {
    if (!holder.hasPower(id) && holder instanceof PowerContainerImpl impl) {
        impl.removeAux(id); // last source let go
    }
}
```

Because a power can be granted by several sources, only clear state once `hasPower` reports the power is finally absent.

## Persistence is opt-in per value

Aux data is serialised with the entity and restored on load, so a resource keeps its value across relog. If you keep state *outside* the container — say a `Map<UUID, ...>` — it will **not** persist and will leak. Two rules:

1. Prefer aux data over external maps.
2. If you must use an external map (e.g. for transient client state), clear the entry when the entity is removed.

```java
public static void onEntityGone(UUID entityId) {
    MY_STATE.keySet().removeIf(k -> k.entityUUID().equals(entityId));
}
```

## Mark dirty when you mutate

Cached serialisation and client sync only update when the container is told the data changed. After mutating stored state, mark it dirty (`markDirty` / `setAuxNbt` do this for you). A stale cache that never re-saves is a **data-loss bug** — worse than a slow one.
