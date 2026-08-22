---
title: "Can Use Shape Ability (Entity Condition Type)"
description: Passes when the shape ability is off cooldown and usable right now.
navigation_title: "Can Use Shape Ability"
---

Passes when the player could use their shape's ability this instant — they are not a spectator and the cooldown has run out. It does not check whether the shape *has* an ability; pair it with [`apoli:has_shape_ability`](/docs/compat/woodwalkers/has_shape_ability) for that.

Type ID: `apoli:can_use_shape_ability`

## Fields

This type has no fields.

## Example

Glow faintly while the ability is ready:

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

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
