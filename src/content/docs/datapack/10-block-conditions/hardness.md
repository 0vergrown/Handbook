---
title: "apoli:hardness"
description: "Checks the hardness value of the block."
---

Checks the hardness value of the block.

Type ID: `apoli:hardness`

> A block's hardness value is used for determining how long it takes to break the block.


## Fields

Field | Type | Default | Description
------|------|---------|------------
`comparison` | Comparison | | Determines how the hardness value of the block should compared to the specified value.
`compare_to` | Float | | The value at which the hardness value of the block will be compared to.


## Examples

```json
"block_condition": {
    "type": "apoli:hardness",
    "comparison": "==",
    "compare_to": 1.5
}
```

This example will check if the block is as hard as Stone.

