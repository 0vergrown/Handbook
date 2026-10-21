---
title: "NBT (Block Condition Type)"
description: "Checks whether the block entity's NBT contains the given data."
navigation_title: "NBT"
---

Checks whether the NBT of the block's block entity contains the given data.

Type ID: `apoli:nbt`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `nbt` | [NBT](/docs/datapack/data-types/nbt) | _required_ | The NBT data to look for. |

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

This checks whether a beacon has a `Levels` value of 1.
