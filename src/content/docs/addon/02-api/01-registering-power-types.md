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
    // undo it — remember a power can be granted by more than one source
}

@Override
public void tick(ResourceLocation id, Cfg cfg, PowerContainer holder) {
    // runs every tick while the power is active
}
```

> `tick` is a **hot path** — it runs every tick for every holder of the power. Don't allocate, don't do registry lookups, don't stream. Cache anything expensive. A careless `tick` scales straight into server lag.

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
