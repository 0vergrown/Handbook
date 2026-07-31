---
title: "Amount (Item Condition Type)"
description: "Checks the amount of the item in the item stack."
navigation_title: "Amount"
---

Checks the amount of the item in the item stack.

Type ID: `apoli:amount`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`comparison` | Comparison | | Determines how the amount of the item in the item stack should be compared to the specified value.
`compare_to` | Integer | | The value at which the amount of the item in the item stack will be compared to.

## Examples

```json
"item_condition": {
    "type": "apoli:amount",
    "comparison": ">=",
    "compare_to": 10
}
```

This example will check if there are 10 or more items in the item stack.
