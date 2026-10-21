---
title: "Adjacent (Block Condition Type)"
description: "Counts the neighbouring blocks that pass a condition and compares the count with a number."
navigation_title: "Adjacent"
---

Counts how many of the six blocks next to this one pass a block condition, and compares the count with a number.

Type ID: `apoli:adjacent`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `adjacent_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _required_ | The condition a neighbouring block must pass to be counted. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the count is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number of matching neighbours to compare against. A block has six neighbours, so this is `0` to `6`. |

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

This checks whether four or more iron ore blocks are next to the block.
