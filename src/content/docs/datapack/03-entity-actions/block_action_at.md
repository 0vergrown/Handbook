---
title: "origins:block_action_at"
description: "[Entity Action Type](../entityactiontypes.md)"
---

Entity Action Type

Executes a Block Action Type at the position of the entity.

Type ID: `origins:block_action_at`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_action` | Block Action Type |  | The block action type to execute.


## Examples

```json
"entity_action": {
    "type": "origins:block_action_at",
    "block_action": {
        "type": "origins:set_block",
        "block": "minecraft:sand"
    }
}
```

This example will execute a [apoli:set_block](/docs/datapack/block-actions/set_block) that would set a Sand block at the entity's feet.

