---
title: Contexts
description: "The objects passed to actions and conditions, and how to reach the entity, level, target, stack or block through them."
---

Every action's `run` and condition's `test` receives a context, a small object holding the things involved. The context type is what gives an action or condition its [flavour](/docs/datapack/introduction/actions): an action over `EntityCtx` is an entity action, and the same class over `BiEntityCtx` would be a bi-entity action.

All contexts are plain records or small final classes. None of them are pooled, and you shouldn't keep one after the call returns.

## The full set

| Context | Registry | Holds |
| --- | --- | --- |
| `EntityCtx` | `ENTITY` | One entity and its level |
| `BiEntityCtx` | `BI_ENTITY` | An actor, a target and the level |
| `BlockCtx` | `BLOCK` | A position, a state and the level, with an optional actor and hit vector |
| `ItemCtx` | `ITEM` | A stack and the level, with an optional holder and replacer |
| `DamageCtx` | `DAMAGE` (conditions only) | The damage source and amount |
| `FluidCtx` | `FLUID` (conditions only) | A `FluidState` |
| `BiomeCtx` | `BIOME` (conditions only) | A biome holder |
| `StaticCtx` | `STATIC` (conditions only) | Nothing, for conditions that only read world or server state |

Actions exist for the first four. Conditions exist for all eight.

## EntityCtx

```java
public record EntityCtx(Entity entity, Level level) {
    public static EntityCtx of(Entity entity, Level level);
    public Entity raw();
    public LivingEntity living();
}
```

- `raw()` returns the entity, which is never null in a real call. It is the default, and it works for any entity: players, mobs, projectiles, item entities and armour stands.
- `living()` returns `null` instead of throwing when the entity isn't a `LivingEntity`. Null-check it, or branch on `instanceof` first.

```java
@Override
public boolean test(EmptyCfg cfg, EntityCtx ctx) {
    return ctx.raw().isOnFire();
}

@Override
public void run(Cfg cfg, EntityCtx ctx) {
    LivingEntity living = ctx.living();
    if (living == null) return;
    living.heal(cfg.amount());
}
```

The early return in `run` is what happens when a projectile or another entity that isn't living gets there: the action does nothing.

> [!WARNING]
> Powers run on non-living entities too. Any action or condition that reaches for health, effects or equipment has to survive being handed an arrow.

## BiEntityCtx

```java
public final class BiEntityCtx {
    public static BiEntityCtx of(Entity actor, Entity target, Level level);

    public Entity actor();
    public Entity target();
    public Entity rawActor();
    public Entity rawTarget();
    public LivingEntity livingActor();
    public LivingEntity livingTarget();
    public Level level();

    public EntityCtx asActor();
    public EntityCtx asTarget();
    public BiEntityCtx swap();
}
```

`rawActor()` and `rawTarget()` return the same objects as `actor()` and `target()`, and read more clearly at a call site. `livingActor()` and `livingTarget()` return null when that side isn't living. `asActor()` and `asTarget()` turn the call into an entity context on the actor or on the target, and `swap()` exchanges the actor and the target.

Which entity is the actor and which is the target is set by the power that runs the action. For [`apoli:action_on_hit`](/docs/datapack/powers/action_on_hit) the actor is the attacker and the target is the victim, and for [`apoli:action_when_hit`](/docs/datapack/powers/action_when_hit) it is the other way round.

The built-in meta types are built on `asActor()`, `asTarget()` and `swap()`: [`apoli:actor_action`](/docs/datapack/bientity-actions/actor_action) is one call to `asActor()`, and [`apoli:invert`](/docs/datapack/bientity-conditions/invert) is one call to `swap()`.

```java
@Override
public void run(EmptyCfg cfg, BiEntityCtx ctx) {
    LivingEntity target = ctx.livingTarget();
    if (target == null) return;
    target.knockback(0.5F, ctx.actor().getX() - target.getX(), ctx.actor().getZ() - target.getZ());
}
```

## BlockCtx

```java
public record BlockCtx(BlockPos pos, BlockState state, Level level,
                       @Nullable Entity actor, @Nullable Vec3 hit) {
    public BlockCtx(BlockPos pos, BlockState state, Level level);
    public BlockCtx(BlockPos pos, BlockState state, Level level, @Nullable Entity actor);
    public BlockCtx at(BlockPos pos, BlockState state);
    public BlockCtx withHit(@Nullable Vec3 hit);
}
```

- `state` is carried alongside `pos`, so a condition never has to read the level again for the common case.
- `actor` is whoever caused the interaction, and is null for block conditions evaluated with no entity involved, such as a `block_condition` on a raycast.
- `hit` is the exact hit vector when there is one (placing, breaking, right-clicking) and null otherwise.

`at(...)` keeps the same actor and clears the hit. An offset condition uses it to move the whole context to a neighbouring block without allocating a new actor reference.

## ItemCtx

```java
public record ItemCtx(ItemStack stack, Level level,
                      @Nullable LivingEntity holder, @Nullable Consumer<ItemStack> replacer) {
    public ItemCtx(ItemStack stack, Level level, @Nullable LivingEntity holder);
    public boolean replace(ItemStack replacement);
}
```

- `holder` is the entity carrying or wearing the stack. It is null when the stack is loose: an item entity, a container slot or a recipe result.
- `replacer` is how an item action swaps the stack for a different one. Call `replace(...)` and check the result. It returns `false` when nothing can accept a replacement, because the caller handed you a read-only view (as most item conditions do), and the swap didn't happen.

```java
@Override
public boolean test(Cfg cfg, ItemCtx ctx) {
    int armor = ctx.stack().getItem() instanceof ArmorItem armorItem ? armorItem.getDefense() : 0;
    return cfg.comparison().compare(armor, cfg.compareTo());
}
```

## The read-only contexts

Four contexts exist so a condition can be written against something that isn't an entity, without pretending to be an entity condition. There are no actions over them.

```java
public record DamageCtx(DamageSource source, LivingEntity target, Level level, float amount) {}
public record FluidCtx(FluidState state, BlockPos pos, Level level) {}
public record BiomeCtx(Holder<Biome> biome, BlockPos pos, Level level) {}
public record StaticCtx() { public static final StaticCtx INSTANCE; }
```

They arrive through the `damage_condition`, `fluid_condition` and `biome_condition` fields of the types that own them.

- `DamageCtx.amount()` is the damage before your condition runs, which makes comparisons like `apoli:damage_would_kill` possible.
- `DamageCtx.target()` is a `LivingEntity` and is never null, since only living entities take damage.
- `StaticCtx` carries nothing at all, and there is one shared `INSTANCE`. Use it for a condition that only reads global state: the game time, a game rule, or whether a mod is loaded.

## Building a context yourself

Every context has an `of(...)` factory or a public constructor, which you use to run a nested action of a different flavour from inside your own. These lines run an entity action on the actor from inside a bi-entity action, run an entity action on any entity from anywhere, and evaluate a block condition at a position you worked out:

```java
cfg.actorAction().ifPresent(a -> a.run(ctx.asActor()));

cfg.entityAction().ifPresent(a -> a.run(EntityCtx.of(entity, entity.level())));

boolean ok = cfg.blockCondition()
    .map(c -> c.test(new BlockCtx(pos, level.getBlockState(pos), level)))
    .orElse(true);
```

> [!TIP]
> Build the context as late as you can. `EntityCtx.of(...)` is cheap but not free, and the built-in types only create one after their early returns have passed (see [performance](/docs/addon/systems/performance)).
