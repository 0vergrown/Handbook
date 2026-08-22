---
title: "Change Shape Ability Cooldown (Entity Action Type)"
description: Adds to or sets the shape ability cooldown.
navigation_title: "Change Shape Ability Cooldown"
aliases: ["shappoli:change_shape_ability_cooldown"]
---

Adds to or sets the ticks remaining on the shape ability's cooldown. Negative values with `add` shorten it; the result never goes below zero.

Type ID: `apoli:change_shape_ability_cooldown` (alias `shappoli:change_shape_ability_cooldown`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`operation` | [String](/docs/datapack/data-types/string) | `add` | `add` to adjust the current value, `set` to replace it.
`change` | [Integer](/docs/datapack/data-types/integer) | **required** | Ticks to add, or the value to set.

## Examples

Clear the cooldown entirely:

```json
{
  "type": "apoli:change_shape_ability_cooldown",
  "operation": "set",
  "change": 0
}
```

Knock two seconds off it every time you land a hit — a shape that recharges by fighting:

```json
{
  "type": "apoli:action_on_hit",
  "entity_action": {
    "type": "apoli:change_shape_ability_cooldown",
    "change": -40
  }
}
```

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
