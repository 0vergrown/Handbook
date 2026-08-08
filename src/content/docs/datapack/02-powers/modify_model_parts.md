---
title: "Modify Model Parts (Power Type)"
description: "Transforms parts of the holder's biped model — rotation, scale, pivot offset and visibility — every frame."
navigation_title: "Modify Model Parts"
---

Transforms parts of the holder's biped model — rotation, scale, pivot offset and visibility — every frame. Each edit can hold a fixed pose, ease in and out, or run a looping keyframe animation.

Type ID: `apoli:modify_model_parts`

> This is a client-side rendering power and only affects biped models (players and humanoid mobs). On players, an edit to a base part (e.g. `body`) is also applied to its skin-overlay layer (e.g. the jacket).

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`transformations` | [Array](/docs/datapack/data-types/array) of [Model Part Transformation](/docs/datapack/data-types/model-part-transformation) | — | The list of edits to apply. Each entry targets one part and one property.
`override_pose` | Array of String | `[]` | Poses whose vanilla animation is thrown away before `transformations` run, so the edits start from the standing pose. Takes the same vanilla `Pose` names as [`apoli:pose`](/docs/datapack/powers/pose)'s `entity_pose`.

## Overriding a pose

A transformation is normally layered on top of whatever vanilla is already doing, which makes animating one *specific* pose awkward: to write your own swimming animation you first have to cancel out vanilla's swim stroke. Listing a pose in `override_pose` resets it to standing first, so your edits are authored against a neutral base.

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

This grows the head by 50% on every axis and locks the right arm to a fixed raised pitch, ignoring the walking/idle animation.

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

`keyframes` replaces `value` with a timeline in ticks. The clock starts when the power becomes active, and `loop` makes it repeat. One power, one entry — no resource, no condition chain, no second power.

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

Leave `loop` at `false` and the timeline plays once, then holds the last keyframe. Combined with a condition, this gives you a triggered animation that settles into a pose.

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

The arm winds back, then throws forward past its target and settles — and when the condition stops holding, it releases back to the vanilla animation over 5 ticks.

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

A hand-written swimming animation. Because `swimming` is listed in `override_pose`, vanilla's swim stroke and horizontal body flip are gone, so the body pitch is authored from scratch instead of fighting the stroke that would otherwise still be running underneath.
