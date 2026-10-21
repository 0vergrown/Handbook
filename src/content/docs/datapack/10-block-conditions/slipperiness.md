---
title: "Slipperiness (Block Condition Type)"
description: "Compares the block's slipperiness with a number."
navigation_title: "Slipperiness"
aliases: ["slipperness"]
---

Compares the block's slipperiness with a number.

Type ID: `apoli:slipperiness`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the slipperiness is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the slipperiness is compared with. |

## Examples

```json
"block_condition": {
    "type": "apoli:slipperiness",
    "comparison": "==",
    "compare_to": 0.98
}
```

This checks whether the block is as slippery as ice or packed ice.
