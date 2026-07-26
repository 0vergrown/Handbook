---
title: "apoli:explode"
description: "Summons an explosion with a specific explosion power."
---

Summons an explosion with a specific explosion power.

Type ID: `apoli:explode`


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`power` | Float | | Determines the power of the explosion.
`destruction_type` | Destruction Type | `"break"` | Determines the effect of the explosion to the terrain.
`indestructible` | Block Condition Type | _optional_ | If specified, the blocks that fulfill this condition will not be destroyed by the summoned explosion.
`destructible` | Block Condition Type | _optional_ | If specified, only the blocks that fulfill this condition will be destroyed by the summoned explosion.
`create_fire` | Boolean | `false` | Determines if the summoned explosion should create fire.


## Examples

```json
"block_action": {
    "type": "apoli:explode",
    "power": 5,
    "destruction_type": "none",
    "create_fire": false
}
```

This example will summon an explosion at the position of where the block action was invoked that would not destroy the terrain nor spread fire.


```json
"block_action": {
    "type": "apoli:explode",
    "power": 5,
    "destruction_type": "break",
    "destructible": {
        "type": "apoli:in_tag",
        "tag": "minecraft:impermeable"
    },
    "create_fire": false
}
```

This example will summon an explosion at the position of where the block action was invoked that would only destroy blocks that are in the `#minecraft:impermeable` (`data/minecraft/tags/blocks/impermeable.json`) block tag.

