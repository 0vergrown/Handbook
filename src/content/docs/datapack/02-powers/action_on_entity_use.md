---
title: "apoli:action_on_entity_use"
description: "Executes an action when the player that has the power 'uses' (right-clicks) an entity."
---

Executes an action when the player that has the power "uses" (right-clicks) an entity.

Type ID: `apoli:action_on_entity_use`

> **Note:** In Overgrown's Apoli reimplementation this id is an alias of [apoli:action_on_use](/docs/datapack/powers/action_on_use) with `target_used: false` injected automatically. Data packs authored against either id keep working unchanged; new authoring is encouraged to use the canonical `apoli:action_on_use` for clarity.

> In the context of this power type, the '**actor**' entity is the entity that has the power whilst the '**target**' entity is the entity that was "used" (right-clicked).


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_action` | Bi-entity Action Type | _optional_ | If specified, this action will be executed on either or both the '**actor**' and '**target**' entities.
`held_item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the item used by the '**actor**' entity for right-clicking the '**target**' entity.
`result_item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the item that is given to the '**actor**' entity.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the specified actions will only be executed if this condition is fulfilled by either or both '**actor**' and '**target**' entities.
`item_condition` | Item Condition Type | _optional_ | If specified, the specified actions will only be executed if this condition is fulfilled by the item used by the '**actor**' entity for right-clicking the '**target**' entity.
`hands` | [Array](/docs/datapack/data-types/array) of Strings (Data Type) | `["off_hand" , "main_hand"]` | Determines if the power should be activated if the '**actor**' entity used the specified hand(s). Accepts `"off_hand"`, `"main_hand"` or both
`result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If specified, this item stack will be given to the '**actor**' entity.
`action_result` | [Action Result](/docs/datapack/data-types/action-result) | `"success"` | Determines the result of the 'use' action.


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

This example will heal and display the heart particle effects at the tamed mob if the mob in question is owned by the player that has the power.

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

This example will let the player ride any entity they "use" (right-click), with similar rules as to riding a Horse or a Pig.
