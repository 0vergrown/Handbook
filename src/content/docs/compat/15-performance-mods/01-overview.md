---
title: Performance Mods
description: How Apoli's render powers behave alongside Sodium, Lithium, EntityCulling, ImmediatelyFast, FerriteCore, Flywheel, Vanillin and the Extra/Rubidium forks.
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
| [Flywheel](https://github.com/Engine-Room/Flywheel) / [Vanillin](https://modrinth.com/mod/flw-vanillin) | Draws some entities with GPU instancing instead of the vanilla renderer | Hands an entity back to the vanilla renderer while an Apoli power changes how it looks, so hiding, glowing, scaling and disguises still show, and draws Apoli's own custom projectiles through Flywheel |

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

## Flywheel and Vanillin

[Flywheel](https://github.com/Engine-Room/Flywheel) draws entities and block entities with GPU
instancing instead of the vanilla renderer. It takes nothing over by itself; the mods built on it
choose what to draw. [Vanillin](https://modrinth.com/mod/flw-vanillin) takes minecarts, block displays,
chests, bells and shulker boxes, plus dropped items, item displays and item frames when those are
turned on in its config. Create takes its contraptions.

An entity Flywheel draws skips the vanilla renderer entirely, and the vanilla renderer is where Apoli's
render powers do their work. So for as long as one of these applies to an entity, Apoli hands it back
to the vanilla renderer, and gives it back to Flywheel as soon as none does:

| Applies to the entity | Comes from |
| --- | --- |
| Hidden from you | [`apoli:prevent_entity_render`](/docs/datapack/powers/prevent_entity_render) |
| Glowing for you — the outline is drawn by the vanilla renderer | [`apoli:entity_glow`](/docs/datapack/powers/entity_glow), or any other source of glowing |
| Model resized | [`apoli:scale`](/docs/datapack/powers/scale) or `/apoli:scale` with `model_width`, `model_height` or a type above them |
| Disguised | [`apoli:disguise`](/docs/datapack/bientity-actions/disguise) |
| Running at another tick rate | [`apoli:modify_tick_rate`](/docs/datapack/powers/modify_tick_rate) |
| Riding a player | [`apoli:mount`](/docs/datapack/bientity-actions/mount) or anything else that seats it on a player |
| Lit by its own power | [`apoli:emissive`](/docs/datapack/powers/emissive) |
| A mob or player that holds any power | Only matters if a Flywheel mod draws that mob type |

The check runs once a tick, and only for entities of a type Flywheel is drawing.

On players and mobs, Apoli's own layers — [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render)
with its energy swirls, and [`apoli:model_color`](/docs/datapack/powers/model_color) — stay on the
vanilla renderer. Flywheel mods leave players and mobs to it, and those layers are posed from the live
model every frame, a pose that only exists there, so they look the same with Flywheel as without it.

With a shader pack loaded, Flywheel switches itself off unless a Flywheel shader compat mod is
installed, and everything draws the vanilla way.

### Custom projectiles

With Flywheel installed, Vanillin or not, Apoli draws the projectiles
[`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) fires through Flywheel as well. They
look the same as they do without it:

| The projectile shows | With Flywheel |
| --- | --- |
| A [`custom_model_render`](/docs/datapack/powers/custom_model_render) geometry model | Instanced, keeping its `render_type`, colour, `alpha`, `scale`, `body_parts` and animations |
| Its `texture_location` as a flat sprite | Instanced |
| An item, from `held_item` or `offhand_item` | Instanced when Vanillin 1.1.3 or newer is installed, drawn the vanilla way otherwise |

A projectile goes back to the vanilla renderer while any of these is true, and returns to Flywheel once
none is:

- one of its layers uses the `energy_swirl` render type;
- it is on fire;
- its name tag is showing;
- hitboxes are showing (F3+B);
- anything in the table above applies to it, so hiding and glowing work on projectiles too.

> Instancing pays off when many projectiles are in view. With 400 model projectiles on screen, the
> frame rate was about three times higher with Flywheel than without it in testing.

> **Vanillin on NeoForge.** Vanillin 1.1.3 for NeoForge ships the mixin that lets it read item colours
> but never registers it, so turning on its dropped-item, item-display or item-frame visuals crashes the
> game the first time an item entity comes into view — including the one `/give` spawns for its pickup
> animation. When Vanillin's own is missing, Apoli registers an equivalent so those options work. A
> Vanillin build that registers its own is left alone.

## What a power costs when nobody has it

Every render hook Apoli installs reads one flag before it does anything else, refreshed once per tick
from the powers you actually hold. A player with no `prevent_entity_render` pays a field read per
entity per frame; a world with no `modify_block_render` pays an array-length check per block lookup.
That is the reason these hooks can sit in the middle of Sodium's mesher at all.
