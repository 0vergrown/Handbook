---
title: "Offset (Block Condition Type)"
description: "Checks a block condition at a position offset from the current one."
navigation_title: "Offset"
---

Checks a block condition at a position offset from the current one.

Type ID: `apoli:offset`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `condition` | [Block Condition Type](/docs/datapack/block-conditions) | _required_ | The condition to check at the offset position. |
| `x` | [Integer](/docs/datapack/data-types/integer) | `0` | The offset on the X axis. |
| `y` | [Integer](/docs/datapack/data-types/integer) | `0` | The offset on the Y axis. |
| `z` | [Integer](/docs/datapack/data-types/integer) | `0` | The offset on the Z axis. |

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

This checks whether the block above is a grass block.
