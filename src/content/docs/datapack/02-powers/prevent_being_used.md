---
title: "Prevent Being Used (Power Type)"
description: "Stops other players from right-clicking the entity that has the power, and can run actions or give an item when it does."
navigation_title: "Prevent Being Used"
---

Stops other players from using (right-clicking) the entity that has the power. When it stops someone, it can run a bi-entity action, run item actions and give them an item. The actor is the entity that right-clicked, and the target is the entity with the power.

Type ID: `apoli:prevent_being_used`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | If set, this action runs on the actor, the target or both. |
| `held_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item the actor right-clicked the target with. |
| `result_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item given to the actor. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the actions only run when the actor and target pass this condition. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item the actor right-clicked with passes this condition. |
| `hands` | [Array](/docs/datapack/data-types/array) of [Strings](/docs/datapack/data-types/string) | `["off_hand", "main_hand"]` | The hands the actor can use for the power to trigger: `"off_hand"`, `"main_hand"` or both. |
| `result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If set, this item stack is given to the actor. |

## Examples

```json
{
    "type": "apoli:prevent_being_used",
    "bientity_action": {
        "type": "apoli:actor_action",
        "action": {
            "type": "apoli:execute_command",
            "command": "title @s actionbar {\"text\": \"Entity cannot be interacted with!\", \"color\": \"red\"}"
        }
    }
}
```

This stops other players from right-clicking the entity with the power and tells them in the action bar that it can't be interacted with.
