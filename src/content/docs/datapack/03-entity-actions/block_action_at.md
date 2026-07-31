---
title: "Block Action At (Entity Action Type)"
description: "Executes a Block Action Type at the position of the entity."
navigation_title: "Block Action At"
---

Executes a Block Action Type at the position of the entity.

Type ID: `apoli:block_action_at`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_action` | Block Action Type |  | The block action type to execute.

## Examples

```json
"entity_action": {
    "type": "apoli:block_action_at",
    "block_action": {
        "type": "apoli:set_block",
        "block": "minecraft:sand"
    }
}
```

This example will execute a [apoli:set_block](/docs/datapack/block-actions/set_block) that would set a Sand block at the entity's feet.
