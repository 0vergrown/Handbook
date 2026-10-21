---
title: Writing conditions
description: "A worked condition of each of the eight flavours, plus comparisons and expression fields."
---

A condition is a class with a codec and a `test`. It has the same shape as an [action](/docs/addon/cookbook/writing-actions), with two differences: it returns a boolean, and there are eight registries instead of four.

## An entity condition

```java
package dev.example.mymod.condition;

import com.mojang.serialization.Codec;
import com.mojang.serialization.MapCodec;
import com.mojang.serialization.codecs.RecordCodecBuilder;
import dev.overgrown.apoli.condition.ConditionType;
import dev.overgrown.apoli.condition.context.EntityCtx;
import dev.overgrown.apoli.data.Comparison;

public final class MomentumCondition implements ConditionType<EntityCtx, MomentumCondition.Cfg> {

    public record Cfg(Comparison comparison, double compareTo) {}

    @Override
    public MapCodec<Cfg> codec() {
        return RecordCodecBuilder.mapCodec(i -> i.group(
            Comparison.CODEC.fieldOf("comparison").forGetter(Cfg::comparison),
            Codec.DOUBLE.fieldOf("compare_to").forGetter(Cfg::compareTo)
        ).apply(i, Cfg::new));
    }

    @Override
    public boolean test(Cfg cfg, EntityCtx ctx) {
        return cfg.comparison().compare(ctx.raw().getDeltaMovement().length(), cfg.compareTo());
    }
}
```
```java
ConditionTypes.ENTITY.register(MyMod.id("momentum"), new MomentumCondition());
```
```json
"condition": { "type": "mymod:momentum", "comparison": ">=", "compare_to": 0.5 }
```

### Use `Comparison` instead of inventing an operator

Any condition that compares a number should take Apoli's [`Comparison`](/docs/datapack/data-types/comparison) data type instead of its own `min` and `max` pair. Pack authors already know the six operators (`<`, `<=`, `>`, `>=`, `==`, `!=`), the codec is `Comparison.CODEC`, and `compare(a, b)` takes doubles, so ints and floats widen into it without a cast.

### `inverted` comes free

Apoli wraps every condition and applies `inverted != result` for you, so return the plain answer. Inverting it yourself cancels it out, and the field is added to your type whether you want it or not.

## An item condition

```java
public final class HeavyCondition implements ConditionType<ItemCtx, HeavyCondition.Cfg> {

    public record Cfg(Comparison comparison, int compareTo) {}

    @Override
    public MapCodec<Cfg> codec() {
        return RecordCodecBuilder.mapCodec(i -> i.group(
            Comparison.CODEC.fieldOf("comparison").forGetter(Cfg::comparison),
            Codec.INT.fieldOf("compare_to").forGetter(Cfg::compareTo)
        ).apply(i, Cfg::new));
    }

    @Override
    public boolean test(Cfg cfg, ItemCtx ctx) {
        int armor = ctx.stack().getItem() instanceof ArmorItem armorItem ? armorItem.getDefense() : 0;
        return cfg.comparison().compare(armor, cfg.compareTo());
    }
}
```
```java
ConditionTypes.ITEM.register(MyMod.id("heavy"), new HeavyCondition());
```

An item condition is evaluated in a lot of places: every slot of an inventory scan, every tick of an equipment check, every candidate in a recipe. Keep it to reading the stack. In particular:

- `ctx.holder()` can be null. A loose stack in a container or a crafting result has no holder, so branch instead of assuming one.
- Don't change the stack. Conditions are handed a live stack, and changing it from a `test` is a bug that shows up as items changing when someone opens a screen.

## A bi-entity condition

```java
public final class SameTeamCondition implements ConditionType<BiEntityCtx, EmptyCfg> {

    @Override
    public MapCodec<EmptyCfg> codec() {
        return MapCodec.unit(EmptyCfg.INSTANCE);
    }

    @Override
    public boolean test(EmptyCfg cfg, BiEntityCtx ctx) {
        Entity actor = ctx.actor();
        Entity target = ctx.target();
        if (target == null) return false;
        return actor.getTeam() != null && actor.getTeam().equals(target.getTeam());
    }
}
```
```java
ConditionTypes.BI_ENTITY.register(MyMod.id("same_team"), new SameTeamCondition());
```

`EmptyCfg.INSTANCE` with `MapCodec.unit(...)` is how a type with no fields is written throughout Apoli. It parses `{"type": "mymod:same_team"}` and nothing else.

To hand off to an entity condition on one side, which is how `apoli:actor_condition` is built:

```java
return cfg.actorCondition().map(c -> c.test(ctx.asActor())).orElse(true);
```

## A block condition

```java
public final class MossyCondition implements ConditionType<BlockCtx, EmptyCfg> {

    @Override
    public MapCodec<EmptyCfg> codec() {
        return MapCodec.unit(EmptyCfg.INSTANCE);
    }

    @Override
    public boolean test(EmptyCfg cfg, BlockCtx ctx) {
        return ctx.state().is(BlockTags.MOSS_REPLACEABLE);
    }
}
```

`ctx.state()` comes with `ctx.pos()`, so read it instead of calling `level.getBlockState(pos)` again. Block conditions run for every block in a radius in [`apoli:block_in_radius`](/docs/datapack/entity-conditions/block_in_radius), and that second read is the difference between cheap and not.

> [!NOTE]
> `ctx.actor()` and `ctx.hit()` can both be null. A block condition evaluated from a raycast or an area scan has no actor and no hit vector.

## The read-only flavours

`DamageCtx`, `FluidCtx`, `BiomeCtx` and `StaticCtx` have conditions but no actions.

A damage condition gets the source, the victim and the amount before it is reduced:

```java
public boolean test(Cfg cfg, DamageCtx ctx) {
    return ctx.amount() >= ctx.target().getHealth();
}
```

A fluid condition gets a `FluidState` and where it is:

```java
public boolean test(Cfg cfg, FluidCtx ctx) {
    return ctx.state().is(FluidTags.LAVA);
}
```

A biome condition gets a `Holder<Biome>`, so tags work without a registry lookup:

```java
public boolean test(Cfg cfg, BiomeCtx ctx) {
    return ctx.biome().is(BiomeTags.IS_OVERWORLD);
}
```

A static condition gets nothing at all and can only read global state. `ModCompat.BETTER_COMBAT` here is a plain boolean constant, worked out once when the class loads:

```java
public boolean test(Cfg cfg, StaticCtx ctx) {
    return ModCompat.BETTER_COMBAT;
}
```

Register them in `ConditionTypes.DAMAGE`, `.FLUID`, `.BIOME` and `.STATIC`. `BiomeCtx.biome()` is a `Holder`, which is why `is(tag)` works directly, so never resolve it to a `ResourceKey` and look the tag up yourself.

## Accepting an expression

A number field that a pack author might want to compute, such as a radius that scales with a resource or a threshold that depends on the time of day, should take an [Expression](/docs/datapack/data-types/expression) instead of a raw number. Apoli's codecs accept either form:

```java
public record Cfg(Expression radius) {}

@Override
public MapCodec<Cfg> codec() {
    return RecordCodecBuilder.mapCodec(i -> i.group(
        Expression.DOUBLE_OR_EXPR.optionalFieldOf("radius", Expression.constant(4))
            .forGetter(Cfg::radius)
    ).apply(i, Cfg::new));
}

@Override
public boolean test(Cfg cfg, EntityCtx ctx) {
    double radius = cfg.radius().eval(ctx.raw());
    …
}
```

| Codec | Accepts |
| --- | --- |
| `Expression.INT_OR_EXPR` | `5` or `"5 + resource(…)"` |
| `Expression.FLOAT_OR_EXPR` | `2.5` or a formula |
| `Expression.DOUBLE_OR_EXPR` | `2.5` or a formula |
| `Expression.CODEC` | A formula only |

`eval(entity)` and `evalInt(entity)` run the compiled expression. `constantValue()` returns an `OptionalDouble` that is only present when the expression is a literal number. Use it at load time to work out a fast path, as `apoli:action_over_time` does with its `interval`.

## Performance

`test` is the hottest thing in Apoli. It runs every tick, on every hit, for every block in a radius, for every entity in a selector and for every slot in an inventory. The rules:

- No allocation. No `new ResourceLocation`, no `Set.copyOf`, no boxed `Optional` chains and no streams.
- No registry lookups. Resolve holders and tags at load time into your config record.
- Return early on the cheapest check first.
- If your condition reads powers, let [`PowerLookup`](/docs/addon/systems/reading-powers) do it, since it already has the early-out ladder.

Read [performance](/docs/addon/systems/performance) before shipping a condition that runs in a loop.
