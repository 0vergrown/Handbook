---
title: "Height (Block Condition Type)"
description: "Compares the Y position of the block to a value."
navigation_title: "Height"
---

Compares the Y position of the block to a value.

Type ID: `apoli:height`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | Comparison | | Determines how the Y position of the block should be compared to the specified value.
`compare_to` | Float | | The value at which the Y position of the block will be compared to.

## Examples

```json
"block_condition": {
    "type": "apoli:height",
    "comparison": "<=",
    "compare_to": 11
}
```

This example will check if the block is within Y=11 or lower.
