---
title: "Hardness (Block Condition Type)"
description: "Compares the block's hardness, which decides how long it takes to break, with a number."
navigation_title: "Hardness"
---

Compares the block's hardness with a number. Hardness decides how long the block takes to break.

Type ID: `apoli:hardness`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the hardness is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the hardness is compared with. |

## Examples

```json
"block_condition": {
    "type": "apoli:hardness",
    "comparison": "==",
    "compare_to": 1.5
}
```

This checks whether the block is exactly as hard as stone.
