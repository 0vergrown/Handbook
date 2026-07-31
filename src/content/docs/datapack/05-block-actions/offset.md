---
title: "Offset (Block Action Type)"
description: "Executes the provided Block Action Type at the position offset from the current position."
navigation_title: "Offset"
---

Executes the provided Block Action Type at the position offset from the current position.

Type ID: `apoli:offset`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`action` | Block Action Type | | The action to apply with the given offset.
`x` | Integer | `0` | How much to offset the position on the x-axis.
`y` | Integer | `0` | How much to offset the position on the y-axis.
`z` | Integer | `0` | How much to offset the position on the z-axis.

## Examples

```json
"block_action": {
    "type": "apoli:offset",
    "action": {
        "type": "apoli:add_block",
        "block": "minecraft:gravel"
    },
    "y": 1
}
```

This example will offset the position of the [apoli:add_block](/docs/datapack/block-actions/add_block) in the positive Y axis, raising the positional context of the block action to be 1 block above to where it initially was.
