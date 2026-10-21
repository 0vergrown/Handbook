---
title: "Block Action At (Entity Action Type)"
description: "Runs a block action at the entity's position."
navigation_title: "Block Action At"
---

Runs a block action at the entity's position.

Type ID: `apoli:block_action_at`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _required_ | The block action to run. |

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

This runs [apoli:set_block](/docs/datapack/block-actions/set_block) to place a sand block at the entity's feet.
