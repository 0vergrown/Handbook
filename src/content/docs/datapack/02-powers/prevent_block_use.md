---
title: "Prevent Block Use (Power Type)"
description: "Prevents the usage of blocks for the player that has the power."
navigation_title: "Prevent Block Use"
---

Prevents the usage of blocks for the player that has the power.

Type ID: `apoli:prevent_block_use`

!!! note

    Preventing the "usage" of a block means that the player won't be able to interact (right-click) with the said block.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | | If specified, only blocks that fulfill this condition are affected.

> Covers both halves of a right-click: using the block itself (opening a chest) and using an item on it (bonemealing a crop). It applies on the client too, so the interaction is never even predicted — nothing flickers.

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

This example will prevent the player from using Crafting Tables.
