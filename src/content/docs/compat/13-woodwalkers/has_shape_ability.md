---
title: "Has Shape Ability (Entity Condition Type)"
description: "Checks whether the player's current shape has an ability at all."
navigation_title: "Has Shape Ability"
---

Checks whether the player's current shape has a WoodWalkers ability. Not every mob has one, so this is the check to make before telling the player they can press a key.

Type ID: `apoli:has_shape_ability`

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

This condition has no fields.

## Example

```json
{
  "type": "apoli:tooltip",
  "text": "Press the ability key to use your shape's power.",
  "condition": { "type": "apoli:has_shape_ability" }
}
```

This adds a hint to the player's item tooltips, but only while their shape has an ability to use.
