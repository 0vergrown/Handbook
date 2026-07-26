---
title: "apoli:adjacent"
description: "Checks whether a specified amount of blocks adjacent to the block in question fulfills a specified Block Condition Type."
---

Checks whether a specified amount of blocks adjacent to the block in question fulfills a specified Block Condition Type.

Type ID: `apoli:adjacent`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`adjacent_condition` | Block Condition Type (Data Type) | | The block condition that needs to be fulfilled by adjacent blocks to count towards this condition.
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | | Determines how the number of adjacent blocks which fulfill the `adjacent_condition` block condition should be compared to the specified value.
`compare_to` | [Float](/docs/datapack/data-types/float) | | The value at which the number of adjacent blocks which fulfill `adjacent_condition` will be compared to.


## Examples

```json
"block_condition": {
    "type": "apoli:adjacent",
    "adjacent_condition": {
        "type": "apoli:block",
        "block": "minecraft:iron_ore"
    },
    "comparison": ">=",
    "compare_to": 4
}
```

This example will check if there are four or more Iron Ore blocks next to the block in question.

