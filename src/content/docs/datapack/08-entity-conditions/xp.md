---
title: "XP (Entity Condition Type)"
description: Compares the entity's experience, in levels or points.
navigation_title: "XP"
---

Compares the player's experience. The aliases pick the unit for you: `apoli:xp_levels` compares levels, `apoli:xp_points` compares raw points.

Type ID: `apoli:xp` (aliases `apoli:xp_levels`, `apoli:xp_points`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | **required** | `<`, `<=`, `>`, `>=`, `==`, `!=`.
`compare_to` | [Integer](/docs/datapack/data-types/integer) | **required** | The value to compare against.
`unit` | [String](/docs/datapack/data-types/string) | `levels` | `levels` or `points`. Filled in by the aliases.

## Examples

Level 30 or higher:

```json
{
  "type": "apoli:xp_levels",
  "comparison": ">=",
  "compare_to": 30
}
```

Gate an expensive ability behind experience you then spend:

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

> `levels` is what the number on the XP bar says; `points` is the raw total, which grows non-linearly with level. Compare against points only when you actually mean the raw amount.
