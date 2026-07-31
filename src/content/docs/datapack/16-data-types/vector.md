---
title: "Vector (Data Type)"
description: "An Object that specifies the X, Y and Z coordinates of a certain point in space."
navigation_title: "Vector"
---

An [Object](/docs/datapack/data-types/object) that specifies the X, Y and Z coordinates of a certain point in space.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`x` | [Float](/docs/datapack/data-types/float) | `0.0` | The X coordinate of the point.
`y` | [Float](/docs/datapack/data-types/float) | `0.0` | The Y coordinate of the point.
`z` | [Float](/docs/datapack/data-types/float) | `0.0` | The Z coordinate of the point.

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

A Spawn Particles (Entity Action Type) that spawns a cuboid of about 5x0x5 in size, which has a volume of 25 blocks.
