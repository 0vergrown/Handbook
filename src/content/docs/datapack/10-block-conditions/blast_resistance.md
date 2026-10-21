---
title: "Blast Resistance (Block Condition Type)"
description: "Compares the block's blast resistance with a number."
navigation_title: "Blast Resistance"
---

Compares the block's blast resistance with a number.

Type ID: `apoli:blast_resistance`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the blast resistance is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the blast resistance is compared with. |

## Examples

```json
"block_condition": {
    "type": "apoli:blast_resistance",
    "comparison": ">=",
    "compare_to": 1200
}
```

This checks whether the block's blast resistance is at least that of obsidian.
