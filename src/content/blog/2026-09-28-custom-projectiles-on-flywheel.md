---
title: "Custom projectiles on Flywheel, and 1.21's operation names"
description: "Apoli 1.104.0 and Origins 1.46.9: custom projectiles are drawn with Flywheel's instancing when it is installed, and attribute modifiers accept vanilla 1.21's operation names."
date: 2026-09-28
author: Overgrown
---

Apoli **1.104.0** and Origins **1.46.9**. Origins has no changes of its own this time; it is built against the new Apoli.

## Custom projectiles on Flywheel

With [Flywheel](https://github.com/Engine-Room/Flywheel) installed, the projectiles [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) fires are now drawn with instancing, the same way [Vanillin](https://modrinth.com/mod/flw-vanillin) draws minecarts and chests. Each model is built once and shared, and the GPU draws every projectile that uses it in one go instead of one at a time.

They look the same as before. A [`custom_model_render`](/docs/datapack/powers/custom_model_render) geometry model keeps its render type, colour, scale, body parts and animations. A flat `texture_location` sprite still turns to face you. A `held_item` projectile shows its item as long as Vanillin 1.1.3 or newer is installed to build the item model; without it, that one projectile draws the vanilla way.

With 400 model projectiles in view, frame rates were about three times higher:

| | Without Flywheel | With Flywheel |
| --- | --- | --- |
| NeoForge 1.21.1 | ~700 FPS | ~2,150 FPS |
| Fabric 1.21.1 | ~770 FPS | ~2,070 FPS |
| Fabric 1.20.1 | ~610 FPS | ~1,900 FPS |

With only a few projectiles in view there is little to gain. The powers that fire volleys and barrages benefit most.

Flywheel can't draw everything, so a projectile goes back to the vanilla renderer while it uses the `energy_swirl` render type, while it's on fire, while its name tag shows and while hitboxes are on. Everything that already hands entities back to the vanilla renderer covers projectiles too, so [`apoli:prevent_entity_render`](/docs/datapack/powers/prevent_entity_render) still hides them and glowing still outlines them. If Flywheel ever fails while drawing one, Apoli logs it once and draws projectiles the vanilla way for the rest of the session. The [performance mods page](/docs/compat/performance-mods/overview#custom-projectiles) has the details.

## 1.21's operation names

Vanilla 1.21 renamed the attribute modifier operations: `addition` became `add_value`, `multiply_base` became `add_multiplied_base`, and `multiply_total` became `add_multiplied_total`. Apoli already took the 1.20 names and the upper-case 1.21 ones, but a lower-case `add_value` failed with `Unknown attribute modifier operation`. All three spellings now work anywhere an [attribute modifier operation](/docs/datapack/data-types/attribute-modifier-operation) goes, on every version.

That page also had two mistakes of its own. It gave `multiply_total_additive` as `Total * (Total * Modifier)` when it has always been `Total + (Total * Modifier)`, and it left out `add_total_early` and `add_total_late`. Both are fixed.
