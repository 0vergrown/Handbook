---
title: "Lava Vision (Power Type)"
description: "Legacy ID for Fluid Vision with the fluid set to lava."
navigation_title: "Lava Vision"
---

The legacy ID for [apoli:fluid_vision](/docs/datapack/powers/fluid_vision). It still loads: `apoli:lava_vision` resolves to `apoli:fluid_vision` with `fluid` set to `lava`, and the old field names `s` and `v` are read as `start` and `end`.

Type ID: `apoli:lava_vision` (alias of `apoli:fluid_vision`)

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `s` | [Float](/docs/datapack/data-types/float) | `0.0` | Alias of `start`: where the fog starts, in blocks from the camera. |
| `v` | [Float](/docs/datapack/data-types/float) | `15.0` | Alias of `end`: where the fog becomes fully opaque, in blocks. |

Every `apoli:fluid_vision` field works here too, so keeping the old ID loses nothing. In new packs, write `apoli:fluid_vision`, because only that ID can be set to water or powder snow.

## Examples

The old form, which still loads:

```json
{
  "type": "apoli:lava_vision",
  "s": 0,
  "v": 25
}
```

The same power with the current ID:

```json
{
  "type": "apoli:fluid_vision",
  "fluid": "lava",
  "start": 0,
  "end": 25
}
```
