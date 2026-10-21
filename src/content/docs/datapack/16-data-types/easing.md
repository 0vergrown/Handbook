---
title: "Easing (Data Type)"
description: "A string naming an interpolation curve, for how a value travels from its start to its end over time."
navigation_title: "Easing"
---

A [String](/docs/datapack/data-types/string) naming an interpolation curve: how a value travels from its start to its end over time, instead of jumping straight there.

Names ignore case and separators, so `ease_in_out`, `easeInOut` and `EASE-IN-OUT` are the same curve.

## Special curves

| Value | Description |
| --- | --- |
| `linear` | A constant rate. The default everywhere an easing is optional. |
| `step` | No interpolation. It holds the starting value and snaps to the end value at the very end. Use it for on and off properties like `visible`. |
| `catmullrom` | A smooth spline through the surrounding [keyframes](/docs/datapack/data-types/model-part-keyframe) instead of a straight line between two of them. It only means something between keyframes, and behaves as `linear` for a fade. Alias: `smooth`. |
| `smoothstep` | The classic `3t² − 2t³` S-curve, a gentle ease in and out. |
| `smootherstep` | Perlin's `6t⁵ − 15t⁴ + 10t³`. Like `smoothstep`, but flatter at both ends. |

## Standard curves

Each family comes in three forms: `ease_in_*` starts slow, `ease_out_*` ends slow, and `ease_in_out_*` does both. They are ordered from gentlest to sharpest:

| Family | Values | Feel |
| --- | --- | --- |
| Sine | `ease_in_sine`, `ease_out_sine`, `ease_in_out_sine` | Barely there. Good for subtle idle motion. |
| Quadratic | `ease_in_quad`, `ease_out_quad`, `ease_in_out_quad` | The safe default for poses. |
| Cubic | `ease_in_cubic`, `ease_out_cubic`, `ease_in_out_cubic` | Noticeably snappier. |
| Quartic | `ease_in_quart`, `ease_out_quart`, `ease_in_out_quart` | Sharp. |
| Quintic | `ease_in_quint`, `ease_out_quint`, `ease_in_out_quint` | Very sharp. |
| Exponential | `ease_in_expo`, `ease_out_expo`, `ease_in_out_expo` | Almost instant at one end. |
| Circular | `ease_in_circ`, `ease_out_circ`, `ease_in_out_circ` | Flat, then abrupt, like a quarter circle. |
| Back | `ease_in_back`, `ease_out_back`, `ease_in_out_back` | Overshoots the target and settles back, like anticipation. |
| Elastic | `ease_in_elastic`, `ease_out_elastic`, `ease_in_out_elastic` | Springs past the target and oscillates. |
| Bounce | `ease_in_bounce`, `ease_out_bounce`, `ease_in_out_bounce` | Hits the target and bounces off it. |

> [!WARNING]
> `back` and `elastic` leave the `0` to `1` range partway through the curve on purpose, so the animated value overshoots its keyframe. That is what they are for, but it means a `visible` or `hidden` transformation shouldn't use them.

## Aliases

| Alias | Resolves to |
| --- | --- |
| `ease_in` | `ease_in_quad` |
| `ease_out` | `ease_out_quad` |
| `ease_in_out` | `ease_in_out_quad` |
| `smooth` | `catmullrom` |
| `hold` | `step` |
| `constant` | `step` |
| `none` | `linear` |

## Example

```json
{
  "model_part": "right_arm",
  "type": "pitch",
  "value": -1.5708,
  "override_animation": true,
  "easing": "ease_out_back",
  "duration": 6
}
```

The arm swings up over 6 ticks, overshoots slightly and settles.
