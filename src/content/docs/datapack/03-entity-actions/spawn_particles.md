---
title: "Spawn Particles (Entity Action Type)"
description: "Spawns particles on the body of the entity that has the power for visual effects."
navigation_title: "Spawn Particles"
---

Spawns particles on the body of the entity that has the power for visual effects.

Type ID: `apoli:spawn_particles`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`particle` | Particle Effect | | The particle type that will be spawned.
`bientity_condition` | Bi-entity Condition Type | *optional* | If specified, the particle will only be visible if this bi-entity condition is fulfilled by either or both the entity that has the power and the entity looking at the entity that has the power.
`count` | Integer | | How much of the specified particle type will be spawned.
`speed` | Float | `0.0` | Determines the speed of the specified particle type.
`force` | Boolean | `false` | If set to `true`, the specified particle type that will be spawned can be seen from a far distance.
`spread` | Vector | `{"x": 0.5, "y": 0.5, "z": 0.5}` | Determines the size of the three-dimensional cuboid volume to spawn the specified particle type in.
`offset_x` | Float | `0.0` | The offset of where the particle will be centered in the X axis.
`offset_y` | Float | `0.5` | The offset of where the particle will be centered in the Y axis.
`offset_z` | Float | `0.0` | The offset of where the particle will be centered in the Z axis.

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

This example will spawn a particle cuboid that is about 5x0x5 in size that will use the Redstone Block texture.
