---
title: "apoli:command"
description: "Compares the result of the specified command to the specified value at the position of the block."
---

Compares the result of the specified command to the specified value at the position of the block.

Type ID: `apoli:command`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`command` | [String](/docs/datapack/data-types/string) | |  The command to execute.
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | | Determines how the result value (an integer) of the executed command should be compared to the specified value.
`compare_to` | [Integer](/docs/datapack/data-types/integer) | | The value at which the result value (an integer) of the executed command will be compared to.


## Examples

```json
"block_condition": {
    "type": "apoli:command",
    "command": "execute align xyz if entity @e[dy=0,dx=0,dz=0]",
    "comparison": ">=",
    "compare_to": 1
}
```

This example will check if there is an entity inside the block.

