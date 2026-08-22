---
title: "Action On Shape Ability Use (Power Type)"
description: Runs an action when the player uses their shape ability.
navigation_title: "Action On Shape Ability Use"
aliases: ["shappoli:action_on_shape_ability_use"]
---

Fires when the player uses their shape's ability. The action runs with the player as actor and their current shape as target.

Type ID: `apoli:action_on_shape_ability_use` (alias `shappoli:action_on_shape_ability_use`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_action` | [Bi-Entity Action](/docs/datapack/bientity-actions) | **required** | Runs when the ability is used.
`bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Only fire when this passes.

## Example

Every ability use costs a point of a resource:

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

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
