---
title: "Height (Block Condition Type)"
description: "Compares the block's Y position with a number."
navigation_title: "Height"
---

Compares the block's Y position with a number.

Type ID: `apoli:height`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the Y position is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the Y position is compared with. |

## Examples

```json
"block_condition": {
    "type": "apoli:height",
    "comparison": "<=",
    "compare_to": 11
}
```

This checks whether the block is at Y 11 or lower.
