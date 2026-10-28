---
title: "Spawn Effect Cloud (Entity Action Type)"
description: "Spawns an area effect cloud, like the one from a lingering potion, at the entity's position."
navigation_title: "Spawn Effect Cloud"
---

Spawns an area effect cloud, like the one a lingering potion leaves, at the entity's position.

Type ID: `apoli:spawn_effect_cloud`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `radius` | [Float](/docs/datapack/data-types/float) | `3.0` | The radius of the cloud. |
| `radius_on_use` | [Float](/docs/datapack/data-types/float) | `-0.5` | How much the radius changes each time the cloud applies an effect. |
| `wait_time` | [Integer](/docs/datapack/data-types/integer) | `10` | Ticks before the cloud starts working. |
| `effect` | [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) | _optional_ | A status effect the cloud applies to entities inside it. |
| `effects` | [Array](/docs/datapack/data-types/array) of [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) | _optional_ | Several status effects the cloud applies to entities inside it. |
| `offset` | [Vector](/docs/datapack/data-types/vector) | `{"x": 0, "y": 0, "z": 0}` | Moves the spawn point away from the entity by this much, in blocks. |
| `space` | [Space](/docs/datapack/data-types/space) | `"world"` | The frame `offset` is read in. `"local"` follows where the entity is looking, so `z` is forward and `x` is to its left. |

## Examples

```json
"entity_action": {
    "type": "apoli:spawn_effect_cloud",
    "radius": 10.0,
    "wait_time": 40,
    "effect": {
        "effect": "minecraft:resistance",
        "amplifier": 3,
        "duration": 100
    }
}
```

This spawns a cloud with a radius of 10 blocks at the entity's position. Two seconds after it appears, it starts giving Resistance IV for 5 seconds to anything inside.
