---
title: "origins:prevent_sprinting"
description: "[Power Type](../powertypes.md)"
---

Power Type

Prevents the player that has the power from sprinting.

Type ID: `origins:prevent_sprinting`


## Fields

_None._


## Examples

```json
{
    "type": "origins:prevent_sprinting",
    "condition": {
        "type": "origins:food_level",
        "compare_to": 12,
        "comparison": "<="
    }
}
```

This example will prevent the player from sprinting if their food level is at, or below 6 hunger shanks

