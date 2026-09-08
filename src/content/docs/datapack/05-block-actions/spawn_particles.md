---
title: "Spawn Particles (Block Action Type)"
description: "Spawns particles at a block — including Apoli's own custom particles, which is what lets a raycast or a projectile leave a custom effect where it lands."
navigation_title: "Spawn Particles"
---

Spawns particles at a block. Because it takes a full [Particle Effect](/docs/datapack/data-types/particle-effect), it can spawn [Apoli's custom particles](/docs/datapack/data-types/custom-particle) — which is what lets a raycast or a fired projectile leave a custom effect exactly where it lands, something `/particle` through [apoli:execute_command](/docs/datapack/block-actions/execute_command) cannot express.

Type ID: `apoli:spawn_particles`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `particle` | [Particle Effect](/docs/datapack/data-types/particle-effect) | — | The particle to spawn. |
| `count` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | How many particles to spawn. |
| `speed` | [Float](/docs/datapack/data-types/float), [Expression](/docs/datapack/data-types/expression) or [Vector](/docs/datapack/data-types/vector) | `0` | Vanilla's particle speed parameter, or a vector used as the velocity when `velocity_x`/`y`/`z` are all zero. |
| `force` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Sends the particles to players up to 512 blocks away instead of 32, and ignores their particle setting. |
| `spread` | [Float](/docs/datapack/data-types/float), [Vector](/docs/datapack/data-types/vector) or [Expression](/docs/datapack/data-types/expression) | `0.25` on each axis | How far the particles scatter from the origin. A single number is the same figure on all three axes; every component may be an expression. |
| `offset_x`, `offset_y`, `offset_z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | Moves the spawn point, in blocks, along the world axes. |
| `velocity_x`, `velocity_y`, `velocity_z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | Gives every particle this world-space velocity. Setting any of them spawns one particle per packet so each one is aimed. |
| `anchor` | `hit`, `center` or `corner` | `hit` | Where in the block the particles start. `hit` uses the exact impact point when the action was run from something that has one — a raycast's `block_action`, or a projectile's `block_action_on_hit` — and falls back to the block centre otherwise. `center` and `corner` always use the block centre and its lower corner. |

## Examples

```json
{
    "type": "apoli:raycast",
    "distance": 32,
    "block_action": {
        "type": "apoli:spawn_particles",
        "particle": {
            "type": "apoli:custom",
            "texture": "example:textures/particle/spark.png",
            "size": 0.3,
            "lifetime": 20,
            "color": "#FFAA33",
            "roll": "rUni(0, 360)"
        },
        "count": 12,
        "spread": 0.15,
        "speed": 0.1
    }
}
```

Puts a burst of custom sparks exactly where the ray hits, each one at a random roll.

```json
{
    "type": "apoli:spawn_particles",
    "particle": "minecraft:soul_fire_flame",
    "count": 6,
    "anchor": "center",
    "velocity_y": 0.4
}
```

Sends six soul flames straight up out of the middle of the block.
