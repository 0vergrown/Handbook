---
title: Registering power types
description: "Writing a new power type in Java and registering it with Apoli."
---

A power type is a Java class that describes one kind of power: how its JSON is parsed (its codec), and what it does when it is added, removed or ticked. Registering it makes `"type": "yourmod:whatever"` valid in any data pack.

## The shape of a power type

Extend `PowerType<C>`, where `C` is a config record holding the parsed fields. The one method you must implement is `configCodec()`:

```java
public final class GravityPower extends PowerType<GravityPower.Cfg> {

    public record Cfg(double multiplier) {}

    private static final MapCodec<Cfg> CODEC = RecordCodecBuilder.mapCodec(i -> i.group(
        Codec.DOUBLE.optionalFieldOf("multiplier", 1.0).forGetter(Cfg::multiplier)
    ).apply(i, Cfg::new));

    @Override
    public MapCodec<Cfg> configCodec() {
        return CODEC;
    }
}
```

`optionalFieldOf("multiplier", 1.0)` is exactly the `multiplier` field a data pack author writes, with its default. The codec is the JSON schema, and there is no separate declaration.

## Lifecycle hooks

Override the hooks you need. They all receive the power ID, the parsed config and the [power container](/docs/addon/systems/power-container) the power is attached to, and the add and remove hooks also receive the source that granted it:

```java
@Override
public void onAdded(ResourceLocation id, Cfg cfg, PowerContainer holder, ResourceLocation source) {
}

@Override
public void onRemoved(ResourceLocation id, Cfg cfg, PowerContainer holder, ResourceLocation source) {
    if (holder.hasPower(id)) return;
}

@Override
public void onSuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { }
@Override
public void onUnsuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { }

@Override
public void tick(ResourceLocation id, Cfg cfg, PowerContainer holder) {
}

@Override
public boolean ticksNonLivingEntities() {
    return true;
}
```

- `onAdded` is where the effect is applied.
- `onRemoved` runs whenever a source is removed. While `holder.hasPower(id)` is still true, another source holds the power and the effect has to stay, so only undo it once that check fails.
- `tick` runs every tick while the power is active.
- `ticksNonLivingEntities()` returns `false` by default. Return `true` to opt in to ticking on projectiles, items and armour stands.

The full set is `onAdded`, `onRemoved`, `onSuppressed`, `onUnsuppressed`, `tick` and `tickStored`, plus the `readResource` and `writeResource` family for types that behave like a [resource](/docs/datapack/powers/resource). Override only what you need, since every one has a default that does nothing.

> [!WARNING]
> `tick` is a hot path. It runs every tick for every holder of the power. Don't allocate, don't do registry lookups, don't use streams and don't build a `ResourceLocation`. A careless `tick` turns straight into server lag.

> [!WARNING]
> `onAdded` doesn't run on login. It only runs from `addPower`, when the first source is added, and a container loaded from NBT fills itself through its codec without passing through it. Any `static` set or map you fill in `onAdded` is therefore empty for every player after a restart: it works in the session the power was granted in and never again. Keep per-entity state on the [container](/docs/addon/systems/power-container#auxiliary-data), and get "everyone who has this power" from `PoweredEntities.forEach(...)`, which is kept up to date on load as well.

> [!IMPORTANT]
> Suppression doesn't undo `onAdded`. A suppressed power keeps whatever `onAdded` applied unless you implement `onSuppressed` to take it back. If your type adds an attribute modifier or registers a render flag, it needs both hooks.

## Cooldowns and HUD bars

A type with a cooldown or a value of its own exposes it through the resource hooks, and gets a HUD bar by giving its config a `HudRender`. Nothing else has to know about the type: the HUD, the [Resource](/docs/datapack/entity-conditions/resource) condition, [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource), [apoli:trigger_cooldown](/docs/datapack/entity-actions/trigger_cooldown), expressions and `/apoli:resource` all go through the same hooks.

```java
public final class BlinkPower extends PowerType<BlinkPower.Cfg> {

    public record Cfg(Expression cooldown, HudRender hudRender) implements HudRendered {}

    @Override
    public boolean isCooldown() {
        return true;
    }

    @Override
    public OptionalInt readResource(ResourceLocation id, Cfg cfg, PowerContainer holder) {
        return PowerResources.readDeadline(holder, id);
    }

    @Override
    public OptionalInt writeResource(ResourceLocation id, Cfg cfg, PowerContainer holder, int value) {
        return PowerResources.writeDeadline(holder, id, value, PowerResources.cooldownTicks(cfg.cooldown(), holder));
    }

    @Override
    public OptionalInt resourceBound(ResourceLocation id, Cfg cfg, PowerContainer holder, boolean max) {
        return OptionalInt.of(max ? PowerResources.cooldownTicks(cfg.cooldown(), holder) : 0);
    }
}
```

- `HudRendered` is a one-method interface, `HudRender hudRender()`. A config record with a `hudRender` component already has that method, so `implements HudRendered` is all it takes. A type whose `HudRender` lives somewhere else overrides `PowerType#hudRender(cfg)` instead.
- `isCooldown()` picks the bar style. With `true`, the bar draws `1 - value / max`, filling as the power recovers, and hides at `0`, when it is ready. With `false`, it always draws the value between the `min` and `max` from `resourceBound`.
- `readResource` here returns the ticks left.
- `resourceBound(…, holder, …)` can be called with a `null` holder, for command tab completion. Return a constant when you can.
- `readDeadline` and `writeDeadline` store one absolute game time in the power's aux int. The value counts down by itself, so the container is written, and synced, once per trigger instead of once per tick.

## Powers applied on the client

A power that changes what one player sees or hears, such as the camera, the field of view or how far sounds carry, is applied on that player's client, but its `condition` may need state that only the server has. Return `true` from `resolvesForClient()` and Apoli evaluates the condition on the server every tick, for every player holding the type, and sends the player the set of their powers that are active whenever it changes.

```java
@Override
public boolean resolvesForClient() {
    return true;
}
```

On the client, read the result instead of evaluating the condition again, and apply each power that passes:

```java
for (ResourceLocation id : container.powersOfType(MY_TYPE)) {
    if (!ClientResolvedPowers.isActive(id)) continue;
    apply(id);
}
```

`ClientResolvedPowers.age(id, partialTick)` is the time since that power last turned on, for animations that should start with it. A type that needs the server to pick an entity for the client, like the `selector` of `apoli:modify_camera`, overrides `clientTarget(id, cfg, player, current)` to return that entity's network ID, and the client reads it with `ClientResolvedPowers.target(id)`. It runs every tick, so only resolve again when `current` is no longer valid, or on an interval.

## Registering it

During mod initialisation, hand the type to `PowerTypeRegistry` under your own ID:

```java
PowerTypeRegistry.register(MyMod.id("gravity"), new GravityPower());
```

Now this loads:

```json
{
  "type":"mymod:gravity",
  "multiplier":0.4
}
```

## Aliases and legacy fields

If you are porting powers from another mod, you can accept old type IDs and old field names without changing your codec:

```java
PowerTypeRegistry.register(
    MyMod.id("gravity"),
    new GravityPower(),
    AliasingOptions.builder()
        .addTypeAlias(MyMod.id("low_gravity"))
        .build()
);
```

Apoli uses the same mechanism to keep `apoli:conditioned_attribute` working as an alias of `apoli:attribute`, and to rename legacy fields to their current names before parsing. See [Aliasing](/docs/addon/api/aliasing).
