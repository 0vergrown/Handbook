---
title: "apoli:block"
description: "Checks whether the block is a certain block (by ID)."
---

Checks whether the block is a certain block (by ID).

Type ID: `apoli:block`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block` | [Identifier](/docs/datapack/data-types/identifier) | | The namespace and ID of the block that this block needs to be to pass the check.


## Examples

```json
"block_condition": {
    "type": "apoli:block",
    "block": "minecraft:diamond_block"
}
```

This example checks if the block is a Diamond Block.



```json
"block_condition": {
    "type": "apoli:or",
    "conditions": [
        {
            "type": "apoli:block",
            "block": "minecraft:diamond_block"
        },
        {
            "type": "apoli:block",
            "block": "minecraft:emerald_block"
        }
    ]
}
```

This example will check if the block is either a Diamond Block or an Emerald Block.

