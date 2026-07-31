---
title: "Power Count (Item Condition Type)"
description: "Checks how many powers are embedded in the item."
navigation_title: "Power Count"
---

Checks how many powers are embedded in the item.

Type ID: `apoli:power_count`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`slot` | Equipment Slot (Data Type) | _optional_ | If specified, this will check how many powers are assigned to this equipment slot. Accepts one of `"head"`, `"chest"`, `"legs"`, `"feet"`, `"mainhand"` or `"offhand"`.
`comparison` | Comparison | | Determines how the amount of powers embedded in the item stack should be compared to the specified value.
`compare_to` | Integer | | The value at which the amount of powers embedded in the item stack will be compared to.

## Examples

```json
"item_condition": {
    "type": "apoli:power_count",
    "comparison": ">",
    "compare_to": 0
}
```

This example will check if the item has more than 0 powers embedded in it.

```json
"item_condition": {
    "type": "apoli:power_count",
    "slot": "mainhand",
    "comparison": "<",
    "compare_to": 10
}
```

This example will check if the item has less than 10 powers embedded in it.
