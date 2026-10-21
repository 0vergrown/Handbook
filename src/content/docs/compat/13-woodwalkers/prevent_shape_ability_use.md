---
title: "Prevent Shape Ability Use (Power Type)"
description: "Stops the player from using their shape ability."
navigation_title: "Prevent Shape Ability Use"
aliases: ["shappoli:prevent_shape_ability_use"]
---

Blocks the shape ability from being used. The cooldown is left alone, so the player gets nothing when they press the key.

Type ID: `apoli:prevent_shape_ability_use` (alias `shappoli:prevent_shape_ability_use`)

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Only blocks when this passes, with the player as the actor and their current shape as the target. |

## Example

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

This blocks the ability while the player's food level is 6 or lower.
