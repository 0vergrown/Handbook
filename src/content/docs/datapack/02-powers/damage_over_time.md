---
title: "Damage Over Time (Power Type)"
description: "Legacy alias of apoli:action_over_time with an apoli:damage action pre-filled."
navigation_title: "Damage Over Time"
---

Damages the holder on an interval. This is a **legacy alias** — it resolves to [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) with an [`apoli:damage`](/docs/datapack/entity-actions/damage) action built for you, so existing data packs keep working unchanged.

Type ID: `apoli:damage_over_time`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`damage` | [Float](/docs/datapack/data-types/float) | **required** | How much damage to deal each interval.
`damage_easy` | [Float](/docs/datapack/data-types/float) | value of `damage` | Damage dealt on Easy difficulty.
`damage_type` | [Identifier](/docs/datapack/data-types/identifier) | `minecraft:generic` | The damage type to use.
`interval` | [Integer](/docs/datapack/data-types/integer) | `20` | Ticks between hits.
`onset_delay` | [Integer](/docs/datapack/data-types/integer) | value of `interval` | Ticks to wait after the condition becomes true before the first hit.

## The composed form

Write this instead in new packs — it is what the alias expands to, and it lets you swap the damage for any other [entity action](/docs/datapack/entity-actions):

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "onset_delay": 20,
  "entity_action": {
    "type": "apoli:damage",
    "amount": 1,
    "damage_type": "minecraft:starve"
  },
  "condition": { "type": "apoli:food_level", "comparison": "<=", "compare_to": 6 }
}
```

When `damage_easy` differs from `damage`, the alias wraps the action in [`apoli:if_else`](/docs/datapack/meta-actions/if_else) against the new [`apoli:difficulty`](/docs/datapack/entity-conditions/difficulty) condition — you can write that yourself for finer control, such as a separate Hard value.

> **Removed:** `protection_enchantment` and `protection_effectiveness` no longer scale the onset delay. Track the protection level in an [`apoli:resource`](/docs/datapack/powers/resource) and use an expression instead — `"onset_delay": "20 + mypack:protection * 26"` — which is both clearer and not limited to enchantments. Apoli logs a warning once if a pack still sets those fields.
