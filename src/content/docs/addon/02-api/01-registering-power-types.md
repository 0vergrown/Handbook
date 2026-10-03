---
title: Registering power types
description: Write a new power type in Java and register it with Apoli.
---

A **power type** is a Java class that describes one kind of power: how its JSON is parsed (its *codec*), and what it does when added, removed or ticked. Registering it makes `"type": "yourmod:whatever"` valid in any data pack.

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

That `optionalFieldOf("multiplier", 1.0)` is exactly the `multiplier` field a data pack author writes — and its default. The codec *is* the JSON schema; there's no separate declaration.

## Lifecycle hooks

Override the hooks you need. All receive the power id, the parsed config, the [power container](/docs/addon/systems/power-container) it's attached to, and the source that granted it:

```java
@Override
public void onAdded(ResourceLocation id, Cfg cfg, PowerContainer holder, ResourceLocation source) {
    // apply your effect
}

@Override
public void onRemoved(ResourceLocation id, Cfg cfg, PowerContainer holder, ResourceLocation source) {
    if (holder.hasPower(id)) return;   // another source still holds it
    // now it is really gone — undo the effect
}

@Override
public void onSuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { }
@Override
public void onUnsuppressed(ResourceLocation id, Cfg cfg, PowerContainer holder) { }

@Override
public void tick(ResourceLocation id, Cfg cfg, PowerContainer holder) {
    // runs every tick while the power is active
}

@Override
public boolean ticksNonLivingEntities() {
    return true;   // default false — opt in to ticking on projectiles, items, armour stands
}
```

The full set is `onAdded`, `onRemoved`, `onSuppressed`, `onUnsuppressed`, `tick` and `tickStored`, plus the `readResource` / `writeResource` family for types that behave like a [resource](/docs/datapack/powers/resource). Override only what you need; every one has a no-op default.

> **`tick` is a hot path.** It runs every tick for every holder of the power. Don't allocate, don't do registry lookups, don't stream, don't build a `ResourceLocation`. A careless `tick` scales straight into server lag.

> **`onAdded` does not fire on login.** It runs from `addPower` only, on the transition to the first source — a container loaded from NBT fills itself through its codec and never passes through it. Any `static` set or map you populate in `onAdded` is therefore **empty for every player after a restart**: it works in the session the power was granted in and is dead thereafter. Keep per-entity state on the [container](/docs/addon/systems/power-container#auxiliary-data), and derive "everyone who has this power" from `PoweredEntities.forEach(...)`, which is maintained on load as well.

> **Suppression does not undo `onAdded`.** A suppressed power keeps whatever `onAdded` applied unless you implement `onSuppressed` to take it back down. If your type adds an attribute modifier or registers a render flag, it needs both hooks.

## Cooldowns and HUD bars

A type with a cooldown or a value of its own exposes it through the resource hooks, and gets a HUD bar by giving its config a `HudRender`. Nothing else has to know about the type: the HUD, the [Resource](/docs/datapack/entity-conditions/resource) condition, [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource), [apoli:trigger_cooldown](/docs/datapack/entity-actions/trigger_cooldown), expressions and `/apoli:resource` all go through the same hooks.

```java
public final class BlinkPower extends PowerType<BlinkPower.Cfg> {

    public record Cfg(Expression cooldown, HudRender hudRender) implements HudRendered {}

    @Override
    public boolean isCooldown() {
        return true;   // the bar fills as it recovers, and hides when ready
    }

    @Override
    public OptionalInt readResource(ResourceLocation id, Cfg cfg, PowerContainer holder) {
        return PowerResources.readDeadline(holder, id);   // ticks left
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
- `isCooldown()` picks the bar style. `true` draws `1 - value / max` and hides the bar at `0`; `false` draws the value between the `min` and `max` from `resourceBound`, always.
- `resourceBound(…, holder, …)` may be called with a `null` holder (command tab-completion). Return a constant when you can.
- `readDeadline` / `writeDeadline` store one absolute game time in the power's aux int. The value counts down on its own, so the container is written — and synced — once per trigger, not once per tick.

## Powers applied on the client

A power that changes what one player sees or hears — the camera, the field of view, how far sounds carry — is applied on that player's client, but its `condition` may need state only the server has. Return `true` from `resolvesForClient()` and Apoli evaluates the condition on the server every tick, for every player holding the type, and sends the player the set of their powers that are active, only when it changes.

```java
@Override
public boolean resolvesForClient() {
    return true;
}
```

On the client, read the result instead of evaluating the condition again:

```java
for (ResourceLocation id : container.powersOfType(MY_TYPE)) {
    if (!ClientResolvedPowers.isActive(id)) continue;
    // apply it
}
```

`ClientResolvedPowers.age(id, partialTick)` is the time since that power last turned on, for animations that should start with it. A type that needs the server to pick an entity for the client — like `apoli:modify_camera`'s `selector` — overrides `clientTarget(id, cfg, player, current)` to return that entity's network id, and the client reads it with `ClientResolvedPowers.target(id)`. Re-resolve only when `current` is no longer valid or on an interval; it runs every tick.

## Registering it

During mod init, hand the type to `PowerTypeRegistry` under your own id:

```java
PowerTypeRegistry.register(MyMod.id("gravity"), new GravityPower());
```

Now this loads:

```json
{
  "type":"yourmod:gravity",
  "multiplier":0.4
}
```

## Aliases and legacy fields

If you're porting powers from another mod, you can accept old type ids and old field names without changing your codec:

```java
PowerTypeRegistry.register(
    MyMod.id("gravity"),
    new GravityPower(),
    AliasingOptions.builder()
        .addTypeAlias(MyMod.id("low_gravity"))
        .build()
);
```

This is how Apoli keeps `apoli:conditioned_attribute` working as an alias of `apoli:attribute`, and how it renames legacy fields to their canonical names before parsing.
