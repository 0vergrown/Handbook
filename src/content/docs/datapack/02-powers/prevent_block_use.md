---
title: "Prevent Block Use (Power Type)"
description: "Stops the player from using blocks with a right-click."
navigation_title: "Prevent Block Use"
---

Stops the player who has the power from using blocks, meaning they can't interact with a block by right-clicking it.

Type ID: `apoli:prevent_block_use`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | | If set, only blocks that pass this condition are affected. |

The power covers both halves of a right-click: using the block itself, like opening a chest, and using an item on it, like bonemealing a crop. It also applies on the client, so the game never predicts the interaction and nothing flickers.

## Examples

```json
{
    "type": "apoli:prevent_block_use",
    "block_condition": {
      "type": "apoli:block",
      "block": "minecraft:crafting_table"
    }
}
```

This stops the player from using crafting tables.
