---
title: "Add Block (Block Action Type)"
description: "Places a block at the position, but only where the block already there can be replaced."
navigation_title: "Add Block"
---

Places a block at the action's position, but only if the block already there can be replaced, the way air, water or short grass can. [apoli:set_block](/docs/datapack/block-actions/set_block) overwrites whatever is there, while this action leaves solid blocks alone.

Type ID: `apoli:add_block`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the block to place. It takes a plain block ID, so the block is always placed in its default state. |
| `nbt` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Block entity data for the placed block, such as a chest's contents. It only applies to blocks that have a block entity. |

To change a property of the placed block, such as which way it faces, follow this action with [apoli:modify_block_state](/docs/datapack/block-actions/modify_block_state).

## Examples

```json
"block_action": {
    "type": "apoli:add_block",
    "block": "minecraft:coal_ore"
}
```

This places a coal ore block at the position, if the block there can be replaced.
