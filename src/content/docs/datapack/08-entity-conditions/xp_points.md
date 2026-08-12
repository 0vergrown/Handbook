---
title: "XP Points (Entity Condition Type)"
description: "Checks the experience points of the entity."
navigation_title: "XP Points"
---

Checks the experience points of the entity.

Type ID: `apoli:xp_points`

> **This entity condition type will only work on players.**


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | Comparison | | Determines how the experience points of the player should be compared to the specified value.
`compare_to` | Integer | | The value at which the experience points of the player will be compared to.

## Examples

```json
"condition": {
    "type": "apoli:xp_points",
    "comparison": ">=",
    "compare_to": 90
}
```

This example will check if the player has 90 or more experience points, which is only achieveable if the player have at least 7 levels.
