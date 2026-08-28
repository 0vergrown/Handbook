---
title: Performance Mods
description: How Apoli's render powers behave alongside Sodium, Lithium, EntityCulling, ImmediatelyFast, FerriteCore and the Extra/Rubidium forks.
---

Performance mods rewrite the parts of the client that Apoli's render powers hook, so Apoli meets them
half way: it hooks the replacement where one exists, stays out of the way where the mod is already
doing the right thing, and keeps its own per-frame cost near zero so it never becomes the bottleneck
the mod was installed to fix.

This integration is **behaviour-gated and adds no types**. Nothing to enable and no new JSON — install
the mod and the powers you already have keep working.

## At a glance

| Mod | What it changes | What Apoli does |
| --- | --- | --- |
| [Sodium](https://modrinth.com/mod/sodium) / Rubidium / Embeddium | Replaces chunk meshing, including where block states are read from | Hooks Sodium's own chunk reader as well as vanilla's, so [`apoli:modify_block_render`](/docs/datapack/powers/modify_block_render) applies to the mesh either way |
| [Sodium Extra](https://modrinth.com/mod/sodium-extra) / Rubidium Extra | Fog distance, particle toggles, per-entity render toggles | Apoli's fog powers apply after its fog distance; its particle toggles gate Apoli's particles like any other |
| [EntityCulling](https://modrinth.com/mod/entityculling) | Skips entities hidden behind blocks | Nothing to do — Apoli decides visibility earlier, in `shouldRender`, so a hidden entity costs even less |
| [ImmediatelyFast](https://modrinth.com/mod/immediatelyfast) | Batches HUD and immediate-mode drawing | Apoli's HUD bars, overlays and badges draw through `GuiGraphics` and never force a flush, so they batch with everything else |
| [Lithium](https://modrinth.com/mod/lithium) | Server-side game logic, entity collisions | Its collision sweeper asks the block for its shape the normal way, so [`apoli:phasing`](/docs/datapack/powers/phasing) still applies |
| [FerriteCore](https://modrinth.com/mod/ferritecore) | Memory layout of block states and models | No interaction — it touches nothing Apoli hooks |

## Sodium and the block render powers

Sodium does not build chunk meshes from vanilla's `RenderChunkRegion`; it copies each chunk section
into its own reader on a worker thread. A power that swaps one block's appearance for another has to
be applied there too, or the mesh is built from the real block and the power looks like it does
nothing.

Apoli hooks both readers, so [`apoli:modify_block_render`](/docs/datapack/powers/modify_block_render)
behaves the same with Sodium as without it, and the Sodium hook is only installed when Sodium is
actually present. Rubidium and Embeddium are Sodium ports and are covered by the same hook.

Granting or revoking the power — or a `block_condition` on it changing — rebuilds the affected chunks
on its own, so the swap appears immediately instead of waiting for something else to dirty the chunk.

> A block-render power costs a condition test per block lookup during a chunk rebuild, which is the
> hottest loop in the game. Keep its `block_condition` cheap — a block or tag test, not a nested
> entity condition — and prefer one power with a broad condition over several narrow ones.

## Sodium Extra and fog

Sodium Extra sets its own fog distance after vanilla has set fog up. Apoli's fog powers —
[`apoli:fluid_vision`](/docs/datapack/powers/fluid_vision) and the `blindness` render type of
[`apoli:phasing`](/docs/datapack/powers/phasing) — apply last, so the power wins where the two
disagree and Sodium Extra's setting governs everything else.

Its **Particles** page gates Apoli's particles the same way it gates vanilla's: turning particles off,
or switching `apoli:custom` off in the per-type list, stops them being created at all.

Its **Prevent Shaders** setting blocks every post-processing shader the game loads, including the one
[`apoli:shader`](/docs/datapack/powers/shader) asks for. If a shader power does nothing, check that
setting first — Apoli logs a warning naming it when a shader fails to load.

## What a power costs when nobody has it

Every render hook Apoli installs reads one flag before it does anything else, refreshed once per tick
from the powers you actually hold. A player with no `prevent_entity_render` pays a field read per
entity per frame; a world with no `modify_block_render` pays an array-length check per block lookup.
That is the reason these hooks can sit in the middle of Sodium's mesher at all.
