---
title: Getting started
description: Set up an Apoli addon and register your first power type in Java.
---

This page takes you from an empty mod to a working custom power type. You should already have a Fabric (or NeoForge) mod project building.

## 1. Depend on Apoli

In `build.gradle`, add Apoli. The coordinate is qualified by loader and Minecraft version:

```groovy
repositories {
    mavenLocal() // if you build Apoli yourself
}

dependencies {
    modImplementation "dev.overgrown:apoli-fabric-1.21.1:${apoli_version}"
}
```

And declare the dependency in `fabric.mod.json` so the game enforces it:

```json
{ "depends": { "apoli": ">=1.5.0" } }
```

## 2. An id helper

Everything you register needs an id in *your* namespace. Mirror Apoli's helper:

```java
public final class MyMod {
    public static final String MOD_ID = "mymod";

    public static ResourceLocation id(String path) {
        return ResourceLocation.fromNamespaceAndPath(MOD_ID, path);
    }
}
```

## 3. Write a power type

A power type is a `PowerType<C>` where `C` is a config record. The codec *is* the JSON schema:

```java
public final class GravityPower extends PowerType<GravityPower.Cfg> {
    public record Cfg(double multiplier) {}

    private static final MapCodec<Cfg> CODEC = RecordCodecBuilder.mapCodec(i -> i.group(
        Codec.DOUBLE.optionalFieldOf("multiplier", 1.0).forGetter(Cfg::multiplier)
    ).apply(i, Cfg::new));

    @Override public MapCodec<Cfg> configCodec() { return CODEC; }

    @Override public void onAdded(ResourceLocation id, Cfg cfg, PowerContainer holder, ResourceLocation source) {
        // apply the effect to holder.owner()
    }
}
```

See [Registering power types](/docs/addon/api/registering-power-types) for the full lifecycle.

## 4. Register it

During mod initialisation (your entrypoint), hand it to the registry:

```java
public class MyModInit implements ModInitializer {
    @Override public void onInitialize() {
        PowerTypeRegistry.register(MyMod.id("gravity"), new GravityPower());
    }
}
```

## 5. Use it from JSON

Your type is now a first-class Apoli type — any data pack (including yours) can write:

```json
{ "type": "mymod:gravity", "multiplier": 0.4 }
```

## Where things get registered

| You're adding… | Register with |
| --- | --- |
| a power type | [`PowerTypeRegistry.register`](/docs/addon/api/registering-power-types) |
| an action | [`ActionTypes.ENTITY` / `.BI_ENTITY` / …](/docs/addon/api/actions-and-conditions) |
| a condition | [`ConditionTypes.ENTITY` / …](/docs/addon/api/actions-and-conditions) |
| a reusable JSON value type | [a shared `Codec`](/docs/addon/api/data-types) |

## Next

- [Registering power types](/docs/addon/api/registering-power-types)
- [Actions & conditions](/docs/addon/api/actions-and-conditions)
- [Performance rules](/docs/addon/systems/performance) — read before shipping tick code.
