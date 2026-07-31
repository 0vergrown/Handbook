---
title: "Set Block (Block Action Type)"
description: "Overwrites the block at the targeted position with the default state of another one."
navigation_title: "Set Block"
---

Overwrites the block at the targeted position with the default state of another one.

Type ID: `apoli:set_block`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block` | Identifier | | The namespace and ID of the block to place.
`nbt` | NBT | *optional* | The NBT data to give the block.

## Examples

```json
"block_action": {
    "type": "apoli:set_block",
    "block": "minecraft:coal_ore"
}
```

This example will set a Coal Ore block at the position of the block action type.

```json
"block_action": {
    "type": "apoli:set_block",
    "block": "minecraft:redstone_lamp"
}
```

This example will set a Lit Redstone Lamp at the position of the block action type.

```json
"block_action": {
    "type": "apoli:set_block",
    "block": "minecraft:redstone_lamp[lit=true]",
    "nbt":"[lit=true]"
}
```
Same as before but with the NBT field
