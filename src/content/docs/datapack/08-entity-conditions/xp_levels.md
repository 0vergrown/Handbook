---
title: "XP Levels (Entity Condition Type)"
description: "Checks the current experience level of the entity."
navigation_title: "XP Levels"
---

Checks the current experience level of the entity.

Type ID: `apoli:xp_levels`

!!! note

    **This entity condition type will only work on players.**

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | Comparison | | Determines how the experience level of the player should be compared to the specified value.
`compare_to` | Integer | | The value at which the experience level of the player will be compared to.

## Examples

```json
"condition": {
    "type": "apoli:xp_levels",
    "comparison": "<=",
    "compare_to": 5
}
```

This example will check if the player has 5 levels or less.
