---
title: "Food Level (Entity Condition Type)"
description: "Compares the player's food level, from 0 to 20, with a number."
navigation_title: "Food Level"
---

Compares the entity's food level with a number. The food level is what the hunger bar shows, from 0 to 20.

Type ID: `apoli:food_level`

> [!NOTE]
> This condition only works on players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the player's food level is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the food level is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:food_level",
    "comparison": "==",
    "compare_to": 0
}
```

This checks whether the player has no hunger shanks left (0 food points).
