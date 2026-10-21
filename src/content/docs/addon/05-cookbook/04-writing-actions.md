---
title: Writing actions
description: "A worked action of each flavour, plus taking a nested action and running it yourself."
---

An action is a class with a codec and a `run`. The [context](/docs/addon/api/contexts) type is the only thing that decides its flavour, and the registry you put it in has to match.

## An entity action

An entity action is something that happens to one entity. Register it in `ActionTypes.ENTITY`, and it becomes valid in every `entity_action` field in the game. The early return for a non-living entity covers an arrow or anything else that isn't living:

```java
package dev.example.mymod.action;

import com.mojang.serialization.Codec;
import com.mojang.serialization.MapCodec;
import com.mojang.serialization.codecs.RecordCodecBuilder;
import dev.overgrown.apoli.action.ActionType;
import dev.overgrown.apoli.condition.context.EntityCtx;
import net.minecraft.world.entity.LivingEntity;

public final class RechargeAction implements ActionType<EntityCtx, RechargeAction.Cfg> {

    public record Cfg(float amount, boolean overheal) {}

    @Override
    public MapCodec<Cfg> codec() {
        return RecordCodecBuilder.mapCodec(i -> i.group(
            Codec.FLOAT.optionalFieldOf("amount", 1.0F).forGetter(Cfg::amount),
            Codec.BOOL.optionalFieldOf("overheal", false).forGetter(Cfg::overheal)
        ).apply(i, Cfg::new));
    }

    @Override
    public void run(Cfg cfg, EntityCtx ctx) {
        LivingEntity living = ctx.living();
        if (living == null) return;
        if (!cfg.overheal() && living.getHealth() >= living.getMaxHealth()) return;
        living.heal(cfg.amount());
    }
}
```

```java
ActionTypes.ENTITY.register(MyMod.id("recharge"), new RechargeAction());
```
```json
"entity_action": { "type": "mymod:recharge", "amount": 4.0 }
```

The config record is nested inside the action class. That is the convention throughout Apoli: the schema sits next to the code that reads it, and there is no separate file to keep in sync.

> [!WARNING]
> `ctx.living()` returns null instead of throwing when the entity isn't living. Powers run on projectiles and item entities, so every action that reaches for health, effects or equipment needs that check.

## A bi-entity action

A bi-entity action involves two entities, an actor and a target. Which is which is decided by the power that runs it, and for `apoli:action_on_hit` the actor is the attacker.

```java
public final class YankAction implements ActionType<BiEntityCtx, YankAction.Cfg> {

    public record Cfg(double strength) {}

    @Override
    public MapCodec<Cfg> codec() {
        return RecordCodecBuilder.mapCodec(i -> i.group(
            Codec.DOUBLE.optionalFieldOf("strength", 0.5).forGetter(Cfg::strength)
        ).apply(i, Cfg::new));
    }

    @Override
    public void run(Cfg cfg, BiEntityCtx ctx) {
        Entity actor = ctx.actor();
        Entity target = ctx.target();
        if (target == null || target.level().isClientSide()) return;

        Vec3 pull = actor.position().subtract(target.position()).normalize().scale(cfg.strength());
        target.setDeltaMovement(target.getDeltaMovement().add(pull));
        target.hurtMarked = true;
    }
}
```

```java
ActionTypes.BI_ENTITY.register(MyMod.id("yank"), new YankAction());
```

`hurtMarked = true` is the part people miss. It makes the server send the new velocity, and without it the server keeps the change to itself and the client never sees the entity move.

To turn a bi-entity context into an entity one, which is how `apoli:actor_action` and `apoli:target_action` are built:

```java
cfg.actorAction().ifPresent(a -> a.run(ctx.asActor()));
cfg.targetAction().ifPresent(a -> a.run(ctx.asTarget()));
```

## A block action

A block action gets a position, its state, the level, and optionally whoever caused it.

```java
public final class SproutAction implements ActionType<BlockCtx, SproutAction.Cfg> {

    public record Cfg(BlockState replacement) {}

    @Override
    public MapCodec<Cfg> codec() {
        return RecordCodecBuilder.mapCodec(i -> i.group(
            BlockState.CODEC.fieldOf("block").forGetter(Cfg::replacement)
        ).apply(i, Cfg::new));
    }

    @Override
    public void run(Cfg cfg, BlockCtx ctx) {
        if (ctx.level().isClientSide()) return;
        if (!ctx.state().isAir()) return;
        ctx.level().setBlock(ctx.pos(), cfg.replacement(), 3);
    }
}
```
```java
ActionTypes.BLOCK.register(MyMod.id("sprout"), new SproutAction());
```

`ctx.state()` is handed to you so you never have to read the level again for the common case. `ctx.actor()` can be null, since a block action run from a raycast has no entity behind it.

> [!WARNING]
> Changing blocks is server work, so check `isClientSide()` first, always. A `setBlock` on the client produces a ghost block that stays out of sync until the chunk reloads.

## An item action

An item action gets a stack, the level, an optional holder and, for actions but not conditions, a way to swap the stack. When the damage reaches the maximum, this one replaces the stack with an empty one, so the item burns away:

```java
public final class ScorchAction implements ActionType<ItemCtx, ScorchAction.Cfg> {

    public record Cfg(int amount) {}

    @Override
    public MapCodec<Cfg> codec() {
        return RecordCodecBuilder.mapCodec(i -> i.group(
            Codec.INT.optionalFieldOf("amount", 1).forGetter(Cfg::amount)
        ).apply(i, Cfg::new));
    }

    @Override
    public void run(Cfg cfg, ItemCtx ctx) {
        ItemStack stack = ctx.stack();
        if (stack == null || stack.isEmpty() || !stack.isDamageableItem()) return;

        int damage = stack.getDamageValue() + cfg.amount();
        if (damage >= stack.getMaxDamage()) {
            ctx.replace(ItemStack.EMPTY);
        } else {
            stack.setDamageValue(damage);
        }
    }
}
```

```java
ActionTypes.ITEM.register(MyMod.id("scorch"), new ScorchAction());
```

Two things to know about `ItemCtx`:

- `ctx.holder()` is null for a loose stack: an item entity, a container slot or a crafting result.
- `ctx.replace(newStack)` returns `false` when the caller handed you a read-only view. Changing the stack in place always works and replacing it doesn't, so check the return value if the difference matters.

## Taking a nested action

Most interesting actions are meta actions: they take another action and decide when to run it. Hold the wrapper record in your config and call it:

```java
public record Cfg(Optional<EntityAction> success,
                  Optional<EntityAction> failure,
                  Optional<EntityCondition> condition) {}

@Override
public MapCodec<Cfg> codec() {
    return RecordCodecBuilder.mapCodec(i -> i.group(
        LoggedOptionalField.of("success_action", EntityAction.CODEC).forGetter(Cfg::success),
        LoggedOptionalField.of("fail_action", EntityAction.CODEC).forGetter(Cfg::failure),
        LoggedOptionalField.strict("condition", EntityCondition.CODEC).forGetter(Cfg::condition)
    ).apply(i, Cfg::new));
}

@Override
public void run(Cfg cfg, EntityCtx ctx) {
    boolean ok = cfg.condition().isEmpty() || cfg.condition().get().test(ctx);
    (ok ? cfg.success() : cfg.failure()).ifPresent(a -> a.run(ctx));
}
```

`EntityAction`, `BiEntityAction`, `BlockAction` and `ItemAction` each have a public `CODEC` and a single `run`. You never look a type up by ID yourself.

Use `LoggedOptionalField` instead of `optionalFieldOf` for these. DFU drops a malformed optional field silently, so a nested action with a typo would leave the power loading cleanly and doing nothing. `LoggedOptionalField.of` logs a warning naming the power and the field, and `.strict` fails the whole enclosing object. A `condition` belongs in `strict`, because a gate that silently vanishes is worse than a load error.

## Running an action on a different entity

Build the context you need. Contexts are cheap records, and each one has an `of(...)` or a constructor. These run an entity action on any entity from anywhere, a bi-entity action between two entities you have, and a block action at a position you worked out:

```java
cfg.entityAction().ifPresent(a -> a.run(EntityCtx.of(entity, entity.level())));

cfg.bientityAction().ifPresent(a -> a.run(BiEntityCtx.of(actor, target, actor.level())));

cfg.blockAction().ifPresent(a -> a.run(new BlockCtx(pos, level.getBlockState(pos), level, actor)));
```

Build it as late as possible, after the early returns and not before.

## Aliases

Accept an old ID, or an old field name, without touching your codec:

```java
ActionTypes.ENTITY.register(
    MyMod.id("recharge"),
    new RechargeAction(),
    AliasingOptions.builder()
        .addTypeAlias(MyMod.id("heal"))
        .renameField("health", "amount")
        .build()
);
```

Both spellings keep working, so a data pack written against your old release doesn't break. See [aliasing](/docs/addon/api/aliasing).
