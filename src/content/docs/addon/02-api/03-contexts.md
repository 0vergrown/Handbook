---
title: Contexts
description: The objects passed to actions and conditions — how you reach the entity, level and target.
---

Every action's `run` and condition's `test` receives a **context** — a small object holding the entities and level involved. The context *type* is what makes an action or condition a particular [flavour](/docs/datapack/introduction/actions). This page covers each context's API.

## EntityCtx

For entity actions and conditions. A record of one entity and its level:

```java
public record EntityCtx(Entity entity, Level level) {
    public Entity raw();         // the entity, as a plain Entity
    public LivingEntity living(); // the entity as a LivingEntity (may throw if not living)
}
```

- **`raw()`** — use this by default. It works for *any* entity: players, mobs, projectiles, item entities.
- **`living()`** — only when you need `LivingEntity` behaviour (health, effects, equipment).

```java
@Override public boolean test(EmptyCfg cfg, EntityCtx ctx) {
    return ctx.raw().isOnFire();
}
```

> Reaching for `living()` on a context that might hold a non-living entity is a crash. If your action could run on projectiles or items, branch on `ctx.raw() instanceof LivingEntity`.

## BiEntityCtx

For bi-entity actions and conditions. Holds an **actor** and a **target**:

```java
public final class BiEntityCtx {
    public Entity actor();          public Entity target();
    public LivingEntity livingActor(); public LivingEntity livingTarget();
    public Entity rawActor();       public Entity rawTarget();
    public Level level();
}
```

Which entity is actor vs target is set by the power. For `apoli:action_on_hit`, the actor is the attacker and the target is the victim; for `apoli:action_when_hit`, it's reversed.

```java
@Override public void run(EmptyCfg cfg, BiEntityCtx ctx) {
    ctx.rawActor().push(0, 0.5, 0); // knock the actor upward
}
```

## BlockCtx & ItemCtx

- **`BlockCtx`** — for block actions/conditions. Exposes the `Level`, the `BlockPos`, and the `BlockState` at that position.
- **`ItemCtx`** — for item actions/conditions. Exposes the `ItemStack` (and, where relevant, its holder).

Both follow the same shape: getters for the thing they act on, plus the level.

## Building a context yourself

Contexts have static `of(...)` factories, used when you fire a nested action of a different flavour from your own code:

```java
// run an entity action on the actor, from inside a bi-entity action
someEntityAction.run(EntityCtx.of(ctx.rawActor(), ctx.level()));
```

The built-in `apoli:actor_action` / `apoli:target_action` do exactly this.
