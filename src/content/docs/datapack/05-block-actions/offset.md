---
title: "Offset (Block Action Type)"
description: "Runs a block action at a position offset from the current one."
navigation_title: "Offset"
---

Runs a block action at a position offset from the current one.

Type ID: `apoli:offset`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | [Block Action Type](/docs/datapack/block-actions) | _required_ | The action to run at the offset position. |
| `x` | [Integer](/docs/datapack/data-types/integer) | `0` | The offset on the X axis. |
| `y` | [Integer](/docs/datapack/data-types/integer) | `0` | The offset on the Y axis. |
| `z` | [Integer](/docs/datapack/data-types/integer) | `0` | The offset on the Z axis. |

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

This runs [apoli:add_block](/docs/datapack/block-actions/add_block) one block above the original position.
