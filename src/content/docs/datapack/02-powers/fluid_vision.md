---
title: "Fluid Vision (Power Type)"
description: "Replaces the fog, fog colour and screen overlay used while the holder's camera is inside a fluid."
navigation_title: "Fluid Vision"
aliases: ["lava_vision"]
---

Replaces the fog the game draws while the holder's camera is submerged in a fluid. Set it to `lava` for the classic lava sight, `water` for clear underwater vision, or `powder_snow` to see through a snow drift.

Type ID: `apoli:fluid_vision`

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `fluid` | String | `lava` | Which submersion this applies to: `water`, `lava`, `powder_snow` or `none`. |
| `start` | [Float](/docs/datapack/data-types/float) | `0.0` | Where the fog starts, in blocks from the camera. `0` means it starts right at your eyes. |
| `end` | [Float](/docs/datapack/data-types/float) | `15.0` | Where the fog becomes fully opaque, in blocks. This is effectively how far you can see. |
| `fog_color` | Object | _vanilla_ | Overrides the fog tint. `{ "red": 0.0, "green": 0.0, "blue": 0.0 }`, each `0.0`–`1.0`. |
| `render_overlay` | Boolean | `true` | `false` removes the full-screen fluid texture drawn over the camera. Only water has one in vanilla. |

Vanilla's own numbers are start `0.25` / end `1.0` in lava, `0.0` / `2.0` in powder snow, and `-8.0` / `96.0` scaled by the Water Vision attribute in water. If several `fluid_vision` powers match the same fluid, the one with the largest `end` wins.

`fluid` matches the camera's submersion, so [apoli:modify_camera_submersion](/docs/datapack/powers/modify_camera_submersion) is applied first — remap `water` to `none` there and this power stops firing for water.

## Examples

The classic fire-immune origin's lava sight — clear vision for 25 blocks:

```json
{
  "type": "apoli:fluid_vision",
  "fluid": "lava",
  "start": 0,
  "end": 25
}
```

Full water vision: no blue haze, no distance fog, and no underwater texture over the screen:

```json
{
  "type": "apoli:fluid_vision",
  "fluid": "water",
  "start": 0,
  "end": 128,
  "render_overlay": false
}
```

A murky green swamp-dweller's sight, earned by an effect:

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

> This changes vision only. Pair it with [apoli:invulnerability](/docs/datapack/powers/invulnerability) against `minecraft:is_fire`, or [apoli:water_breathing](/docs/datapack/powers/water_breathing), if you also want to survive the swim.
