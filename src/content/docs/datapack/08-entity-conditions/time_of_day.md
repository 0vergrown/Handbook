---
title: "Time Of Day (Entity Condition Type)"
description: "Checks the current day time ticks of the world."
navigation_title: "Time Of Day"
---

Checks the current day time ticks of the world.

Type ID: `apoli:time_of_day`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`comparison` | Comparison | | Determines how the current day time ticks of the world should be compared to the specified value.
`compare_to` | Integer | | The value at which the current day time ticks of the world will be compared to.

## Examples

```json
"condition": {
    "type": "apoli:and",
    "conditions": [
        {
            "type": "apoli:time_of_day",
            "comparison": ">=",
            "compare_to": 12000
        },
        {
            "type": "apoli:time_of_day",
            "comparison": "<=",
            "compare_to": 13000
        }
    ]
}
```

This example will check if it's the sun is currently setting.
