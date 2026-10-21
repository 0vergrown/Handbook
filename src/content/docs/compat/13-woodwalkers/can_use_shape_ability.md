---
title: "Can Use Shape Ability (Entity Condition Type)"
description: "Checks whether the shape ability is off cooldown and usable right now."
navigation_title: "Can Use Shape Ability"
---

Checks whether the player could use their shape's ability right now: they aren't a spectator and the cooldown has run out. It doesn't check whether the shape has an ability at all, so pair it with [`apoli:has_shape_ability`](/docs/compat/woodwalkers/has_shape_ability) for that.

Type ID: `apoli:can_use_shape_ability`

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

This condition has no fields.

## Example

```json
{
  "type": "apoli:self_glow",
  "condition": {
    "type": "apoli:and",
    "conditions": [
      { "type": "apoli:has_shape_ability" },
      { "type": "apoli:can_use_shape_ability" }
    ]
  }
}
```

The player glows while their shape's ability is ready.
