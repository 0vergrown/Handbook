---
title: Performance
description: "The rules for addon code that runs on a live server."
---

Apoli runs on live multiplayer servers, and its code sits in some of the hottest paths in the game: every tick, every entity, every hit, every chunk save. Careless addon code here costs real TPS. Treat these rules as part of the API contract.

## Classify before you write

Every code path has a call frequency. Name it before writing:

| Frequency | Examples | Budget |
| --- | --- | --- |
| Load time | Registration, building codecs | Generous |
| Per event | On hit, on use, on death | Modest |
| Per tick | `PowerType.tick`, action over time | Tight |
| Per entity per tick | A tick multiplied by every holder | Very tight |
| Per collision or per frame | Areas, raycasts, rendering | Brutal |

The last three are hot paths, and the rules below apply to them without exception.

## The rules

1. Don't allocate on hot paths. Don't call `new ResourceLocation(...)` or `MyMod.id(...)` on every call, and use interned constants instead. No defensive `List.copyOf` or `Set.copyOf` per call, no `Optional` chains and no streams.
2. Index instead of scanning. A lookup that runs every tick or on every collision must be O(1) against a cached index that is invalidated on change, never a walk over all powers or entries.
3. Saving is a hot path. `Entity.writeNbt()` runs for every `nbt=` selector candidate and every chunk save, and anything hooked into it must serve cached data, never a fresh codec encode.
4. Cache invalidation is part of the feature. Every change must invalidate the caches it affects, with `markDirty`. A stale cache is a data loss bug, which is worse than slowness.
5. Mixin config plugins must not load classes. `Class.forName` defines the class and its vanilla supertypes too early and breaks other mods' mixins. Use `ClassLoader.getResource("path/To/Class.class") != null` or the loader's `isModLoaded`.
6. Profile before and after. When you touch a tick path, run Spark on a dev server and compare the mod's share of the server thread.

## Gate global hooks on held types

A mixin on a method the whole game calls, such as a block's collision shape, an entity's fluid update or `onClimbable`, runs for every entity whether or not anyone holds your power. Before looking anything up, check whether anyone holds the type at all:

```java
public static final PowerTypeUsage.Handle HELD = PowerTypeUsage.handle(MY_TYPE);

if (!entity.level().isClientSide() && !HELD.isHeld()) return original;
```

`isHeld()` is one array read. The set of held types is rebuilt on the server once a tick from the powered entities, and is updated straight away when a power is granted or an entity with powers loads, so it never misses someone who holds the type. It only describes the server. On the client, where the entities that matter are the local player and what it controls, skip the check.

Pair the check with an injector that doesn't allocate. `@ModifyReturnValue` and `@ModifyExpressionValue` from MixinExtras allocate nothing, while a cancellable `@Inject` allocates a `CallbackInfoReturnable` on every call.

## Stateless singletons

A `PowerType`, `ActionType` or `ConditionType` is one instance for the whole game. Never store per-entity state in a field on it, because every entity would share it. State for each holder goes in [aux data](/docs/addon/systems/aux-and-persistence), keyed by the entity.

## Raw entities first

Contexts return `raw()` entities by default because most work doesn't need a `LivingEntity`, and `living()` returns null for a projectile. Take the raw entity, and only narrow to a living one when you actually need it, which is both safer and cheaper.

## Ticking non-living entities

Ticking runs on living entities by default. If your power needs to tick on projectiles or item entities, override `ticksNonLivingEntities()` to return `true`, and only then, since it widens a hot loop.

## A worked example

This version scans every power and allocates a `ResourceLocation` on every tick:

```java
@Override public void tick(ResourceLocation id, Cfg cfg, PowerContainer holder) {
    for (var p : holder.allPowers()) {
        if (p.equals(ResourceLocation.fromNamespaceAndPath("mymod", "x")))
            doThing();
    }
}
```

This one interns the ID once and does an indexed lookup, with no allocation:

```java
private static final ResourceLocation X = MyMod.id("x");

@Override public void tick(ResourceLocation id, Cfg cfg, PowerContainer holder) {
    if (holder.hasPower(X)) doThing();
}
```
