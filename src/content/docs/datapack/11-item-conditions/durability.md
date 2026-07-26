---
title: "apoli:durability"
description: "Checks the current durability of the item."
---

Checks the current durability of the item.

Type ID: `apoli:durability`


## Fields

Field | Type | Default | Description
------|------|---------|------------
`comparison` | Comparison | | Determines how the durability value of the item should be compared to the specified value.
`compare_to` | Integer | | The value at which the durability value of the item will be compared to.


## Examples

```json
"item_condition": {
    "type": "apoli:durability",
    "comparison": "<=",
    "compare_to": 100
}
```

This example will check if the item has a durability value of 100 or less.

