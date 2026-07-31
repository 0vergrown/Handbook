---
title: Loaders & versions
description: What differs between Fabric and NeoForge, and across Minecraft versions.
---

Apoli is maintained per **loader** (Fabric, NeoForge) and per **Minecraft version** (1.20.1, 1.21.1). The data-pack surface is the same everywhere — a power JSON works on any build. The **Java API** mostly matches too, but where it touches the loader or version-specific game code, it differs. This page flags what to watch.

## Fabric vs NeoForge

The registries, `PowerType`, contexts, and codecs are identical. What differs is how you *hook into the game*:

| Concern         | Fabric                | NeoForge                       |
|-----------------|-----------------------|--------------------------------|
| Entry point     | `ModInitializer`      | `@Mod` class + mod bus events  |
| Game hooks      | mostly **mixins**     | often **events** (plus mixins) |
| Networking      | Fabric networking API | NeoForge payload registration  |
| Rendering hooks | mixins                | render events / mixins         |

For example, the phasing/overlay renderer is a Fabric mixin on the client, but a render **event** on NeoForge. Keep loader-specific code in a loader source set (or a `compat`-style split) and share the codecs and logic.

## Sharing code across loaders

The bulk of an addon — config records, codecs, the `run`/`test`/lifecycle logic — is loader-agnostic and belongs in shared code. Only the thin hook layer (entrypoint, event/mixin wiring, packet send/receive) needs a per-loader implementation. Apoli itself is organized this way; mirror it.

## Minecraft 1.20.1 vs 1.21.1

Version gaps are mostly vanilla API changes that ripple through:

| Area                | 1.20.1                           | 1.21.1                                       |
|---------------------|----------------------------------|----------------------------------------------|
| Item data           | NBT `tag`                        | data **components**                          |
| Identifiers         | `new ResourceLocation(ns, path)` | `ResourceLocation.fromNamespaceAndPath(...)` |
| Particles from JSON | `fromCommand` parsing            | object codec                                 |
| Some registries     | direct                           | `Holder` / registry entries                  |

These affect a data type's codec (e.g. [item stack](/docs/datapack/data-types/item-stack) `components` vs `tag`) and any code naming vanilla classes. When you port a page or a class between versions, the identifiers change flavor — don't mix them.

## Keep the versions in lockstep

Apoli and Origins are bumped together, and an addon should depend on a specific qualified build. Two rules that prevent the most common crash:

1. **Rebuild against the exact Apoli build you ship with.** A "same version, different jar" mismatch crashes on join — see [networking](/docs/addon/systems/networking#protocol-versioning--the-rules).
2. When Apoli changes, republish it to `mavenLocal` and rebuild your addon with `--refresh-dependencies` so you're not compiling against a stale copy.
