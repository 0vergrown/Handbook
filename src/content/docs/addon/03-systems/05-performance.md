---
title: Performance
description: The non-negotiable rules for addon code that runs on a live server.
---

Apoli runs on live, multiplayer servers, and its code sits in some of the hottest paths in the game — every tick, every entity, every hit, every chunk save. Sloppy addon code here costs real TPS. **These rules are not style suggestions; treat them as part of the API contract.**

## Classify before you write

Every code path has a call frequency. Name it before writing:

| Frequency                     | Examples                           | Budget     |
|-------------------------------|------------------------------------|------------|
| load-time                     | registration, codec build          | generous   |
| per-event                     | on hit, on use, on death           | modest     |
| **per-tick**                  | `PowerType.tick`, action-over-time | tight      |
| **per-entity-per-tick**       | tick × every holder                | very tight |
| **per-collision / per-frame** | AoE, raycast, rendering            | brutal     |

The last three are **hot paths**. The rules below apply to them without exception.

## The rules

1. **Don't allocate on hot paths.** No `new ResourceLocation(...)` / `MyMod.id(...)` per call — use interned constants. No defensive `List.copyOf` / `Set.copyOf` per call, no `Optional` chains, no streams.
2. **Index, don't scan.** A lookup that runs per tick or per collision must be O(1) against a cached index, invalidated on change — never a walk over all powers or entries.
3. **Serialization is a hot path.** `Entity.writeNbt()` runs for every `nbt=` selector candidate and every chunk save. Anything hooked into it must serve *cached* data, never a fresh codec encode.
4. **Cache invalidation is part of the feature.** Every mutation must invalidate the caches it affects (`markDirty` / `setAuxNbt`). A stale cache is a data-loss bug — worse than slowness.
5. **Mixin config plugins must not load classes.** `Class.forName` defines the class and its vanilla supertypes too early and breaks other mods' mixins. Use `ClassLoader.getResource("path/To/Class.class") != null` or the loader's `isModLoaded`.
6. **Profile before and after.** When you touch a tick path, run Spark on a dev server and compare the mod's share of the server thread.

## Stateless singletons

A `PowerType` / `ActionType` / `ConditionType` is one instance for the whole game. Never store per-entity state in a field on it — every entity would share it. Per-holder state goes in [aux data](/docs/addon/systems/aux-and-persistence), keyed by the entity.

## Raw-first entities

Contexts return `raw()` entities by default because most work doesn't need `LivingEntity`, and calling `living()` on a projectile crashes. Take the raw entity, and only narrow to living when you actually need it — it's both safer and cheaper.

## opt in to non-living ticking

Ticking runs on living entities by default. If your power needs to tick on projectiles or item entities, override `ticksNonLivingEntities()` to return `true` — but only then, since it widens a hot loop.

## A worked example

Bad — allocates and scans every tick:

```java
@Override public void tick(ResourceLocation id, Cfg cfg, PowerContainer holder) {
    for (var p : holder.getPowers()) {                 // scan
        if (p.equals(new ResourceLocation("mymod:x"))) // allocation
            doThing();
    }
}
```

Good — O(1), no allocation:

```java
private static final ResourceLocation X = MyMod.id("x"); // interned once

@Override public void tick(ResourceLocation id, Cfg cfg, PowerContainer holder) {
    if (holder.hasPower(X)) doThing();                 // indexed lookup
}
```

## See also

- [Auxiliary state](/docs/addon/systems/aux-and-persistence)
- [The power container](/docs/addon/systems/power-container) — the indexes you lean on.
