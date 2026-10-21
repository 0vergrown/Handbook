---
title: Getting started
description: "Setting up an Apoli addon and registering a first power type in Java."
---

This page takes you from an empty mod to a working custom power type. You should already have a Fabric or NeoForge mod project that builds.

## 1. Depend on Apoli

In `build.gradle`, add Apoli. Its version string names the loader and Minecraft version, such as `1.118.1+1.21.1-fabric`:

```groovy
repositories {
    mavenLocal()
}

dependencies {
    modImplementation "dev.overgrown.apoli:apoli:${apoli_version}"
}
```

`mavenLocal()` is for an Apoli you build and publish yourself with its `publishToMavenLocal` task. Released builds come from the Modrinth Maven repository, `https://api.modrinth.com/maven`, as `maven.modrinth:opoli:<version>`. On NeoForge, use `implementation` instead of `modImplementation`.

Then declare the dependency in `fabric.mod.json` so the game enforces it:

```json
{ "depends": { "apoli": ">=1.5.0" } }
```

## 2. An ID helper

Everything you register needs an ID in your own namespace. A small helper like Apoli's keeps that in one place:

```java
public final class MyMod {
    public static final String MOD_ID = "mymod";

    public static ResourceLocation id(String path) {
        return ResourceLocation.fromNamespaceAndPath(MOD_ID, path);
    }
}
```

## 3. Write a power type

A power type is a `PowerType<C>`, where `C` is a config record, and its codec is the JSON schema:

```java
public final class GravityPower extends PowerType<GravityPower.Cfg> {
    public record Cfg(double multiplier) {}

    private static final MapCodec<Cfg> CODEC = RecordCodecBuilder.mapCodec(i -> i.group(
        Codec.DOUBLE.optionalFieldOf("multiplier", 1.0).forGetter(Cfg::multiplier)
    ).apply(i, Cfg::new));

    @Override public MapCodec<Cfg> configCodec() { return CODEC; }
}
```

To make it do something, override `onAdded` and apply the effect to `holder.owner()`, along with whichever other lifecycle hooks you need. See [Registering power types](/docs/addon/api/registering-power-types) for the full lifecycle.

## 4. Register it

During mod initialisation, in your entrypoint, hand it to the registry:

```java
public class MyModInit implements ModInitializer {
    @Override public void onInitialize() {
        PowerTypeRegistry.register(MyMod.id("gravity"), new GravityPower());
    }
}
```

## 5. Use it from JSON

Your type is now an Apoli type like any other, and any data pack, including yours, can use it:

```json
{ "type": "mymod:gravity", "multiplier": 0.4 }
```

## Where things get registered

| You are adding | Register with |
| --- | --- |
| A power type | [`PowerTypeRegistry.register`](/docs/addon/api/registering-power-types) |
| An action | [`ActionTypes.ENTITY`, `.BI_ENTITY` and the others](/docs/addon/api/actions-and-conditions) |
| A condition | [`ConditionTypes.ENTITY` and the others](/docs/addon/api/actions-and-conditions) |
| A reusable JSON value type | [A shared `Codec`](/docs/addon/api/data-types) |

## Next

- [Registering power types](/docs/addon/api/registering-power-types)
- [Actions and conditions](/docs/addon/api/actions-and-conditions)
- [Performance rules](/docs/addon/systems/performance), to read before shipping tick code
