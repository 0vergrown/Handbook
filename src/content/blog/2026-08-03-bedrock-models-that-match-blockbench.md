---
title: Bedrock models that match Blockbench
description: Apoli 1.21.0 and 1.21.1 fix custom_model_render geometry mode — per-cube rotation, box UV, and bone binding.
date: 2026-08-03
author: Overgrown
---

[`Custom Model Render (Power Type)`](/docs/datapack/powers/custom_model_render) in **geometry mode** draws a Blockbench model on a player, straight from a data pack. No Java, no extra mods. Until this week it drew that model *nearly* right, which is worse than drawing it obviously wrong: models looked correct in Blockbench, then came out in game with angled parts flattened, cubes pulled apart at the joints, and textures a couple of pixels adrift.

Apoli **1.21.0** and **1.21.1** fix that. The geometry a `.geo.json` describes is now reproduced exactly and verified corner by corner and UV rect by UV rect against Blockbench's own import and export code, rather than by eye.

## What was wrong

**Rotated cubes were drawn unrotated.** Bedrock lets you rotate an individual cube; Java's model format only rotates whole bones. Apoli was dropping the per-cube rotation on the floor, so any angled detail snapped flat and its neighbours no longer met. Each rotated cube now becomes a synthetic child bone carrying that cube's own pivot and rotation, the same trick Blockbench's Java exporter uses.

**Box UV was packed on the wrong sizes.** Blockbench rounds each cube dimension *down* before laying out the six box-UV faces; only its Java-entity format keeps the fractional size. Apoli was packing from the raw float size, so every cube with a fractional dimension sampled the wrong slice of the sheet, up to 2.65 UV pixels out on a 32×32 texture. Faces that ran past the edge of their island into empty texture also read as *gaps between cubes*, which is why one bug produced two very different-sounding complaints.

**Binding teleported bones.** A bone named `head` was having the vanilla head's *position* copied onto it as well as its rotation, so it jumped to the vanilla pivot; `body` went to the origin, the arms to ±5. Binding is now the vanilla part's change from its rest pose, applied on top of the pose you authored.

**Rigs inside a wrapper group never animated at all**, because only top-level bones were indexed by name and the normal way to build a model in Blockbench is inside a group. Every bone is bindable now, at any depth.

Per-face UV also works properly, including models that mix per-face and box UV cube by cube. Previously the north face's UV was stretched over all six sides.

## The one thing to know when building a model

If you take away one rule: **put your body-part bones on the vanilla pivots.**

Apoli rotates each bone about **its own pivot**, by the angle the vanilla part is turning through. A bone therefore inherits the player's *motion*, but swings around the point you chose in Blockbench. Put that point somewhere other than the player's joint and the limb sweeps an arc the player's limb never takes which reads as "the animation is broken" when the animation is fine and the rig isn't.

| Bone                     | Bedrock pivot                    |
|--------------------------|----------------------------------|
| `head`, `hat`, `body`    | `[0, 24, 0]`                     |
| `right_arm` / `left_arm` | `[-5, 22, 0]` / `[5, 22, 0]`     |
| `right_leg` / `left_leg` | `[-1.9, 12, 0]` / `[1.9, 12, 0]` |

Only the pivot has to match. The cubes hanging off the bone can be any shape or size you like... that's the whole point! The path of least resistance is to open the vanilla player template in Blockbench and rebuild the geometry on top of it, leaving the bones exactly where they are.

Bones deliberately placed off-pivot still work, and are the right call for anything that isn't a limb: an aura ring pivoted at the feet, or an orb pivoted at the head, will orbit the player rather than track a joint.

Names are forgiving — case, spaces, `_` and `-` are ignored, and `arm_right`, `right_sleeve`, `jacket`, `headwear` and friends all bind to the part you'd expect. The [power's page](/docs/datapack/powers/custom_model_render) has the full table, along with the current limits: `uv_rotation` isn't supported yet, only the first geometry in a file is read, and geometry mode is third-person only.

## Getting it

Apoli **1.21.1**, with Origins **1.10.1** alongside it, for Fabric 1.21.1, Fabric 1.20.1 and NeoForge 1.21.1. `body_parts` in geometry mode now names bones in *your* model rather than only the vanilla seven (worth a look if you were using it), since a non-empty `body_parts` now hides the bones it doesn't name.