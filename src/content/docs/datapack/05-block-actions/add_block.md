---
title: "Add Block (Block Action Type)"
description: "Adds a block at the specified action position."
navigation_title: "Add Block"
---

Adds a block at the specified action position. Adding means setting the block at the position, offset by the direction of the action.

Type ID: `apoli:add_block`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block` | Identifier | | The namespace and ID of the block to place.
`nbt` | NBT | *optional* | The NBT data to give the block.

## Examples

```json
"block_action": {
    "type": "apoli:add_block",
    "block": "minecraft:coal_ore"
}
```

This example will add a Coal Ore block at the position of the block action type.

```json
"block_action": {
    "type": "apoli:add_block",
    "block": "minecraft:chest[facing=north]"
}
```

This example will add a Chest block facing north at the position of the block action type.

```json
"block_action": {
    "type": "apoli:add_block",
    "block": "minecraft:chest",
    "nbt":"[facing=north]"
}
```
Same as before but with the NBT field
