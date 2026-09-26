---
title: "Body Part (Data Type)"
description: "A named part of a humanoid body — a limb, a skin layer, a region such as a hand or the chest, or a group such as both arms."
navigation_title: "Body Part"
---

A named part of a humanoid body — a limb, a skin layer, a region such as a hand or the chest, or a group such as both arms. Every field that names a body part reads the same list:

- `model_part` in a [Model Part Transformation](/docs/datapack/data-types/model-part-transformation), [apoli:particle](/docs/datapack/powers/particle) and [apoli:spawn_particles](/docs/datapack/entity-actions/spawn_particles)
- `part` in [apoli:model_color](/docs/datapack/powers/model_color)
- `body_parts` in [apoli:custom_model_render](/docs/datapack/powers/custom_model_render)
- `body_part` in the [apoli:body_part](/docs/datapack/damage-conditions/body_part) damage condition

Given as a String. Matching ignores case, spaces, `_` and `-`, so `right_arm`, `RightArm` and `right-arm` are the same part.

## Limbs and skin layers

These map onto the parts of the vanilla biped model. On a player, a limb also covers its skin-overlay layer; the layer names on their own target only the layer.

| Name | Also accepts | Covers |
| --- | --- | --- |
| `head` | | The head and the hat layer. |
| `hat` | `headwear`, `hat_layer`, `head_layer` | The hat layer only. |
| `body` | `torso`, `waist` | The torso and the jacket layer. |
| `jacket` | `body_layer` | The jacket layer only. |
| `right_arm` / `left_arm` | `arm_right` / `arm_left` | The arm and its sleeve. |
| `right_sleeve` / `left_sleeve` | `right_arm_layer` / `left_arm_layer` | The sleeve only. |
| `right_leg` / `left_leg` | `leg_right` / `leg_left` | The leg and its trouser layer. |
| `right_pants` / `left_pants` | `right_leg_layer` / `left_leg_layer` | The trouser layer only. |

## Regions

A region is a piece of a limb rather than a whole model part. Regions are what a particle anchors to and what a hit can land on; they are not separate pieces of the model, so they do nothing in `apoli:model_color`, `apoli:modify_model_parts` or `body_parts`.

| Name | Also accepts | Where |
| --- | --- | --- |
| `right_hand` / `left_hand` | `hand_right`, `right_fist` / `hand_left`, `left_fist` | The last quarter of that arm, where a held item sits. |
| `main_hand` / `off_hand` | `hand_main` / `hand_off` | The hand on the entity's main or off side — `right_hand` for a right-handed entity, `left_hand` for a left-handed one. |
| `hands` | | Either hand. |
| `right_foot` / `left_foot` | `foot_right` / `foot_left` | The last quarter of that leg. |
| `feet` | | Either foot. |
| `chest` | | The front of the upper half of the torso. |
| `back` | | The back half of the torso. |
| `achilles_heel` | | The back of either foot. |

## Groups

A group names several limbs at once. In [apoli:modify_model_parts](/docs/datapack/powers/modify_model_parts) a group moves **as one piece** — a `pitch` on `upper` bends the whole upper body forward at the waist instead of tipping the head, arms and torso over each on its own pivot. Everywhere else a group simply means all of its parts.

| Name | Also accepts | Covers | Pivot |
| --- | --- | --- | --- |
| `arms` | | Both arms and their sleeves. | Halfway between the shoulders. |
| `legs` | | Both legs and their trouser layers. | Halfway between the hips. |
| `upper` | `upper_body` | Head, torso and both arms, with their layers. | The waist — the bottom of the torso, following it when it leans. |
| `lower` | `lower_body` | Torso and both legs, with their layers. | The neck — the top of the torso. |
| `whole` | `any`, `all` | Every part of the model, including any extra limbs. | The feet, at ground level. |

Each pivot is the joint that holds the group to the rest of the body, so a rotated group stays attached: `upper` swings around the waist the legs hang from, and `lower` around the neck the head sits on. `whole` turns around the feet, which keeps the model standing on the ground when it is scaled. A transformation can move the pivot with its `pivot` field — see [Moving a group](/docs/datapack/data-types/model-part-transformation#moving-a-group).

## Wings and Ears features

These name the extra geometry that [Icarus](/docs/compat/icarus/overview) and [Ears](/docs/compat/skin-rendering/overview) draw on a player. They only do anything with that mod installed, and nothing at all without it. Both Ears 1.4 and Ears 2 are supported.

| Name | Also accepts | Covers |
| --- | --- | --- |
| `right_wing` / `left_wing` | `wing_right` / `wing_left`, `icarus_right_wing` / `icarus_left_wing` | That Icarus wing, and the wing on that side of an Ears wing pair. |
| `wings` | `icarus_wings` | Both Icarus wings and every Ears wing, including a single or flat one. |
| `ears` | | Every ear Ears draws. |
| `right_ear` / `left_ear` | `ear_right` / `ear_left` | That ear, in the Ears ear modes that draw each ear on its own. |
| `horns` | `horn` | The Ears horn. |
| `snout` | | The Ears snout. |
| `tail` | | The Ears tail. |
| `claws` | | All four Ears claws. |
| `right_arm_claw` / `left_arm_claw` | `claw_right_arm` / `claw_left_arm` | The claw on that arm. |
| `right_leg_claw` / `left_leg_claw` | `claw_right_leg` / `claw_left_leg` | The claw on that leg. |
| `ears_chest` | | The chest piece Ears draws. |
| `ears_cape` | | The cape Ears draws from the skin file. |
| `halo` | | The Ears halo, single or double. Ears 2 only. |
| `right_digitigrade_leg` / `left_digitigrade_leg` | `digitigrade_right_leg` / `digitigrade_left_leg` | That digitigrade leg, trousers included. Ears 2 only. |
| `digitigrade_legs` | | Both digitigrade legs. Ears 2 only. |

They work in `model_part` of [apoli:modify_model_parts](/docs/datapack/powers/modify_model_parts) and `part` of [apoli:model_color](/docs/datapack/powers/model_color):

- **Icarus wings** are real model parts, so every transformation type applies — `pitch`, `yaw` and `roll` swing the wing about its root on the back, the scales grow it from there, and `visible` / `hidden` take it away. This covers wings from an equipped item and from [apoli:wings](/docs/compat/icarus/wings) alike.
- **Ears features** are drawn by Ears itself, not as model parts, so they answer to `visible` and `hidden` and to colour, but not to rotation, scale or pivot. They already follow the part they hang from: bend `head` and the ears and horns go with it.

Ears draws both ears as one shape in its `above`, `cross`, `tall` and `tall_cross` ear modes. `right_ear` and `left_ear` cannot reach that shape on their own; `ears` does, and so does hiding both `right_ear` and `left_ear` at once. Wings work the same way: a single or flat Ears wing answers to `wings`, or to hiding both `right_wing` and `left_wing`.

Sides are always the player's own: `right_wing` is the wing on the player's right, including in an asymmetric Ears wing pair whose skin layout names that wing the left one.

None of these are part of a group — `whole` and `upper` leave wings and Ears features alone. They have no hitbox, so the [apoli:body_part](/docs/datapack/damage-conditions/body_part) condition refuses them, and particles and `body_parts` have nothing to attach to.

## Other names

A name that is not in the lists above is passed through unchanged, and so are the wing and Ears names — `tail` reaches `apoli:centaur`'s horse tail as well as an Ears tail. That is how the extra limbs of the built-in models are reached — `right_second_arm` on `apoli:four_arms`, `right_second_leg` on `apoli:stinkfly`, `horse_body` on `apoli:centaur` — and how a minion's `main`, `flat2` and `flat3` parts are named in `body_parts`. On those models the groups pick up the extra limbs too: `arms` covers all four arms of `apoli:four_arms`, and `legs` covers all four legs of `apoli:stinkfly`.

The [apoli:body_part](/docs/datapack/damage-conditions/body_part) condition only accepts the limbs, layers, regions and groups on this page, and fails to load with an unknown name or a wing or Ears name, because it can only ever narrow down which hits it matches.

## Example

```json
{
  "type": "apoli:modify_model_parts",
  "transformations": [
    {
      "model_part": "arms",
      "type": "pitch",
      "value": -1.5708,
      "override_animation": true
    }
  ]
}
```

Both arms held straight out in front, swinging together around the line between the shoulders.
