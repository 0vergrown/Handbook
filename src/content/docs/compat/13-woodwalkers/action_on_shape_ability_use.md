---
title: "Action On Shape Ability Use (Power Type)"
description: "Runs an action when the player uses their shape ability."
navigation_title: "Action On Shape Ability Use"
aliases: ["shappoli:action_on_shape_ability_use"]
---

Fires when the player uses their shape's ability. The action runs with the player as the actor and their current shape as the target.

Type ID: `apoli:action_on_shape_ability_use` (alias `shappoli:action_on_shape_ability_use`)

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _required_ | Runs when the ability is used. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Only fires when this passes. |

## Example

```json
{
  "type": "apoli:action_on_shape_ability_use",
  "bientity_action": {
    "type": "apoli:actor_action",
    "action": {
      "type": "apoli:change_resource",
      "resource": "mypack:stamina",
      "change": -1
    }
  }
}
```

Every use of the ability costs a point of the `mypack:stamina` resource.
