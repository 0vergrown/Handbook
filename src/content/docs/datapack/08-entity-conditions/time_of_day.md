---
title: "origins:time_of_day"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks the current day time ticks of the world.

Type ID: `origins:time_of_day`


## Fields

Field | Type | Default | Description
------|------|---------|------------
`comparison` | Comparison | | Determines how the current day time ticks of the world should be compared to the specified value.
`compare_to` | Integer | | The value at which the current day time ticks of the world will be compared to.


## Examples

```json
"condition": {
    "type": "origins:and",
    "conditions": [
        {
            "type": "origins:time_of_day",
            "comparison": ">=",
            "compare_to": 12000
        },
        {
            "type": "origins:time_of_day",
            "comparison": "<=",
            "compare_to": 13000
        }
    ]
}
```

This example will check if it's the sun is currently setting.

