---
title: "Lava Vision (Power Type)"
description: "Legacy id for Fluid Vision with fluid set to lava."
navigation_title: "Lava Vision"
---

The legacy id for [apoli:fluid_vision](/docs/datapack/powers/fluid_vision). It still loads: `apoli:lava_vision` resolves to `apoli:fluid_vision` with `fluid` defaulted to `lava`, and the old `s` / `v` field names are accepted as `start` / `end`.

Type ID: `apoli:lava_vision` (alias of `apoli:fluid_vision`)

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `s` | [Float](/docs/datapack/data-types/float) | `0.0` | Alias of `start` — where the fog starts, in blocks from the camera. |
| `v` | [Float](/docs/datapack/data-types/float) | `15.0` | Alias of `end` — where the fog becomes fully opaque, in blocks. |

Every `apoli:fluid_vision` field works here too, so nothing is lost by leaving the old id in place. New packs should write `apoli:fluid_vision` — it is the only form that can reach water and powder snow.

## Examples

The old form, still valid:

```json
{
  "type": "apoli:lava_vision",
  "s": 0,
  "v": 25
}
```

The same power, written the new way:

```json
{
  "type": "apoli:fluid_vision",
  "fluid": "lava",
  "start": 0,
  "end": 25
}
```
