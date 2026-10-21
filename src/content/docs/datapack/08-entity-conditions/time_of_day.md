---
title: "Time Of Day (Entity Condition Type)"
description: "Compares the world's time of day, in ticks, with a number."
navigation_title: "Time Of Day"
---

Compares the world's current time of day, in ticks, with a number.

Type ID: `apoli:time_of_day`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the time of day is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the time of day is compared with. |

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

This checks whether the sun is setting.
