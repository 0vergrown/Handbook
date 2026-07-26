---
title: "apoli:modify_block_render"
description: "Modifies how a block would look like to the entity that has the power."
---

Modifies how a block would look like to the entity that has the power.

Type ID: `apoli:modify_block_render`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`block_condition` | Block Condition Type | _optional_ | If specified, only modify how the blocks that fulfill this condition would look like.
`block` | Identifier | | The namespace and ID of the replacement block.

## Examples

```json
{
    "type": "apoli:modify_block_render",
    "block_condition": {
        "type": "apoli:block",
        "block": "minecraft:diamond_ore"
    },
    "block": "minecraft:diamond_block"
}
```

This example will make Diamond Ore blocks look like Diamond Blocks.

