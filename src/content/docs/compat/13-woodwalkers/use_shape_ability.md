---
title: "Use Shape Ability (Entity Action Type)"
description: Triggers the current shape's ability.
navigation_title: "Use Shape Ability"
aliases: ["shappoli:use_shape_ability"]
---

Triggers whatever ability the player's current shape has, as if they had pressed the ability key. Nothing happens if the shape has no ability.

Type ID: `apoli:use_shape_ability` (alias `shappoli:use_shape_ability`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`force` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Use the ability even if it is still on cooldown.
`apply_cooldown` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether using it starts the cooldown. Set to `false` for a free use.

## Example

A free, cooldown-ignoring use as a reward for a resource:

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.origins.secondary_active" },
  "entity_action": {
    "type": "apoli:and",
    "actions": [
      { "type": "apoli:change_resource", "resource": "mypack:focus", "change": -1 },
      { "type": "apoli:use_shape_ability", "force": true, "apply_cooldown": false }
    ]
  },
  "condition": {
    "type": "apoli:resource",
    "resource": "mypack:focus",
    "comparison": ">",
    "compare_to": 0
  }
}
```

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
