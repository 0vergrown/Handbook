---
title: "Modify Block Render (Power Type)"
description: "Modifies how a block would look like to the entity that has the power."
navigation_title: "Modify Block Render"
---

Modifies how a block would look like to the entity that has the power.

Type ID: `apoli:modify_block_render`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`block_condition` | Block Condition Type | _optional_ | If specified, only modify how the blocks that fulfill this condition would look like.
`block` | Identifier | | The namespace and ID of the replacement block.

> This is **render only**. The block is still the real one for collision, breaking, redstone and everything else — only the mesh the chunk builder produces for that player changes.
>
> Chunk meshes are rebuilt on block updates, so a block already on screen when the power is granted keeps its old look until something in that chunk section changes. Re-log or place a block nearby to force the rebuild.

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
