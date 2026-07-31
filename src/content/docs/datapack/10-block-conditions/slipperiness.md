---
title: "Slipperiness (Block Condition Type)"
description: "Checks the slipperiness value of the block."
navigation_title: "Slipperiness"
aliases: ["slipperness"]
---

Checks the slipperiness value of the block.

Type ID: `apoli:slipperiness`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`comparison` | Comparison | | Determines how the slipperiness value of the block should be compared to the specified value.
`compare_to` | Float | | The value at which the slipperiness value of the block will be compared to.

## Examples

```json
"block_condition": {
    "type": "apoli:slipperiness",
    "comparison": "==",
    "compare_to": 0.98
}
```

This example will check if the block has the same slipperiness of an Ice (or Packed Ice) block.
