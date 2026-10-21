---
title: Auxiliary state & persistence
description: "Storing data for each power that saves with the entity and survives relogs."
---

A [`PowerType`](/docs/addon/api/registering-power-types) is a singleton, with one instance serving every entity, so it must be stateless. Anything a power needs to remember between ticks, such as a counter, a timer or an accumulated value, lives in the [power container](/docs/addon/systems/power-container)'s auxiliary data, keyed by power ID.

## Reading and writing aux data

The aux setters live on `PowerContainerImpl`:

```java
if (holder instanceof PowerContainerImpl impl) {
    int ticks = impl.getAuxInt(powerId).orElse(0);
    impl.setAuxInt(powerId, ticks + 1);
}
```

There are typed accessors for the common cases (`getAuxInt` and `setAuxInt`), and a general NBT tag through `getAuxNbt` and `setAuxNbt`. Store what you need under the power's own ID so it never collides with another power.

## Clean up on removal

Remove aux data when the power is really gone. Here `removeAux` clears it once the last source has let go:

```java
@Override public void onRemoved(ResourceLocation id, Cfg cfg, PowerContainer holder, ResourceLocation source) {
    if (!holder.hasPower(id) && holder instanceof PowerContainerImpl impl) {
        impl.removeAux(id);
    }
}
```

Because a power can be granted by several sources, only clear state once `hasPower` says the power is finally absent.

## Keep state in the container

Aux data is saved with the entity and restored on load, so a resource keeps its value across relogs. State you keep outside the container, such as a `Map<UUID, ...>`, isn't saved and leaks. Two rules follow:

1. Prefer aux data over external maps.
2. If you must use an external map, for example for temporary client state, clear the entry when the entity is removed.

```java
public static void onEntityGone(UUID entityId) {
    MY_STATE.keySet().removeIf(k -> k.entityUUID().equals(entityId));
}
```

## Mark dirty when you mutate

Cached saving and client sync only update when the container is told the data changed. `setAuxInt` and `setAuxInts` mark the container dirty themselves when the value changes. After any other change to stored state, including `setAuxNbt`, call `markDirty()`. A stale cache that never saves again is a data loss bug, which is worse than a slow one.
