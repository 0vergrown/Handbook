---
title: Overview
description: What the Apoli API is, and when you need Java instead of JSON.
---

Most powers can be built in a [data pack](/docs/datapack) — no code required. You only need the **Java API** when JSON runs out of road: a genuinely new *kind* of power, a new action or condition, or a hook into game internals that no existing type exposes.

This side of the docs is for mod authors writing an **Apoli addon**. Origins is the canonical example: it's a mod that depends on Apoli and registers its own types on top.

## When to reach for Java

| You want to… | Use |
| --- | --- |
| Combine existing behaviours | [Data pack](/docs/datapack) |
| A new power *type* with custom logic | `PowerType` subclass |
| A new action or condition | `EntityAction`, `EntityCondition`, … factories |
| A new [data type](/docs/datapack/introduction/data-types) usable from JSON | A `Codec` + registration |
| Compat with another mod | A gated compat module |

If your idea is a rearrangement of things Apoli already does, stay in JSON — it's faster and needs no build.

## How an addon is shaped

An Apoli addon is an ordinary Fabric/NeoForge mod that:

1. **depends on Apoli** at build and runtime,
2. **registers** its power types, actions and conditions during mod init,
3. optionally ships a data pack of its own powers.

Package layout follows Apoli's own convention — everything under `dev.<you>.<modid>`:

```
dev/example/mymod/
├── MyMod.java            // entrypoint: registers everything
├── power/                // PowerType subclasses
├── action/               // action factories
└── condition/            // condition factories
```

## Depending on Apoli

Apoli is published per loader and Minecraft version, so the coordinate is qualified. Add the dependency in `build.gradle`:

```groovy
repositories {
    mavenLocal() // if you build Apoli yourself
}

dependencies {
    // fabric, 1.21.1 — match your loader and MC version
    modImplementation "dev.overgrown:apoli-fabric-1.21.1:${apoli_version}"
}
```

Then declare it in `fabric.mod.json` (or the NeoForge equivalent) so the game enforces it:

```json
{
  "depends": {
    "apoli": ">=1.5.0"
  }
}
```

> Building against a stale local copy is the single most common addon bug. If Apoli changes and your addon can't see it, republish Apoli to `mavenLocal` and rebuild with `--refresh-dependencies`.

## Next

- [Getting started](/docs/addon/introduction/getting-started) — set up a project and register your first type.
- [Registering power types](/docs/addon/api/registering-power-types) — the core of an addon.
- [Contexts](/docs/addon/api/contexts) — how you reach the entity, level and target.
- [Performance](/docs/addon/systems/performance) — the rules for code on a live server.

### Reference map

| Topic | Page |
| --- | --- |
| Power types | [Registering power types](/docs/addon/api/registering-power-types) |
| Actions & conditions | [Actions & conditions](/docs/addon/api/actions-and-conditions) |
| Contexts | [Contexts](/docs/addon/api/contexts) |
| Legacy JSON | [Aliasing](/docs/addon/api/aliasing) |
| Custom value types | [Custom data types](/docs/addon/api/data-types) |
| Where powers live | [The power container](/docs/addon/systems/power-container) |
| Saved state | [Aux & persistence](/docs/addon/systems/aux-and-persistence) |
| Client sync | [Networking](/docs/addon/systems/networking) |
| Math fields | [Expressions](/docs/addon/systems/expressions) |
| Hot-path rules | [Performance](/docs/addon/systems/performance) |
| Other-mod support | [Compatibility](/docs/addon/compat/overview) |
| Loader/version gaps | [Loaders & versions](/docs/addon/loaders/per-loader) |
