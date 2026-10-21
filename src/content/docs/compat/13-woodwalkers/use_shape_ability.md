---
title: "Use Shape Ability (Entity Action Type)"
description: "Triggers the current shape's ability."
navigation_title: "Use Shape Ability"
aliases: ["shappoli:use_shape_ability"]
---

Triggers whatever ability the player's current shape has, as if they had pressed the ability key. Nothing happens if the shape has no ability.

Type ID: `apoli:use_shape_ability` (alias `shappoli:use_shape_ability`)

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `force` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Uses the ability even if it is still on cooldown. |
| `apply_cooldown` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether using it starts the cooldown. Set it to `false` for a free use. |

## Example

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

On the secondary key, this spends a point of `mypack:focus` for a free use of the ability that ignores the cooldown.
