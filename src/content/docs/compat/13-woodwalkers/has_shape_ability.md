---
title: "Has Shape Ability (Entity Condition Type)"
description: Passes when the player's current shape has an ability at all.
navigation_title: "Has Shape Ability"
---

Passes when the player's current shape has a WoodWalkers ability. Not every mob does, so this is the check to make before telling the player they can press a key.

Type ID: `apoli:has_shape_ability`

## Fields

This type has no fields.

## Example

Show a HUD hint only when there is something to press:

```json
{
  "type": "apoli:tooltip",
  "text": "Press the ability key to use your shape's power.",
  "condition": { "type": "apoli:has_shape_ability" }
}
```

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
