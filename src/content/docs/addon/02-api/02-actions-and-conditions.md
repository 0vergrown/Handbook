---
title: Actions & conditions
description: Add your own actions and conditions, usable from any power's JSON.
---

Actions and conditions are smaller than power types and follow the same recipe: a class with a codec and one method, registered under an id. Once registered, they're available in every power's JSON — yours and everyone else's.

## Actions

An action implements `ActionType<Ctx, Cfg>`. `Ctx` is the *context* it acts on; `Cfg` is its parsed config. The simplest actions need no config at all — use `EmptyCfg`:

```java
public final class ExtinguishAction implements ActionType<EntityCtx, EmptyCfg> {

    @Override
    public MapCodec<EmptyCfg> codec() {
        return MapCodec.unit(EmptyCfg.INSTANCE);
    }

    @Override
    public void run(EmptyCfg cfg, EntityCtx ctx) {
        ctx.raw().clearFire();
    }
}
```

A configured action reads fields from its codec:

```java
public record Cfg(int amount) {}

private static final MapCodec<Cfg> CODEC = RecordCodecBuilder.mapCodec(i -> i.group(
    Codec.INT.optionalFieldOf("amount", 1).forGetter(Cfg::amount)
).apply(i, Cfg::new));

@Override public void run(Cfg cfg, EntityCtx ctx) {
    ctx.living().heal(cfg.amount());
}
```

### Contexts pick the flavour

The `Ctx` type is what makes an action an *entity* action versus a *bi-entity* action:

| Context | Flavour | `run` receives |
| --- | --- | --- |
| `EntityCtx` | entity | one entity |
| `BiEntityCtx` | bi-entity | actor + target |
| `BlockCtx` | block | a position in a level |
| `ItemCtx` | item | an item stack |

> `ctx.raw()` gives the raw `Entity` (works for any entity — projectiles, items); `ctx.living()` gives the `LivingEntity` view when you need it. Prefer `raw()` unless you specifically need living-entity behaviour.

### Registering

Register into the matching action registry:

```java
ActionTypes.ENTITY.register(MyMod.id("extinguish"), new ExtinguishAction());
ActionTypes.BIENTITY.register(MyMod.id("yank"), new YankAction());
```

## Conditions

Conditions are the same, but `test` returns a boolean instead of `run` doing work:

```java
public final class OnFireCondition implements ConditionType<EntityCtx, EmptyCfg> {

    @Override public MapCodec<EmptyCfg> codec() {
        return MapCodec.unit(EmptyCfg.INSTANCE);
    }

    @Override public boolean test(EmptyCfg cfg, EntityCtx ctx) {
        return ctx.raw().isOnFire();
    }
}
```

Register into the matching condition registry:

```java
ConditionTypes.ENTITY.register(MyMod.id("on_fire"), new OnFireCondition());
```

Apoli adds the universal `inverted` field for you at the wrapper level — you never implement inversion yourself. Return the plain, un-inverted answer.

## Performance

`test` and `run` are called wherever the containing power fires — potentially per tick, per hit, or per entity in a selector. Keep them allocation-free and O(1). Read the [performance rules](/docs/addon/systems/power-container) before shipping anything that runs in a loop.

## See also

- [Registering power types](/docs/addon/api/registering-power-types)
- [Data pack: actions](/docs/datapack/actions/overview) — the JSON side of what you're building.
