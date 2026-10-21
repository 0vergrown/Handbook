---
title: Loaders & versions
description: "What differs between Fabric and NeoForge, and across Minecraft versions."
---

Apoli is maintained for each loader (Fabric and NeoForge) and each Minecraft version (1.20.1 and 1.21.1). The data pack side is the same everywhere, so a power JSON works on any build. The Java API mostly matches too, but it differs where it touches the loader or game code specific to a version. This page lists what to watch.

## Fabric vs NeoForge

The registries, `PowerType`, contexts and codecs are identical. What differs is how you hook into the game:

| Concern | Fabric | NeoForge |
| --- | --- | --- |
| Entry point | `ModInitializer` | A `@Mod` class and mod bus events |
| Game hooks | Mostly mixins | Often events, plus mixins |
| Networking | The Fabric networking API | NeoForge payload registration |
| Rendering hooks | Mixins | Render events or mixins |

For example, the phasing overlay renderer is a client mixin on Fabric but a render event on NeoForge. Keep code specific to a loader in a loader source set, or a split like `compat`, and share the codecs and logic.

## Sharing code across loaders

Most of an addon, the config records, codecs and the `run`, `test` and lifecycle logic, doesn't depend on the loader and belongs in shared code. Only the thin hook layer (the entrypoint, the event and mixin wiring, and sending and receiving packets) needs an implementation for each loader. Apoli itself is organised this way, so mirror it.

## Minecraft 1.20.1 vs 1.21.1

The differences between versions are mostly vanilla API changes that spread through the code:

| Area | 1.20.1 | 1.21.1 |
| --- | --- | --- |
| Item data | NBT `tag` | Data components |
| Identifiers | `new ResourceLocation(ns, path)` | `ResourceLocation.fromNamespaceAndPath(...)` |
| Particles from JSON | `fromCommand` parsing | An object codec |
| Some registries | Direct | `Holder` and registry entries |

These affect a data type's codec (such as [item stack](/docs/datapack/data-types/item-stack) `components` against `tag`) and any code that names vanilla classes. When you port a page or a class between versions, the identifiers change style, so don't mix them.

## Keep the versions in lockstep

Apoli and Origins are released together, and an addon should depend on one specific build. Two rules prevent the most common crash:

1. Rebuild against the exact Apoli build you ship with. A mismatch between two jars with the same version crashes on join (see [networking](/docs/addon/systems/networking#protocol-versioning-rules)).
2. When Apoli changes, publish it to `mavenLocal` again and rebuild your addon with `--refresh-dependencies`, so you aren't compiling against an old copy.
