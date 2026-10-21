---
title: "Action On Entity Use (Power Type)"
description: "Runs an action when the player that has the power right-clicks an entity."
navigation_title: "Action On Entity Use"
---

Runs an action when the player that has the power uses (right-clicks) an entity. The actor is the entity with the power, and the target is the entity that was right-clicked.

Type ID: `apoli:action_on_entity_use`

`apoli:action_on_entity_use` is an alias of [apoli:action_on_use](/docs/datapack/powers/action_on_use) with `target_used: false` filled in. Packs written with either ID work unchanged, and in new packs `apoli:action_on_use` is clearer.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | If set, this action runs on the actor, the target or both. |
| `held_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item the actor right-clicked the target with. |
| `result_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item given to the actor. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the actions only run when the actor and target pass this condition. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item the actor right-clicked with passes this condition. |
| `hands` | [Array](/docs/datapack/data-types/array) of [Strings](/docs/datapack/data-types/string) | `["off_hand" , "main_hand"]` | The hands the actor can use for the power to trigger: `"off_hand"`, `"main_hand"` or both. |
| `result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If set, this item stack is given to the actor. |
| `action_result` | [Action Result](/docs/datapack/data-types/action-result) | `"success"` | The result of the use action. |

## Examples

```json
{
    "type": "apoli:action_on_entity_use",
    "bientity_action": {
        "type": "apoli:target_action",
        "action": {
            "type": "apoli:and",
            "actions": [
                {
                    "type": "apoli:heal",
                    "amount": 2
                },
                {
                    "type": "apoli:execute_command",
                    "command": "particle heart ~ ~0.5 ~ 0.3 0.3 0.3 0.009 4 normal @a"
                }
            ]
        }
    },
    "bientity_condition": {
        "type": "apoli:owner"
    },
    "item_condition": {
        "type": "apoli:empty"
    },
    "hands": [
        "main_hand"
    ],
    "condition": {
        "type": "apoli:sneaking"
    }
}
```

When the player sneaks and right-clicks a tamed mob they own with an empty main hand, this heals the mob and shows heart particles on it.

```json
{
    "type": "apoli:action_on_entity_use",
    "bientity_action": {
        "type": "apoli:mount"
    },
    "bientity_condition": {
        "type": "apoli:and",
        "conditions": [
            {
                "type": "apoli:riding",
                "inverted": true
            },
            {
                "type": "apoli:target_condition",
                "condition": {
                    "type": "apoli:living"
                }
            }
        ]
    },
    "item_condition": {
        "type": "apoli:empty"
    },
    "hands": [
        "main_hand"
    ],
    "condition": {
        "type": "apoli:sneaking",
        "inverted": true
    }
}
```

This lets the player ride any living entity they right-click with an empty main hand, much like riding a horse or a pig.
