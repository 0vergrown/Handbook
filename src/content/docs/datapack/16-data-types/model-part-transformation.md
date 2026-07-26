---
title: "Model Part Transformation"
description: "A single edit to one named part of a biped model, used by the Modify Model Parts (Power Type)."
---

A single edit to one named part of a biped model, used by the [Modify Model Parts](/docs/datapack/powers/modify_model_parts) power type.

## Fields

| Field                | Type                  | Default | Description                                                                                                                                                                                                                                                       |
| -------------------- | --------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model_part`         | String   | —       | The part to edit. One of `head`, `hat`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg`. Matching ignores case and separators (`right_arm` = `rightArm` = `rightarm`). On players the matching skin-overlay layer is edited together with the base part. |
| `type`               | String   | —       | Which property to change. See the table below.                                                                                                                                                                                                                    |
| `value`              | Float     | —       | The amount. Its meaning depends on `type` (see below).                                                                                                                                                                                                            |
| `override_animation` | Boolean | `false` | For `pitch`/`yaw`/`roll` only: if `true`, `value` becomes the absolute rotation and the vanilla animation for that axis is ignored ("locked"). If `false`, `value` is added on top of the animation.                                                              |

## `type` values

`type` | Effect of `value`
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

## Example

```json
{
  	"model_part": "right_arm",
  	"type": "pitch",
  	"value": -1.5708,
  	"override_animation": true
}
```

Locks the right arm pointing straight forward (−90°), ignoring its animation.

