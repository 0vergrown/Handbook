---
title: "Modify Model Parts (Power Type)"
description: "Changes the rotation, scale, pivot offset and visibility of parts of the holder's biped model every frame."
navigation_title: "Modify Model Parts"
---

Changes the rotation, scale, pivot offset and visibility of parts of the holder's biped model, every frame. Each edit can hold a fixed pose, ease in and out, or run a looping keyframe animation.

Type ID: `apoli:modify_model_parts`

> [!NOTE]
> This is a client-side rendering power and only affects biped models (players and humanoid mobs). On players, an edit to a base part such as `body` also applies to its skin overlay layer, here the jacket.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `transformations` | [Array](/docs/datapack/data-types/array) of [Model Part Transformation](/docs/datapack/data-types/model-part-transformation) | _required_ | The edits to apply. Each entry targets one [body part](/docs/datapack/data-types/body-part) and one property. The part can be a single limb, a group such as `arms`, `upper` or `whole` that moves as one piece, a [held item](/docs/datapack/data-types/model-part-transformation#held-items), or an Icarus wing or Ears feature by one of the [wing and Ears names](/docs/datapack/data-types/body-part#wings-and-ears-features). A [`reach`](/docs/datapack/data-types/model-part-transformation#reaching-for-a-point) entry points limbs at a spot, so two hands can meet. |
| `override_pose` | [Array](/docs/datapack/data-types/array) of [String](/docs/datapack/data-types/string) | `[]` | Poses whose vanilla animation is thrown away before `transformations` run, so the edits start from the standing pose. Takes the same vanilla `Pose` names as the `entity_pose` of [`apoli:pose`](/docs/datapack/powers/pose). |
| `perspectives` | [String](/docs/datapack/data-types/string) or [Array](/docs/datapack/data-types/array) of [String](/docs/datapack/data-types/string) | `["third_person"]` | Which views the transformations are drawn in: `first_person`, `third_person`, or both. See [First person and third person](#first-person-and-third-person). |

## First person and third person

The held item view draws the player's arm through the same model this power edits, so a body animation written for the third person view lands on the first person hand too, where a scaled or rotated arm looks broken. `perspectives` decides which views an edit is drawn in:

- `third_person` (the default) is the world view: your own body in third person or in an inventory preview, and every other player or humanoid mob.
- `first_person` is only the arm drawn by the held item view.

An arm with an edit in the `first_person` view is always drawn there so the pose can be seen, the off arm as well as the main one. An arm that [reaches](/docs/datapack/data-types/model-part-transformation#reaching-in-first-person) holds its item in its hand, as it does in third person. Any other edited arm is drawn beside the item, which stays where Minecraft normally draws it. Edits that only change visibility, and edits to [held items](/docs/datapack/data-types/model-part-transformation#held-items), don't count.

To draw an edit everywhere, list both views in full: `"perspectives": ["first_person", "third_person"]`.

Each entry in `transformations` can carry its own `perspectives`, which overrides the power's value for that entry. That way one power drives two different animations:

```json
{
  "type": "apoli:modify_model_parts",
  "perspectives": ["first_person", "third_person"],
  "transformations": [
    {
      "model_part": "right_arm",
      "type": "pitch",
      "value": -1.2,
      "override_animation": true,
      "perspectives": "third_person"
    },
    {
      "model_part": "right_arm",
      "type": "pitch",
      "value": -0.35,
      "override_animation": true,
      "perspectives": "first_person"
    }
  ]
}
```

The arm is raised sharply on the visible body and only nudged in the holder's own view.

> [!NOTE]
> The check uses the render pass, not the camera setting. An inventory or GUI preview of the player is a third person pass even while the camera is in first person, so previews keep showing the third person animation.

## Overriding a pose

A transformation is normally layered on top of whatever vanilla is already doing, which makes animating one specific pose awkward. To write your own swimming animation, you would first have to cancel out vanilla's swim stroke. Listing a pose in `override_pose` resets it to standing first, so your edits start from a neutral base.

While the holder is in a listed pose:

- the swim stroke, crouch offsets, elytra lean and riding leg pose are cleared from the model, and
- the body rotation the renderer applies for `swimming`, `fall_flying`, `spin_attack`, `crouching` and `sleeping` is skipped, so the entity stays upright.

Poses you don't list are untouched, so a power can take over swimming and leave crouching alone.

## Examples

```json
{
   "type":"apoli:modify_model_parts",
   "transformations":[
      {
         "model_part":"head",
         "type":"x_scale",
         "value":0.5
      },
      {
         "model_part":"head",
         "type":"y_scale",
         "value":0.5
      },
      {
         "model_part":"head",
         "type":"z_scale",
         "value":0.5
      },
      {
         "model_part":"right_arm",
         "type":"pitch",
         "value":-1.2,
         "override_animation":true
      }
   ]
}
```

This makes the head 50% bigger on every axis and locks the right arm at a fixed raised pitch, ignoring the walking and idle animation.

```json
{
   "type":"apoli:modify_model_parts",
   "transformations":[
      {
         "model_part":"left_leg",
         "type":"visible",
         "value":0
      }
   ]
}
```

This hides the left leg.

> [!NOTE]
> `visible` and `hidden` only change the parts they name, and only while the model is being drawn. Every other part keeps the visibility Minecraft or another mod gave it for that frame, such as skin layer toggles, a spectator's floating head, or the arms-only body that Better Combat and Iron's Spells & Spellbooks draw in first person during their animations. With a CEM pack running through [Entity Model Features](/docs/compat/custom-entity-models), both also hide the boxes the pack gives the part.

### An eased pose

Give any transformation a `duration` and it blends in over that many ticks instead of snapping, then blends back out when the power stops applying. Nothing else about the entry changes.

```json
{
   "type":"apoli:modify_model_parts",
   "condition":{
      "type":"apoli:sneaking"
   },
   "transformations":[
      {
         "model_part":"body",
         "type":"pitch",
         "value":0.6,
         "override_animation":true,
         "duration":6,
         "easing":"ease_in_out_quad"
      }
   ]
}
```

The body leans forward over 6 ticks when the holder starts sneaking and unwinds over 6 ticks when they stop.

### A looping animation

`keyframes` replaces `value` with a timeline in ticks. The clock starts when the power becomes active, and `loop` makes it repeat. It takes one power with one entry per part, with no resource, condition chain or second power.

```json
{
  "type": "apoli:modify_model_parts",
  "transformations": [
    {
      "model_part": "right_arm",
      "type": "pitch",
      "override_animation": true,
      "loop": true,
      "easing": "catmullrom",
      "keyframes": [
        {
          "time": 0,
          "value": 0
        },
        {
          "time": 10,
          "value": -2.4
        },
        {
          "time": 20,
          "value": 0
        }
      ]
    },
    {
      "model_part": "left_arm",
      "type": "pitch",
      "override_animation": true,
      "loop": true,
      "easing": "catmullrom",
      "keyframes": [
        {
          "time": 0,
          "value": -2.4
        },
        {
          "time": 10,
          "value": 0
        },
        {
          "time": 20,
          "value": -2.4
        }
      ]
    }
  ]
}
```

Both arms windmill on a one-second cycle, half a cycle out of phase.

### A one-shot animation

Leave `loop` at `false` and the timeline plays once, then holds the last keyframe. With a condition, that gives a triggered animation that settles into a pose.

```json
{
  "type": "apoli:modify_model_parts",
  "condition": {
    "type": "apoli:power_active",
    "power": "example:charging"
  },
  "transformations": [
    {
      "model_part": "right_arm",
      "type": "pitch",
      "override_animation": true,
      "fade_out_duration": 5,
      "keyframes": [
        {
          "time": 0,
          "value": 0
        },
        {
          "time": 3,
          "value": 0.5,
          "easing": "ease_in_quad"
        },
        {
          "time": 9,
          "value": -2.2,
          "easing": "ease_out_back"
        }
      ]
    }
  ]
}
```

The arm winds back, then throws forward past its target and settles. When the condition stops holding, it goes back to the vanilla animation over 5 ticks.

### A custom swimming animation

```json
{
  "type": "apoli:modify_model_parts",
  "override_pose": [
    "swimming"
  ],
  "transformations": [
    {
      "model_part": "body",
      "type": "pitch",
      "value": 1.5708,
      "override_animation": true
    },
    {
      "model_part": "left_arm",
      "type": "pitch",
      "override_animation": true,
      "loop": true,
      "keyframes": [
        {
          "time": 0,
          "value": -1.2
        },
        {
          "time": 10,
          "value": 0.6,
          "easing": "ease_in_out_sine"
        },
        {
          "time": 20,
          "value": -1.2,
          "easing": "ease_in_out_sine"
        }
      ]
    }
  ]
}
```

Because `swimming` is listed in `override_pose`, vanilla's swim stroke and horizontal body flip are gone, so the body pitch starts from scratch and doesn't fight a stroke still running underneath.
