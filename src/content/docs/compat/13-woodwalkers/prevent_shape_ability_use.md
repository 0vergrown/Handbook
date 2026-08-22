---
title: "Prevent Shape Ability Use (Power Type)"
description: Stops the player from using their shape ability.
navigation_title: "Prevent Shape Ability Use"
aliases: ["shappoli:prevent_shape_ability_use"]
---

Blocks the shape ability from being used. The cooldown is untouched, so the player simply gets nothing when they press the key.

Type ID: `apoli:prevent_shape_ability_use` (alias `shappoli:prevent_shape_ability_use`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Only block when this passes. Actor is the player, target is their current shape.

## Example

No abilities while you are starving:

```json
{
  "type": "apoli:prevent_shape_ability_use",
  "condition": {
    "type": "apoli:food_level",
    "comparison": "<=",
    "compare_to": 6
  }
}
```

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
