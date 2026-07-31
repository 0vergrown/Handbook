---
title: "Model Part Transformation (Data Type)"
description: "A single edit to one named part of a biped model, used by apoli:modify_model_parts."
navigation_title: "Model Part Transformation"
---

A single edit to one named part of a biped model, used by the [Modify Model Parts](/docs/datapack/powers/modify_model_parts) power type.

By default the edit snaps on and off with the power. Add `duration` to make it ease in and out instead, or `keyframes` to make it animate — see [Animating a part](#animating-a-part).

## Fields

| Field                | Type                                                                                          | Default   | Description                                                                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model_part`         | [String](/docs/datapack/data-types/string)                                                     | —         | The part to edit. One of `head`, `hat`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg`. Matching ignores case and separators (`right_arm` = `rightArm` = `rightarm`). On players the matching skin-overlay layer is edited together with the base part. |
| `type`               | [String](/docs/datapack/data-types/string)                                                     | —         | Which property to change. See the table below.                                                                                                                                                                                                                  |
| `value`              | [Float](/docs/datapack/data-types/float)                                                       | —         | The amount. Its meaning depends on `type` (see below). Required unless `keyframes` is set, in which case it is ignored.                                                                                                                                          |
| `override_animation` | [Boolean](/docs/datapack/data-types/boolean)                                                   | `false`   | For `pitch`/`yaw`/`roll` only: if `true`, the value becomes the absolute rotation and the vanilla animation for that axis is ignored ("locked"). If `false`, it is added on top of the animation.                                                                 |
| `keyframes`          | [Array](/docs/datapack/data-types/array) of [Model Part Keyframe](/docs/datapack/data-types/model-part-keyframe) | `[]`      | A timeline of values. When set, this replaces `value` and the part animates instead of holding still. The clock starts at 0 the moment the power becomes active.                                                                                                 |
| `loop`               | [Boolean](/docs/datapack/data-types/boolean)                                                   | `false`   | If `true`, the keyframe timeline repeats forever. If `false`, it plays once and holds the last keyframe's value.                                                                                                                                                 |
| `duration`           | [Float](/docs/datapack/data-types/float)                                                       | `0`       | Ticks to fade the whole transformation in when the power becomes active. `0` applies it instantly, which is the original behaviour.                                                                                                                              |
| `fade_out_duration`  | [Float](/docs/datapack/data-types/float)                                                       | `duration` | Ticks to fade the transformation back out when the power stops applying. Set it separately for an asymmetric fade (snap in, ease out).                                                                                                                           |
| `easing`             | [Easing](/docs/datapack/data-types/easing)                                                     | `linear`  | The curve used for the fade in and out, and the default curve for any keyframe that does not name its own.                                                                                                                                                       |

## `type` values

`type` | Effect of the value
-------|-------------------
`pitch` | Rotation around the X axis, in radians. Additive, or absolute when `override_animation` is `true`.
`yaw` | Rotation around the Y axis, in radians. Additive, or absolute when `override_animation` is `true`.
`roll` | Rotation around the Z axis, in radians. Additive, or absolute when `override_animation` is `true`.
`x_scale` | Added to the part's base X scale (base is `1.0`, so `0.5` → `1.5`, `-1.0` → `0.0`).
`y_scale` | Added to the part's base Y scale.
`z_scale` | Added to the part's base Z scale.
`pivot_x` | Added to the part's X pivot (position) offset.
`pivot_y` | Added to the part's Y pivot offset.
`pivot_z` | Added to the part's Z pivot offset.
`visible` | Sets visibility: `0` hides the part (and its children), any other value shows it. `override_animation` is ignored.
`hidden` | Sets the "skip draw" flag: non-`0` skips drawing this part's own cubes while still drawing its children. `override_animation` is ignored.

## Animating a part

Two independent controls, and they combine:

- **`duration` / `fade_out_duration` / `easing`** blend the transformation in and out. Think of it as a strength dial from `0` to `1`: at `0` the part is untouched, at `1` the edit is fully applied. Rotations with `override_animation` blend from the vanilla animation towards your value; everything else scales down proportionally.
- **`keyframes` / `loop`** decide what the value *is* at each moment. The clock starts at `0` when the power becomes active and is measured in ticks.

> `visible` and `hidden` cannot be half-applied. They flip once the fade passes the halfway mark, in both directions.

Interrupting a fade does not pop: if the power comes back before the fade-out finishes, the fade-in resumes from wherever it got to. Re-activating a power does restart its keyframe timeline from `0`.

## Examples

A pose that eases on instead of snapping:

```json
{
  "model_part": "right_arm",
  "type": "pitch",
  "value": -1.5708,
  "override_animation": true,
  "duration": 8,
  "fade_out_duration": 4,
  "easing": "ease_out_back"
}
```

Over 8 ticks the arm rotates from wherever the walk animation has it to straight forward (−90°), overshooting a little at the end. When the power stops applying it returns over 4 ticks.

A looping animation in a single transformation:

```json
{
  "model_part": "head",
  "type": "roll",
  "loop": true,
  "easing": "catmullrom",
  "keyframes": [
    { "time": 0,  "value": 0 },
    { "time": 15, "value": 0.2 },
    { "time": 30, "value": 0 },
    { "time": 45, "value": -0.2 },
    { "time": 60, "value": 0 }
  ]
}
```

The head sways side to side on a 3-second cycle, on top of whatever the vanilla animation is doing.

A blink, using `step` so the value never lands between visible and invisible:

```json
{
  "model_part": "hat",
  "type": "visible",
  "loop": true,
  "keyframes": [
    { "time": 0,  "value": 1 },
    { "time": 55, "value": 0, "easing": "step" },
    { "time": 58, "value": 1, "easing": "step" }
  ]
}
```
