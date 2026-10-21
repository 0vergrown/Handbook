---
title: Overview
description: "What the Apoli API is, and when you need Java instead of JSON."
---

Most powers can be built in a [data pack](/docs/datapack) with no code at all. You only need the Java API when JSON can't do the job: a new kind of power, a new action or condition, or a hook into game internals that no existing type exposes.

This part of the docs is for mod authors writing an Apoli addon. Origins is the main example: a mod that depends on Apoli and registers its own types on top.

## When to use Java

| You want | Use |
| --- | --- |
| To combine existing behaviours | A [data pack](/docs/datapack) |
| A new power type with custom logic | A `PowerType` subclass |
| A new action or condition | An `ActionType` or `ConditionType` implementation |
| A new [data type](/docs/datapack/introduction/data-types) usable from JSON | A `Codec` and its registration |
| Compatibility with another mod | A gated compat module |

If your idea rearranges things Apoli already does, stay in JSON. It is faster and needs no build.

## How an addon is shaped

An Apoli addon is an ordinary Fabric or NeoForge mod that:

1. depends on Apoli at build time and at runtime,
2. registers its power types, actions and conditions during mod initialisation,
3. optionally ships a data pack of its own powers.

The package layout follows Apoli's own convention, with everything under `dev.<you>.<modid>`. The entrypoint, `MyMod.java`, registers everything, and power types, actions and conditions each get a package of their own:

```txt
dev/example/mymod/
├── MyMod.java
├── power/
├── action/
└── condition/
```

## Depending on Apoli

Apoli is published for each loader and Minecraft version, and the version string says which, as in `1.118.1+1.21.1-fabric`, `1.118.1+1.21.1-neoforge` or `1.118.1+1.20.1-fabric`. The group is `dev.overgrown.apoli` and the artifact is `apoli`. To build against an Apoli you compiled yourself, run its `publishToMavenLocal` task and add it in `build.gradle`, with `apoli_version` set to the full version string in `gradle.properties`:

```groovy
repositories {
    mavenLocal()
}

dependencies {
    modImplementation "dev.overgrown.apoli:apoli:${apoli_version}"
}
```

Released builds are also on the Modrinth Maven repository (`https://api.modrinth.com/maven`) as `maven.modrinth:opoli:<version>`. On NeoForge, use `implementation` instead of `modImplementation`.

Then declare it in `fabric.mod.json`, or the NeoForge equivalent, so the game enforces it:

```json
{
  "depends": {
    "apoli": ">=1.5.0"
  }
}
```

> [!WARNING]
> Building against an old local copy is the most common addon bug. If Apoli changes and your addon can't see the change, publish Apoli to `mavenLocal` again and rebuild with `--refresh-dependencies`.

## Next

- [Getting started](/docs/addon/introduction/getting-started) sets up a project and registers your first type.
- The [cookbook](/docs/addon/cookbook/overview) has worked answers to the questions people ask most.
- [Registering power types](/docs/addon/api/registering-power-types) covers the core of an addon.
- [Performance](/docs/addon/systems/performance) has the rules for code on a live server.

### Reference map

| Topic | Page |
| --- | --- |
| Power types | [Registering power types](/docs/addon/api/registering-power-types) |
| Actions and conditions | [Actions and conditions](/docs/addon/api/actions-and-conditions) |
| Contexts | [Contexts](/docs/addon/api/contexts) |
| Legacy JSON | [Aliasing](/docs/addon/api/aliasing) |
| Custom value types | [Custom data types](/docs/addon/api/data-types) |
| Origins from Java | [The Origins API](/docs/addon/api/origins-api) |
| Where powers live | [The power container](/docs/addon/systems/power-container) |
| Detecting and granting powers | [Reading powers](/docs/addon/systems/reading-powers) |
| Saved state | [Aux and persistence](/docs/addon/systems/aux-and-persistence) |
| Client sync | [Networking](/docs/addon/systems/networking) |
| Math fields | [Expressions](/docs/addon/systems/expressions) |
| Rules for hot paths | [Performance](/docs/addon/systems/performance) |
| Support for other mods | [Compatibility](/docs/compat/writing-compat/gated-modules) |
| Loader and version differences | [Loaders and versions](/docs/addon/loaders/per-loader) |

### Worked recipes

| Scenario | Recipe |
| --- | --- |
| Detect, grant, revoke or suppress a power | [Powers on an entity](/docs/addon/cookbook/powers-on-an-entity) |
| Get an origin's powers, or a player's origin | [Origins from Java](/docs/addon/cookbook/origins-from-java) |
| Write an action of any flavour | [Writing actions](/docs/addon/cookbook/writing-actions) |
| Write a condition of any flavour | [Writing conditions](/docs/addon/cookbook/writing-conditions) |
| Mixin into vanilla without conflicts | [Hooking the game](/docs/addon/cookbook/hooking-the-game) |
