---
title: "XP Points (Entity Condition Type)"
description: "Compares the player's experience points with a number."
navigation_title: "XP Points"
---

Compares the entity's experience points with a number.

Type ID: `apoli:xp_points`

> [!NOTE]
> This condition only works on players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the player's experience points are compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the experience points are compared with. |

## Examples

```json
"condition": {
    "type": "apoli:xp_points",
    "comparison": ">=",
    "compare_to": 90
}
```

This checks whether the player has 90 or more experience points, which takes at least 7 levels.
