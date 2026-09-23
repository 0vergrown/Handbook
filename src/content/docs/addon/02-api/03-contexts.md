---
title: Contexts
description: The objects passed to actions and conditions — how you reach the entity, level, target, stack or block.
---

Every action's `run` and condition's `test` receives a **context** — a small object holding the things involved. The context *type* is what makes an action or condition a particular [flavour](/docs/datapack/introduction/actions): an action over `EntityCtx` is an entity action, the same class over `BiEntityCtx` would be a bi-entity action.

All contexts are plain records or small final classes. None of them are pooled, so never hold one past the call.

## The full set

| Context | Registry | Holds |
| --- | --- | --- |
| `EntityCtx` | `ENTITY` | one entity + its level |
| `BiEntityCtx` | `BI_ENTITY` | actor + target + level |
| `BlockCtx` | `BLOCK` | pos + state + level, optional actor and hit vector |
| `ItemCtx` | `ITEM` | stack + level, optional holder and replacer |
| `DamageCtx` | `DAMAGE` (conditions only) | the damage source and amount |
| `FluidCtx` | `FLUID` (conditions only) | a `FluidState` |
| `BiomeCtx` | `BIOME` (conditions only) | a biome holder |
| `StaticCtx` | `STATIC` (conditions only) | nothing — for conditions that only read world/server state |

Actions exist for the first four. Conditions exist for all eight.

## EntityCtx

```java
public record EntityCtx(Entity entity, Level level) {
    public static EntityCtx of(Entity entity, Level level);
    public Entity raw();          // the entity, always non-null in a real call
    public LivingEntity living(); // null when the entity is not living
}
```

- **`raw()`** is the default. It works for *any* entity: players, mobs, projectiles, item entities, armour stands.
- **`living()`** returns **`null`** rather than throwing when the entity is not a `LivingEntity`. Null-check it, or branch on `instanceof` first.

```java
@Override
public boolean test(EmptyCfg cfg, EntityCtx ctx) {
    return ctx.raw().isOnFire();
}

@Override
public void run(Cfg cfg, EntityCtx ctx) {
    LivingEntity living = ctx.living();
    if (living == null) return;   // a projectile got here; do nothing
    living.heal(cfg.amount());
}
```

> Powers run on non-living entities too. Any action or condition that reaches for health, effects or equipment has to survive being handed an arrow.

## BiEntityCtx

```java
public final class BiEntityCtx {
    public static BiEntityCtx of(Entity actor, Entity target, Level level);

    public Entity actor();              public Entity target();
    public Entity rawActor();           public Entity rawTarget();   // same objects, clearer at a call site
    public LivingEntity livingActor();  public LivingEntity livingTarget();  // null when not living
    public Level level();

    public EntityCtx asActor();   // re-frame as an entity context on the actor
    public EntityCtx asTarget();  // …on the target
    public BiEntityCtx swap();    // actor and target exchanged
}
```

Which entity is actor and which is target is set by the power that fires the action. For [`apoli:action_on_hit`](/docs/datapack/powers/action_on_hit) the actor is the attacker and the target is the victim; for [`apoli:action_when_hit`](/docs/datapack/powers/action_when_hit) it is the other way round.

`asActor()`, `asTarget()` and `swap()` are how the built-in meta types are implemented — [`apoli:actor_action`](/docs/datapack/bientity-actions/actor_action) is one call to `asActor()`, and [`apoli:invert`](/docs/datapack/bientity-conditions/invert) is one call to `swap()`.

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
    public BlockCtx at(BlockPos pos, BlockState state);  // same actor, hit cleared
    public BlockCtx withHit(@Nullable Vec3 hit);
}
```

- `state` is carried alongside `pos` so a condition never has to re-read the level for the common case.
- `actor` is whoever caused the interaction, and is **null** for block conditions evaluated with no entity involved (a `block_condition` on a raycast, say).
- `hit` is the exact hit vector when one exists — placing, breaking, right-clicking — and null otherwise.

`at(...)` is what an offset condition uses to move the whole context to a neighbouring block without allocating a new actor reference.

## ItemCtx

```java
public record ItemCtx(ItemStack stack, Level level,
                      @Nullable LivingEntity holder, @Nullable Consumer<ItemStack> replacer) {
    public ItemCtx(ItemStack stack, Level level, @Nullable LivingEntity holder);
    public boolean replace(ItemStack replacement);  // false when nothing can accept a replacement
}
```

- `holder` is the entity carrying or wearing the stack. It is **null** when the stack is loose — an item entity, a container slot, a recipe result.
- `replacer` is how an item *action* swaps the stack for a different one. Call `replace(...)` and check the result: `false` means the caller handed you a read-only view (most item **conditions**), so the swap did not happen.

```java
@Override
public boolean test(Cfg cfg, ItemCtx ctx) {
    int armor = ctx.stack().getItem() instanceof ArmorItem armorItem ? armorItem.getDefense() : 0;
    return cfg.comparison().compare(armor, cfg.compareTo());
}
```

## The read-only contexts

Four contexts exist so a condition can be written against something that is not an entity, without pretending to be an entity condition. There are no actions over them.

```java
public record DamageCtx(DamageSource source, LivingEntity target, Level level, float amount) {}
public record FluidCtx(FluidState state, BlockPos pos, Level level) {}
public record BiomeCtx(Holder<Biome> biome, BlockPos pos, Level level) {}
public record StaticCtx() { public static final StaticCtx INSTANCE; }
```

They arrive through the `damage_condition`, `fluid_condition` and `biome_condition` fields of the types that own them.

- `DamageCtx.amount()` is the damage **before** your condition runs, which is what makes `apoli:damage_would_kill`-style comparisons possible.
- `DamageCtx.target()` is a `LivingEntity` and is never null — only living entities take damage.
- `StaticCtx` carries nothing at all, and there is one shared `INSTANCE`. Use it for a condition that only reads global state: the game time, a game rule, whether a mod is loaded.

## Building a context yourself

Every context has an `of(...)` factory or a public constructor, used when you fire a nested action of a different flavour from inside your own:

```java
// run an entity action on the actor, from inside a bi-entity action
cfg.actorAction().ifPresent(a -> a.run(ctx.asActor()));

// run an entity action on an arbitrary entity, from anywhere
cfg.entityAction().ifPresent(a -> a.run(EntityCtx.of(entity, entity.level())));

// evaluate a block condition at a position you computed
boolean ok = cfg.blockCondition()
    .map(c -> c.test(new BlockCtx(pos, level.getBlockState(pos), level)))
    .orElse(true);
```

> Build the context as late as you can. `EntityCtx.of(...)` is cheap but not free, and the built-ins deliberately create one only after the early-outs have passed — see [performance](/docs/addon/systems/performance).
