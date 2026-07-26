---
title: "apoli:offset"
description: "Checks the provided Block Condition Type at a position offset from the current position."
---

Checks the provided Block Condition Type at a position offset from the current position.

Type ID: `apoli:offset`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`condition` | Block Condition Type | | The condition to check with the given offset.
`x` | Integer | `0` |  How much to offset the position on the x-axis.
`y` | Integer | `0` |  How much to offset the position on the y-axis.
`z` | Integer | `0` |  How much to offset the position on the z-axis.


## Examples

```json
"block_condition": {
    "type": "apoli:offset",
    "condition": {
        "type": "apoli:block",
        "block": "minecraft:grass_block"
    },
    "y": 1
}
```

This example will check if the block above the block is a Grass Block.

