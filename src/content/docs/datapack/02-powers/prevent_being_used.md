---
title: "Prevent Being Used (Power Type)"
description: "Prevents other players from being able to 'use' (right-click) the entity that has the power and executes a bi-entity action, item action and/or give an item upon being prevented."
navigation_title: "Prevent Being Used"
---

Prevents other players from being able to "use" (right-click) the entity that has the power and executes a bi-entity action, item action and/or give an item upon being prevented.

Type ID: `apoli:prevent_being_used`

> In the context of this power type, the '**actor**' entity is the entity that did the "usage" action (right-click) while the '**target**' entity is the entity that has the power.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_action` | Bi-entity Action Type | _optional_ | If specified, this action will be executed on either or both the '**actor**' and '**target**' entities.
`held_item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the item used by the '**actor**' entity for right-clicking the '**target**' entity.
`result_item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the item that is given to the '**actor**' entity.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the specified actions will only be executed if this condition is fulfilled by either or both '**actor**' and '**target**' entities.
`item_condition` | Item Condition Type | _optional_ | If specified, the specified actions will only be executed if this condition is fulfilled by the item used by the '**actor**' entity for right-clicking the '**target**' entity.
`hands` | Array of Strings | `["off_hand", "main_hand"]` | Determines if the power should be activated if the '**actor**' entity used the specified hand(s). Accepts `"off_hand"`, `"main_hand"` or both.
`result_stack` | Item Stack | _optional_ | If specified, this item stack will be given to the '**actor**' entity.

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

This example will prevent other players from "using" (right-clicking) the entity that has the power and inform them that the 'entity cannot be interacted with'.
