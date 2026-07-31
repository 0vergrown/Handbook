---
title: "Prevent Sprinting (Power Type)"
description: "Prevents the player that has the power from sprinting."
navigation_title: "Prevent Sprinting"
---

Prevents the player that has the power from sprinting.

Type ID: `apoli:prevent_sprinting`

## Fields

_None._

## Examples

```json
{
    "type": "apoli:prevent_sprinting",
    "condition": {
        "type": "apoli:food_level",
        "compare_to": 12,
        "comparison": "<="
    }
}
```

This example will prevent the player from sprinting if their food level is at, or below 6 hunger shanks
