---
title: "Relative Durability (Item Condition Type)"
description: "Checks the current durability of the item relative to its max durability (in percentage.)"
navigation_title: "Relative Durability"
---

Checks the current durability of the item relative to its max durability (in percentage.)

Type ID: `apoli:relative_durability`

> The relative durability value of an item can be calculated with the `currentDurability / maxDurability` formula.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`comparison` | Comparison | | Determines how the relative durability value of the item from the item stack should be compared to the specified value.
`compare_to` | Float |  | The value at which the relative durability value of the item from the item stack will be compared to.

## Examples

```json
"item_condition": {
    "type": "apoli:relative_durability",
    "comparison": ">=",
    "compare_to": 0.9
}
```

This example will check if the item has a 90% durability or greater.
