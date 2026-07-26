---
title: "origins:on_block"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks if a block underneath the entity's feet fulfills the specified Block Condition Type.

Type ID: `origins:on_block`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | _optional_ | If specified, the condition will evaluate to true if the block underneath the entity's feet fulfills the specified block condition type. Otherwise, only check if the entity is on the ground. 


## Examples

```json
"condition": {
    "type": "origins:on_block"
}
```

This example will check if the entity is currently on the ground.



```json
"condition": {
    "type": "origins:on_block",
    "block_condition": {
        "type": "origins:block",
        "block": "minecraft:grass_block"
    }
}
```

This example will check if the entity is currently on a Grass Block.

