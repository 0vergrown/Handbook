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

Names are forgiving — case, spaces, `_` and `-` are ignored, and `arm_right`, `right_sleeve`, `jacket`, `headwear` and friends all bind to the part you'd expect. The [power's page](/docs/datapack/powers/custom_model_render) has the full table, along with the current limits: `uv_rotation` isn't supported yet, and only the first geometry in a file is read.

> **Since this was written:** geometry mode was third-person only at 1.21.1. Apoli **1.22.0** added `show_first_person` for it, and **1.42.0** added [Blockbench animations](/blog/blockbench-animations-on-a-custom-model).

## It isn't only players

Geometry mode also draws on the minions summoned by [`Summon Minion (Entity Action Type)`](/docs/datapack/entity-actions/summon_minion). A minion is normally a little orb of nested flat quads; give it a `custom_model_render` power through the action's `powers` list and it is drawn as your Blockbench model instead. That is a data-pack-only way to give a summon any shape you like — a familiar, a drone, a floating sword — without a line of Java or a custom entity type.

```json
{
  "type": "apoli:summon_minion",
  "follow_owner": true,
  "follow_offset": [0.0, 1.0, -1.0],
  "max_life_ticks": 0,
  "powers": ["example:minion_wisp_model"]
}
```

```json
{
  "type": "apoli:custom_model_render",
  "mode": "geometry",
  "model_location": "example:wisp",
  "texture_location": "example:textures/entity/wisp.png",
  "render_type": "cutout_no_cull"
}
```

The power goes on **the minion**, not on the summoner. Everything that follows from that is worth being deliberate about: the power's `condition` is evaluated against the minion, and a `custom_model_render` on the *player* draws on the player, never on their summons.

### The minion skeleton

Where a player has seven body-part bones, a minion has three, and only one of them moves:

| Bone | Bedrock pivot | Behaviour |
| --- | --- | --- |
| `main` | `[0, 4, 0]` | The root. Turns to face wherever the minion is looking. |
| `flat2`, `flat3` | — | The two inner quads. Fixed; a bone naming them inherits nothing. |

So the pivot rule above has a one-line version here: **name your root bone `main` and pivot it at `[0, 4, 0]`**, and the model turns with the minion the way the orb does. Everything else in your rig rides along with it, keeping whatever pose you gave it in Blockbench. Any bone that isn't one of the three keeps its authored pose too — which, before animations existed, meant a minion model was a static shape that happened to point at things.

### Replace or layer

`render_as_overlay` means something different on a minion than it does on a player, and this is the one field to get right:

- `false` (the default) — **your model replaces the orb.** Apoli returns no render type for the minion's own model, so nothing of the default shape is drawn.
- `true` — your model is drawn *on top of* the orb, which is still there underneath.

On a player, geometry is always drawn over the player model and the field does nothing.

The minion's own `texture` field on `summon_minion` therefore only matters when you are layering, since it skins the orb and never your geometry — yours always comes from `texture_location`. The summon's `scale` still applies and scales your model with it, and if `model_location` fails to load the minion quietly falls back to its normal orb rather than turning invisible.

It's worth saying plainly: this is a **render** power. A minion wearing a wolf model does not behave like a wolf. Its behaviour comes entirely from `summon_minion` and the powers you give it.

## Getting it

Apoli **1.21.1**, with Origins **1.10.1** alongside it, for Fabric 1.21.1, Fabric 1.20.1 and NeoForge 1.21.1. `body_parts` in geometry mode now names bones in *your* model rather than only the vanilla seven (worth a look if you were using it), since a non-empty `body_parts` now hides the bones it doesn't name.