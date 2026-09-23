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
