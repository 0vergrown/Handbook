---
title: "apoli:fuel"
description: "Checks whether the item is considered as fuel."
---

Checks whether the item is considered as fuel.

Type ID: `apoli:fuel`


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`comparison` | Comparison | `">"` | Determines how the fuel time value (in ticks) of the item stack should be compared to a specific value.
`compare_to` | Integer | `0` | The value at which the fuel time value (in ticks) of the item stack will be compared to.


## Examples

```json
"item_condition": {
    "type": "apoli:fuel",
    "comparison": ">=",
    "compare_to": 10
}
```

This example will check if the item fuel time value of 10 or more.

