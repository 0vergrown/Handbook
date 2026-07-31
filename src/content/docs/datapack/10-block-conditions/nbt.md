---
title: "NBT (Block Condition Type)"
description: "Checks the NBT of the block entity."
navigation_title: "NBT"
---

Checks the NBT of the block entity.

Type ID: `apoli:nbt`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`nbt` | NBT | | The NBT data to check for.

## Examples

```json
"block_condition": {
    "type": "apoli:and",
    "conditions": [
        {
            "type": "apoli:block",
            "block": "minecraft:beacon"
        },
        {
            "type": "apoli:nbt",
            "nbt": "{Levels: 1}"
        }
    ]
}
```

This example will check if Beacon block has a `Level` value of 1.
