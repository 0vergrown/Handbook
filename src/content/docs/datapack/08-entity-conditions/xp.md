---
title: "XP (Entity Condition Type)"
description: Compares the entity's experience, in levels or points.
navigation_title: "XP"
---

Compares the player's experience with a number. The aliases pick the unit for you: `apoli:xp_levels` compares levels, and `apoli:xp_points` compares raw points.

Type ID: `apoli:xp` (aliases `apoli:xp_levels` and `apoli:xp_points`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | `<`, `<=`, `>`, `>=`, `==` or `!=`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The value to compare against. |
| `unit` | [Unit](/docs/datapack/data-types/unit) | `levels` | `levels` or `points`. The aliases fill this in. |

## Examples

Level 30 or higher:

```json
{
  "type": "apoli:xp_levels",
  "comparison": ">=",
  "compare_to": 30
}
```

Gate an expensive ability behind experience that it then spends:

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.origins.primary_active" },
  "cooldown": 100,
  "condition": {
    "type": "apoli:xp_levels",
    "comparison": ">=",
    "compare_to": 5
  },
  "entity_action": {
    "type": "apoli:and",
    "actions": [
      { "type": "apoli:add_xp", "levels": -5 },
      { "type": "apoli:apply_effect", "effect": { "effect": "minecraft:strength", "duration": 400 } }
    ]
  }
}
```

> [!NOTE]
> `levels` is the number on the XP bar, and `points` is the raw total, which grows faster than the level does. Only compare against points when you mean the raw amount.
