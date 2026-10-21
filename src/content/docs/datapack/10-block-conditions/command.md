---
title: "Command (Block Condition Type)"
description: "Runs a command at the block's position and compares its result with a number."
navigation_title: "Command"
---

Runs a command at the block's position and compares its result with a number.

Type ID: `apoli:command`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `command` | [String](/docs/datapack/data-types/string) | _required_ | The command to run. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the command's result, an integer, is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the result is compared with. |

## Examples

```json
"block_condition": {
    "type": "apoli:command",
    "command": "execute align xyz if entity @e[dy=0,dx=0,dz=0]",
    "comparison": ">=",
    "compare_to": 1
}
```

This checks whether there is an entity inside the block.
