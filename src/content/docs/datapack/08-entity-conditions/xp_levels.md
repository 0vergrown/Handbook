---
title: "XP Levels (Entity Condition Type)"
description: "Compares the player's experience level with a number."
navigation_title: "XP Levels"
---

Compares the entity's current experience level with a number.

Type ID: `apoli:xp_levels`

> [!NOTE]
> This condition only works on players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the player's experience level is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the experience level is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:xp_levels",
    "comparison": "<=",
    "compare_to": 5
}
```

This checks whether the player has 5 levels or fewer.
