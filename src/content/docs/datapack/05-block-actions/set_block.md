---
title: "Set Block (Block Action Type)"
description: "Replaces the block at the position with the default state of another block."
navigation_title: "Set Block"
---

Replaces the block at the position with the default state of another block.

Type ID: `apoli:set_block`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the block to place. It takes a plain block ID, so the block is always placed in its default state. |
| `nbt` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Block entity data for the placed block, such as a chest's contents. It only applies to blocks that have a block entity. |

To change a property of the placed block, such as which way it faces, follow this action with [apoli:modify_block_state](/docs/datapack/block-actions/modify_block_state).

## Examples

```json
"block_action": {
    "type": "apoli:set_block",
    "block": "minecraft:coal_ore"
}
```

This places a coal ore block at the position.

```json
"block_action": {
    "type": "apoli:set_block",
    "block": "minecraft:redstone_lamp"
}
```

This places a redstone lamp in its default, unlit state.
