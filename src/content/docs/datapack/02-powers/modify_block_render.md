---
title: "Modify Block Render (Power Type)"
description: "Changes how blocks look to the entity that has the power."
navigation_title: "Modify Block Render"
---

Changes how blocks look to the entity that has the power.

Type ID: `apoli:modify_block_render`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, only blocks that pass this condition change their look. |
| `block` | [Identifier](/docs/datapack/data-types/identifier) | | The ID of the block they look like instead. |

> [!NOTE]
> This only changes rendering. The block is still the real one for collision, breaking, redstone and everything else. Only the mesh the chunk builder makes for that player changes.
>
> Chunk meshes are rebuilt on block updates, so a block that is already on screen when the power is granted keeps its old look until something in that chunk section changes. Relog, or place a block nearby, to force the rebuild.

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

This makes diamond ore look like diamond blocks.
