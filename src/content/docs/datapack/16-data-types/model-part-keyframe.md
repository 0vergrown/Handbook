---
title: "Model Part Keyframe (Data Type)"
description: "One point on a Model Part Transformation's timeline: a value, or a point to reach, at a given time."
navigation_title: "Model Part Keyframe"
---

One point on a [Model Part Transformation](/docs/datapack/data-types/model-part-transformation)'s timeline: the value the part should have reached at a given time, or for a `reach`, the point its hand or foot should be at.

## Fields

| Field    | Type                                             | Default            | Purpose                                                                                                                       |
| -------- | ------------------------------------------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `time`   | [Float](/docs/datapack/data-types/float)          | —                  | When this keyframe is reached, in ticks from the start of the animation. Fractional values are allowed.                        |
| `value`  | [Float](/docs/datapack/data-types/float) OR [Expression](/docs/datapack/data-types/expression) | —                  | The value at this instant, meaning the same thing as the transformation's `type` (radians, scale offset, pivot offset, …). As an Expression it is re-evaluated as the model renders. Required, except on a `reach` keyframe that sets `target`. |
| `target` | [Vector](/docs/datapack/data-types/vector)        | —                  | `reach` only: the point the limb reaches for at this instant, in the same model units as the transformation's `target`. See [Drawing a path](/docs/datapack/data-types/model-part-transformation#drawing-a-path). |
| `easing` | [Easing](/docs/datapack/data-types/easing)        | the transformation's `easing` | The curve used to travel **into** this keyframe from the previous one. The first keyframe's `easing` is never used. |

Keyframes are sorted by `time` when the power loads, so the order you write them in does not matter.

## How the timeline is read

- A `reach` keyframe can set a `value`, a `target` or both. The two are separate tracks: values are read from the keyframes that set a value, points from the keyframes that set a target, so the reach can fade in on its own schedule while its point moves. With no keyframe values the transformation's `value` is used, and with no keyframe points its `target`.
- Before the first keyframe's `time`, the value is held at the first keyframe's `value`.
- After the last keyframe's `time`, the value is held at the last keyframe's `value` — unless the transformation sets `"loop": true`, in which case the timeline wraps back to the start and repeats forever.
- With `"easing": "step"` a keyframe holds the previous value and snaps at the last moment, which is what you want for `visible` and `hidden`.
- With `"easing": "catmullrom"` the segment curves smoothly through the neighbouring keyframes instead of running straight between two of them. On a looping timeline the neighbours wrap around, so the loop stays smooth at the seam.

## Example

```json
[
  { "time": 0,  "value": 0 },
  { "time": 4,  "value": -1.9, "easing": "ease_out_cubic" },
  { "time": 10, "value": -1.9 },
  { "time": 16, "value": 0,    "easing": "ease_in_out_quad" }
]
```

Swings to −1.9 rad over 4 ticks with a hard-out curve, holds the pose for 6 ticks, then eases back to rest over 6 more.

On a `reach`, points and values can share a timeline:

```json
[
  { "time": 0,  "value": 0, "target": [0, -4, -8] },
  { "time": 6,  "value": 1 },
  { "time": 12, "target": [0, -10, -8] },
  { "time": 18, "target": [0, -4, -8] }
]
```

The hands fade in over 6 ticks while the point they reach for rises from face height to above the head, then comes back down.
