---
title: "Feed (Entity Action Type)"
description: "Feeds the entity, filling up their hunger bar as if they had eaten a food item with the provided values."
navigation_title: "Feed"
---

Feeds the entity, filling up their hunger bar as if they had eaten a food item with the provided values.

Type ID: `apoli:feed`

!!! note

    The actual food saturation level is determined by the `food * saturation * 2` formula.

!!! note

    **This entity action type will only work on players.**

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`food` | Integer or [Expression](/docs/datapack/data-types/expression) |  | The amount of food points to restore.
`saturation` | Float or [Expression](/docs/datapack/data-types/expression) |  | The amount of saturation points to restore.

## Examples

```json
"entity_action": {
    "type": "apoli:feed",
    "food": 4,
    "saturation": 2
}
```

This example will *feed* the player 2 hunger shanks (4 hunger points), and 16 saturation points.
