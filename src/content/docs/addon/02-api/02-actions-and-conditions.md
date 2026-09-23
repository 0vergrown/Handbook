---
title: Actions & conditions
description: Add your own actions and conditions, usable from any power's JSON — and run data-pack ones from your own code.
---

Actions and conditions are smaller than power types and follow the same recipe: a class with a codec and one method, registered under an id. Once registered, they are available in every power's JSON — yours and everyone else's.

## The two interfaces

```java
public interface ActionType<CTX, C> {
    MapCodec<C> codec();
    void run(C config, CTX ctx);
}

public interface ConditionType<CTX, C> {
    MapCodec<C> codec();
    boolean test(C config, CTX ctx);
}
```

`CTX` is the [context](/docs/addon/api/contexts) it acts on — and it is the only thing that decides the *flavour*. `C` is the parsed config; use `EmptyCfg` when there are no fields.

## Actions

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

A configured action reads fields from its codec. Declare the config as a `record` nested in the action — that is the convention across the whole codebase, and it keeps the schema next to the code that reads it:

```java
public final class HealAction implements ActionType<EntityCtx, HealAction.Cfg> {

    public record Cfg(float amount) {}

    @Override
    public MapCodec<Cfg> codec() {
        return RecordCodecBuilder.mapCodec(i -> i.group(
            Codec.FLOAT.optionalFieldOf("amount", 1.0F).forGetter(Cfg::amount)
        ).apply(i, Cfg::new));
    }

    @Override
    public void run(Cfg cfg, EntityCtx ctx) {
        LivingEntity living = ctx.living();
        if (living != null) living.heal(cfg.amount());
    }
}
```

The codec **is** the JSON schema. `optionalFieldOf("amount", 1.0F)` is exactly the field a pack author writes and its default; `fieldOf("amount")` makes it required.

### The action registries

```java
ActionTypes.ENTITY.register(MyMod.id("extinguish"), new ExtinguishAction());
ActionTypes.BI_ENTITY.register(MyMod.id("yank"), new YankAction());
ActionTypes.BLOCK.register(MyMod.id("sprout"), new SproutAction());
ActionTypes.ITEM.register(MyMod.id("scorch"), new ScorchAction());
```

| Field on `ActionTypes` | Context | JSON field it lands in |
| --- | --- | --- |
| `ENTITY` | `EntityCtx` | `entity_action` |
| `BI_ENTITY` | `BiEntityCtx` | `bientity_action` |
| `BLOCK` | `BlockCtx` | `block_action` |
| `ITEM` | `ItemCtx` | `item_action` |

Registering the same id twice in one registry throws `Duplicate <group> action` at boot — deliberately, so a copy-pasted registration fails loudly instead of silently winning.

## Conditions

Same shape, but `test` returns a boolean:

```java
public final class OnFireCondition implements ConditionType<EntityCtx, EmptyCfg> {

    @Override
    public MapCodec<EmptyCfg> codec() {
        return MapCodec.unit(EmptyCfg.INSTANCE);
    }

    @Override
    public boolean test(EmptyCfg cfg, EntityCtx ctx) {
        return ctx.raw().isOnFire();
    }
}
```

### The condition registries

There are eight, four more than there are action registries:

```java
ConditionTypes.ENTITY.register(MyMod.id("on_fire"), new OnFireCondition());
ConditionTypes.BI_ENTITY.register(MyMod.id("same_team"), new SameTeamCondition());
ConditionTypes.BLOCK.register(MyMod.id("mossy"), new MossyCondition());
ConditionTypes.ITEM.register(MyMod.id("heavy"), new HeavyCondition());
ConditionTypes.DAMAGE.register(MyMod.id("explosive"), new ExplosiveCondition());
ConditionTypes.FLUID.register(MyMod.id("hot"), new HotFluidCondition());
ConditionTypes.BIOME.register(MyMod.id("snowy"), new SnowyCondition());
ConditionTypes.STATIC.register(MyMod.id("full_moon"), new FullMoonCondition());
```

| Field on `ConditionTypes` | Context | JSON field it lands in |
| --- | --- | --- |
| `ENTITY` | `EntityCtx` | `condition`, `entity_condition` |
| `BI_ENTITY` | `BiEntityCtx` | `bientity_condition` |
| `BLOCK` | `BlockCtx` | `block_condition` |
| `ITEM` | `ItemCtx` | `item_condition` |
| `DAMAGE` | `DamageCtx` | `damage_condition` |
| `FLUID` | `FluidCtx` | `fluid_condition` |
| `BIOME` | `BiomeCtx` | `biome_condition` |
| `STATIC` | `StaticCtx` | `condition` on the types that take one |

### `inverted` is handled for you

Apoli adds the universal `inverted` field at the wrapper level, so **return the plain, un-inverted answer**. `EntityCondition.test` applies `inverted != result` after calling you. Implementing inversion yourself double-negates it.

The same wrapper is where the null guards live: a condition whose context has no entity returns `inverted` rather than calling into your `test`, and an unknown type id returns `true` so one bad field never silently disables a whole power.

## Running them from your own code

A power type that exposes `entity_action`, `bientity_condition` and friends does not call the registries directly — it holds the parsed wrapper record and calls it:

```java
public record Cfg(Optional<EntityAction> entityAction,
                  Optional<EntityCondition> condition,
                  Optional<BiEntityAction> bientityAction) {}

@Override
public MapCodec<Cfg> codec() {
    return RecordCodecBuilder.mapCodec(i -> i.group(
        LoggedOptionalField.of("entity_action", EntityAction.CODEC).forGetter(Cfg::entityAction),
        LoggedOptionalField.strict("condition", EntityCondition.CODEC).forGetter(Cfg::condition),
        LoggedOptionalField.of("bientity_action", BiEntityAction.CODEC).forGetter(Cfg::bientityAction)
    ).apply(i, Cfg::new));
}
```

Then, at the point the thing happens:

```java
if (cfg.condition().isEmpty() || cfg.condition().get().test(ctx)) {
    cfg.entityAction().ifPresent(action -> action.run(ctx));
}
```

`EntityAction`, `BiEntityAction`, `BlockAction`, `ItemAction` and the eight `*Condition` records all have a public `CODEC` and a single `run` / `test` method. That is the whole API — you never look a type up by id at runtime.

### `LoggedOptionalField` vs `optionalFieldOf`

Use `LoggedOptionalField` for action and condition fields rather than plain `optionalFieldOf`. A malformed nested action is otherwise dropped **silently** by DFU, and the power loads looking fine while doing nothing.

| Helper | On a malformed value |
| --- | --- |
| `Codec.optionalFieldOf` | drops the field, says nothing |
| `LoggedOptionalField.of` | drops the field, logs a warning naming the power and field |
| `LoggedOptionalField.strict` | fails the **whole** enclosing object, with a warning |

`strict` is right for a field the type cannot work without — a `condition` that silently vanishes turns a gated power into an ungated one, which is worse than a load error.

## Aliases and legacy ids

Accept an old id without changing your codec:

```java
ConditionTypes.ITEM.register(
    MyMod.id("fireproof"),
    new FireproofItemCondition(),
    AliasingOptions.builder().addTypeAlias(MyMod.id("fire_resistant")).build()
);
```

`AliasingOptions` also renames fields (`renameField("old", "new")`) and injects per-alias defaults (`addTypeAlias(oldId, Map.of("field", "value"))`) that apply only when the legacy id was used. See [aliasing](/docs/addon/api/aliasing).

## Performance

`test` and `run` are called wherever the containing power fires — potentially per tick, per hit, or once per entity in a selector. Keep them allocation-free and O(1): no streams, no `Optional` chains in the body, no `ResourceLocation` construction, no registry lookups. Read the [performance rules](/docs/addon/systems/performance) before shipping anything that runs in a loop.
