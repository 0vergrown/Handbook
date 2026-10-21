---
title: "Vector (Data Type)"
description: "An object with X, Y and Z values, for a point or a direction in space."
navigation_title: "Vector"
---

An [Object](/docs/datapack/data-types/object) with the X, Y and Z coordinates of a point in space.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `x` | [Float](/docs/datapack/data-types/float) | `0.0` | The X coordinate. |
| `y` | [Float](/docs/datapack/data-types/float) | `0.0` | The Y coordinate. |
| `z` | [Float](/docs/datapack/data-types/float) | `0.0` | The Z coordinate. |

## Examples

```json
"entity_action": {
    "type": "apoli:spawn_particles",
    "particle": {
        "type": "minecraft:block",
        "params": "minecraft:redstone_block"
    },
    "count": 16,
    "speed": 0.0,
    "force": true,
    "spread": {
        "x": 3.0,
        "y": 0.0,
        "z": 3.0
    }
}
```

A Spawn Particles entity action that spreads particles over a flat area of about 5×0×5 blocks, covering 25 blocks.
