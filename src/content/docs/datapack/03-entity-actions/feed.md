---
title: "Feed (Entity Action Type)"
description: "Fills a player's hunger bar as if they had eaten a food item with the given values."
navigation_title: "Feed"
---

Feeds the player, filling their hunger bar as if they had eaten a food item with the given values.

Type ID: `apoli:feed`

> [!NOTE]
> This action only works on players. The saturation the player gets is worked out as `food * saturation * 2`.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `food` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _required_ | How many food points to restore. |
| `saturation` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _required_ | The saturation value of the food, used in the formula above. |

## Examples

```json
"entity_action": {
    "type": "apoli:feed",
    "food": 4,
    "saturation": 2
}
```

This restores 2 hunger shanks (4 food points) and 16 saturation points.
