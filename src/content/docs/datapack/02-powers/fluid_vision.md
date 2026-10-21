---
title: "Fluid Vision (Power Type)"
description: "Replaces the fog, fog colour and screen overlay drawn while the camera is inside a fluid."
navigation_title: "Fluid Vision"
aliases: ["lava_vision"]
---

Replaces the fog the game draws while the camera of the entity with the power is submerged in a fluid. Set it to `lava` for lava sight, `water` for clear underwater vision, or `powder_snow` to see through a snow drift.

Type ID: `apoli:fluid_vision`

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `fluid` | [String](/docs/datapack/data-types/string) | `lava` | The submersion this applies to: `water`, `lava`, `powder_snow` or `none`. |
| `start` | [Float](/docs/datapack/data-types/float) | `0.0` | Where the fog starts, in blocks from the camera. `0` means it starts right at your eyes. |
| `end` | [Float](/docs/datapack/data-types/float) | `15.0` | Where the fog becomes fully opaque, in blocks, which is how far you can see. |
| `fog_color` | [Object](/docs/datapack/data-types/object) | _vanilla_ | Overrides the fog tint with `{ "red": 0.0, "green": 0.0, "blue": 0.0 }`, each from `0.0` to `1.0`. |
| `render_overlay` | [Boolean](/docs/datapack/data-types/boolean) | `true` | `false` removes the full-screen fluid texture drawn over the camera. In vanilla only water has one. |

Vanilla's own values are a start of `0.25` and an end of `1.0` in lava, `0.0` and `2.0` in powder snow, and `-8.0` and `96.0` in water, scaled by the Water Vision attribute. If several `fluid_vision` powers match the same fluid, the one with the largest `end` wins.

`fluid` matches the camera's submersion, and [apoli:modify_camera_submersion](/docs/datapack/powers/modify_camera_submersion) is applied first. If you remap `water` to `none` there, this power stops applying to water.

## Examples

Lava sight for a fire-immune origin, with clear vision for 25 blocks:

```json
{
  "type": "apoli:fluid_vision",
  "fluid": "lava",
  "start": 0,
  "end": 25
}
```

Full water vision, with no blue haze, no distance fog and no underwater texture over the screen:

```json
{
  "type": "apoli:fluid_vision",
  "fluid": "water",
  "start": 0,
  "end": 128,
  "render_overlay": false
}
```

Murky green sight for a swamp dweller, active while it has Water Breathing:

```json
{
  "type": "apoli:fluid_vision",
  "fluid": "water",
  "start": 4,
  "end": 32,
  "fog_color": {
    "red": 0.13,
    "green": 0.25,
    "blue": 0.11
  },
  "condition": {
    "type": "apoli:status_effect",
    "effect": "minecraft:water_breathing"
  }
}
```

> [!TIP]
> This only changes vision. Add [apoli:invulnerability](/docs/datapack/powers/invulnerability) against `minecraft:is_fire`, or [apoli:water_breathing](/docs/datapack/powers/water_breathing), if the entity should also survive the swim.
