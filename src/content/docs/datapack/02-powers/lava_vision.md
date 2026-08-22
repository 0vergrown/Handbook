---
title: "Lava Vision (Power Type)"
description: Replaces the lava fog so the holder can see while submerged in lava.
navigation_title: "Lava Vision"
---

Replaces the fog used while the holder's camera is inside lava. Without it, lava is an opaque orange wall about a quarter of a block deep; with it, you can see through it as far as you set.

Type ID: `apoli:lava_vision`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`s` | [Float](/docs/datapack/data-types/float) | `0.0` | Where the fog starts, in blocks from the camera. `0` means it starts right at your eyes.
`v` | [Float](/docs/datapack/data-types/float) | `15.0` | Where the fog becomes fully opaque, in blocks. This is effectively how far you can see.

Vanilla uses a start of `0.25` and an end of `1.0`, so anything larger than that is an improvement. If several are active, the one with the largest `v` wins.

## Example

The classic fire-immune origin's lava sight — clear vision for 25 blocks:

```json
{
  "type": "apoli:lava_vision",
  "s": 0,
  "v": 25
}
```

Partial vision that only applies while you have fire resistance, so it feels earned:

```json
{
  "type": "apoli:lava_vision",
  "s": 0,
  "v": 8,
  "condition": {
    "type": "apoli:status_effect",
    "effect": "minecraft:fire_resistance"
  }
}
```

> This changes vision only. Pair it with [`apoli:invulnerability`](/docs/datapack/powers/invulnerability) against `minecraft:is_fire` if you also want to survive the swim.
