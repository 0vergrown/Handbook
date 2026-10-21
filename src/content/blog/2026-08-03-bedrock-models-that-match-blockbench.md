---
title: Bedrock models that match Blockbench
description: "Apoli 1.21.0 and 1.21.1 fix geometry mode in custom_model_render: rotation on single cubes, box UV and bone binding."
date: 2026-08-03
author: Overgrown
---

[`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) in geometry mode draws a Blockbench model on a player, straight from a data pack, with no Java and no extra mods. Until this week it drew that model nearly right, which is worse than drawing it obviously wrong. Models looked correct in Blockbench, then came out in game with angled parts flattened, cubes pulled apart at the joints, and textures a couple of pixels adrift.

Apoli 1.21.0 and 1.21.1 fix that. The geometry a `.geo.json` describes is now reproduced exactly, and I checked it corner by corner and UV rect by UV rect against Blockbench's own import and export code instead of by eye.

## What was wrong

Rotated cubes were drawn unrotated. Bedrock lets you rotate a single cube, while Java's model format only rotates whole bones. Apoli was dropping the rotation of single cubes on the floor, so any angled detail snapped flat and its neighbours no longer met. Each rotated cube now becomes a generated child bone with that cube's own pivot and rotation, the same trick Blockbench's Java exporter uses.

Box UV was packed on the wrong sizes. Blockbench rounds each cube dimension down before laying out the six box UV faces, and only its Java entity format keeps the fractional size. Apoli was packing from the raw float size, so every cube with a fractional dimension sampled the wrong slice of the sheet, up to 2.65 UV pixels out on a 32×32 texture. Faces that ran past the edge of their island into empty texture also looked like gaps between cubes, which is why one bug produced two very different-sounding complaints.

Binding teleported bones. A bone named `head` had the vanilla head's position copied onto it as well as its rotation, so it jumped to the vanilla pivot. `body` went to the origin, and the arms to ±5. Binding is now the vanilla part's change from its rest pose, applied on top of the pose you made.

Rigs inside a wrapper group never animated at all, because only top-level bones were indexed by name, and the normal way to build a model in Blockbench is inside a group. Every bone can be bound now, at any depth.

UV for each face also works properly, including models that mix per-face and box UV cube by cube. Before, the north face's UV was stretched over all six sides.

## The one thing to know when building a model

If you take away one rule, make it this: put your body part bones on the vanilla pivots.

Apoli rotates each bone about its own pivot, by the angle the vanilla part is turning through. A bone therefore picks up the player's motion, but swings around the point you chose in Blockbench. Put that point anywhere other than the player's joint and the limb sweeps an arc the player's limb never takes. It looks like the animation is broken, when the animation is fine and the rig isn't.

| Bone | Bedrock pivot |
| --- | --- |
| `head`, `hat`, `body` | `[0, 24, 0]` |
| `right_arm`, `left_arm` | `[-5, 22, 0]`, `[5, 22, 0]` |
| `right_leg`, `left_leg` | `[-1.9, 12, 0]`, `[1.9, 12, 0]` |

Only the pivot has to match. The cubes hanging off the bone can be any shape or size you like, which is the whole point. The easiest path is to open the vanilla player template in Blockbench and rebuild the geometry on top of it, leaving the bones exactly where they are.

Bones placed off-pivot on purpose still work, and are the right call for anything that isn't a limb. An aura ring pivoted at the feet, or an orb pivoted at the head, orbits the player instead of tracking a joint.

Names are forgiving. Case, spaces, `_` and `-` are ignored, and `arm_right`, `right_sleeve`, `jacket`, `headwear` and similar names all bind to the part you'd expect. The [power's page](/docs/datapack/powers/custom_model_render) has the full table, along with the current limits: `uv_rotation` isn't supported yet, and only the first geometry in a file is read.

> [!NOTE]
> An update since this post: in 1.21.1, geometry mode only drew in third person. Apoli 1.22.0 added `show_first_person` for it, and 1.42.0 added [Blockbench animations](/blog/blockbench-animations-on-a-custom-model).

## It isn't only players

Geometry mode also draws on the minions summoned by [`apoli:summon_minion`](/docs/datapack/entity-actions/summon_minion). A minion is normally a little orb of nested flat quads. Give it a `custom_model_render` power through the action's `powers` list and it is drawn as your Blockbench model instead. That gives a summon any shape you like, such as a familiar, a drone or a floating sword, from a data pack alone, without a line of Java or a custom entity type.

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

The power goes on the minion, not on the summoner, and a few things follow from that. The power's `condition` is evaluated against the minion, and a `custom_model_render` on the player draws on the player, never on their summons.

### The minion skeleton

Where a player has seven body part bones, a minion has three, and only one of them moves:

| Bone | Bedrock pivot | Behaviour |
| --- | --- | --- |
| `main` | `[0, 4, 0]` | The root. It turns to face wherever the minion is looking. |
| `flat2`, `flat3` | _none_ | The two inner quads. They are fixed, and a bone naming them inherits nothing. |

So the pivot rule above comes down to one line here: name your root bone `main` and pivot it at `[0, 4, 0]`, and the model turns with the minion the way the orb does. Everything else in your rig rides along with it, keeping whatever pose you gave it in Blockbench. Any bone that isn't one of the three keeps its pose too, which, before animations existed, meant a minion model was a static shape that happened to point at things.

### Replace or layer

`render_as_overlay` means something different on a minion than on a player, and it is the one field to get right:

- With `false`, the default, your model replaces the orb. Apoli returns no render type for the minion's own model, so nothing of the default shape is drawn.
- With `true`, your model is drawn on top of the orb, which is still there underneath.

On a player, geometry is always drawn over the player model and the field does nothing.

The minion's own `texture` field on `summon_minion` therefore only matters when you are layering, since it skins the orb and never your geometry, which always takes its texture from `texture_location`. The summon's `scale` still applies and scales your model with it, and if `model_location` fails to load, the minion falls back to its normal orb instead of turning invisible.

This is only a render power, so a minion wearing a wolf model doesn't behave like a wolf. Its behaviour comes entirely from `summon_minion` and the powers you give it.

## Getting it

Apoli 1.21.1 is out, with Origins 1.10.1 alongside it, for Fabric 1.21.1, Fabric 1.20.1 and NeoForge 1.21.1. `body_parts` in geometry mode now names bones in your model instead of only the vanilla seven, and a non-empty `body_parts` now hides the bones it doesn't name, so check it if you were using it.
