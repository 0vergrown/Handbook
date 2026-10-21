---
title: "Action On Being Used (Power Type)"
description: "Runs an action when a player right-clicks the entity that has the power."
navigation_title: "Action On Being Used"
---

Runs an action when a player uses (right-clicks) the entity that has the power. The actor is the entity that right-clicked, and the target is the entity with the power.

Type ID: `apoli:action_on_being_used`

`apoli:action_on_being_used` is an alias of [apoli:action_on_use](/docs/datapack/powers/action_on_use) with `target_used: true` filled in. Packs written with either ID work unchanged, and in new packs `apoli:action_on_use` is clearer.

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
| `action_result` | [Action Result](/docs/datapack/data-types/action-result) | `"success"` | The result of the use action. |

## Examples

```json
{
    "type": "apoli:action_on_being_used",
    "bientity_action": {
        "type": "apoli:mount"
    },
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:passenger",
            "inverted": true
        }
    }
}
```

This lets players ride the entity with the power by right-clicking it, unless it already has a passenger.
