---
title: "Change Shape Ability Cooldown (Entity Action Type)"
description: "Adds to or sets the shape ability cooldown."
navigation_title: "Change Shape Ability Cooldown"
aliases: ["shappoli:change_shape_ability_cooldown"]
---

Adds to or sets the ticks left on the shape ability's cooldown. Negative values with `add` shorten it, and the result never goes below zero.

Type ID: `apoli:change_shape_ability_cooldown` (alias `shappoli:change_shape_ability_cooldown`)

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `operation` | [String](/docs/datapack/data-types/string) | `add` | `add` adjusts the current value, and `set` replaces it. |
| `change` | [Integer](/docs/datapack/data-types/integer) | _required_ | The ticks to add, or the value to set. |

## Examples

```json
{
  "type": "apoli:change_shape_ability_cooldown",
  "operation": "set",
  "change": 0
}
```

This clears the cooldown entirely.

```json
{
  "type": "apoli:action_on_hit",
  "entity_action": {
    "type": "apoli:change_shape_ability_cooldown",
    "change": -40
  }
}
```

This takes two seconds off the cooldown every time the player lands a hit, for a shape that recharges by fighting.
