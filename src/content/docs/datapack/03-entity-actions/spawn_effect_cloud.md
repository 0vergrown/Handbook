---
title: "Spawn Effect Cloud (Entity Action Type)"
description: "Spawns an area effect cloud (as from a lingering potion) at the position of the entity."
navigation_title: "Spawn Effect Cloud"
---

Spawns an area effect cloud (as from a lingering potion) at the position of the entity.

Type ID: `apoli:spawn_effect_cloud`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`radius` | Float | `3.0` | The radius of the cloud.
`radius_on_use` | Float | `-0.5` | How much the radius should change when an effect is applied.
`wait_time` | Integer | `10` | How many ticks to wait until the cloud takes effect.
`effect` | Status Effect Instance | _optional_ | If specified, this status effect will be applied by the cloud to entities inside of it.
`effects` | Array of Status Effect Instances | _optional_ | If specified, these status effects will be applied by the cloud to entities inside of it.

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

This example will spawn a large Area Effect Cloud, which provides the Resistance IV status effect that will last for 5 seconds at the entity's position.
