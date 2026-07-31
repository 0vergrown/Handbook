---
title: "Action On Being Used (Power Type)"
description: "Executes an action when a player 'uses' (right-clicks) the entity that has the power."
navigation_title: "Action On Being Used"
---

Executes an action when a player "uses" (right-clicks) the entity that has the power.

Type ID: `apoli:action_on_being_used`

> **Note:** In Overgrown's Apoli reimplementation this id is an alias of [apoli:action_on_use](/docs/datapack/powers/action_on_use) with `target_used: true` injected automatically. Data packs authored against either id keep working unchanged; new authoring is encouraged to use the canonical `apoli:action_on_use` for clarity.

> In the context of this power type, the '**actor**' entity is the entity that did the "usage" action (right-click) while the '**target**' entity is the entity that has the power.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_action` | Bi-entity Action Type | _optional_ | If specified, this action will be executed on either or both the '**actor**' and '**target**' entities.
`held_item_action`| Item Action Type | _optional_ | If specified, this action will be executed on the item used by the '**actor**' entity for right-clicking the '**target**' entity.
`result_item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the item that is given to the '**actor**' entity.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the specified actions will only be executed if this condition is fulfilled by either or both '**actor**' and '**target**' entities.
`item_condition` | Item Condition Type | _optional_ | If specified, the specified actions will only be executed if this condition is fulfilled by the item used by the '**actor**' entity for right-clicking the '**target**' entity.
`hands`| [Array](/docs/datapack/data-types/array) of Strings (Data Type) | `["off_hand", "main_hand"]` | Determines if the power should be activated if the '**actor**' entity used the specified hand(s). Accepts `"off_hand"`, `"main_hand"` or both
`result_stack`| [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If specified, this item stack will be given to the '**actor**' entity.
`action_result` | [Action Result](/docs/datapack/data-types/action-result) | `"success"` | Determines the result of the 'use' action.

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

This example will grant the players the ability to mount the target entity that has the power upon "using" (right-clicking) the said entity, unless the entity that has the power already has a passenger.
