---
title: "Camera Keyframe (Data Type)"
description: "One point in an apoli:modify_camera animation: a time, the camera values at that time, and how to ease toward the next point."
navigation_title: "Camera Keyframe"
---

One point in an [apoli:modify_camera](/docs/datapack/powers/modify_camera) animation: a time, the camera values at that time, and how to ease toward the next point.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `time` | [Float](/docs/datapack/data-types/float) | _required_ | Ticks after the power turned on. Fractions are allowed. |
| `x` | Float | _optional_ | The camera's `x` offset at this time. |
| `y` | Float | _optional_ | The camera's `y` offset at this time. |
| `z` | Float | _optional_ | The camera's `z` offset at this time. |
| `pitch` | Float | _optional_ | The camera's `pitch` at this time, in degrees. |
| `yaw` | Float | _optional_ | The camera's `yaw` at this time, in degrees. |
| `roll` | Float | _optional_ | The camera's `roll` at this time, in degrees. |
| `fov` | Float | _optional_ | The camera's field-of-view multiplier at this time. |
| `easing` | [Easing](/docs/datapack/data-types/easing) | `linear` | How the values move from this keyframe to the next one. |

Every field you leave out is free: each value has its own track, built only from the keyframes that set it. So one keyframe list can move the camera on four keyframes and roll it on two, and a value with no keyframes at all keeps the value set on the power.

## Easing

`easing` shapes the stretch **after** the keyframe it is on. The last keyframe's `easing` is never used.

- Any curve from [Easing](/docs/datapack/data-types/easing) — `ease_in_out_sine`, `ease_out_back`, `ease_out_bounce` and the rest.
- `step` (also `hold` or `constant`) jumps straight to the next keyframe's value when its time comes.
- `catmullrom` (also `smooth`) passes a curve through the neighbouring keyframes too, so a camera path bends smoothly through every point instead of turning sharply at each one. Use it on every keyframe of the path.

Angles are not wrapped: a `yaw` that goes from `0` to `360` turns one full circle, and from `0` to `720` turns two.

## Example

```json
"keyframes": [
  { "time": 0, "z": -2, "roll": 0 },
  { "time": 20, "z": -8, "easing": "ease_out_cubic" },
  { "time": 40, "z": -8, "roll": 20, "easing": "step" }
]
```

The camera pulls back from two to eight blocks over the first second, slowing as it goes, then snaps to a 20° roll at two seconds.
