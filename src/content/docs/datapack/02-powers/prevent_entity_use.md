---
title: "Prevent Entity Use (Power Type)"
description: "Prevents the player that has the power from 'using' (right-clicking) an entity and executes a bi-entity action, item action and/or give an item upon being prevented."
navigation_title: "Prevent Entity Use"
---

Prevents the player that has the power from "using" (right-clicking) an entity and executes a bi-entity action, item action and/or give an item upon being prevented.

Type ID: `apoli:prevent_entity_use`

> In the context of this power type, the '**actor**' entity is the entity that has the power whilst the '**target**' entity is the entity that was "used" (right-clicked).

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
    "type": "apoli:prevent_entity_use",
    "bientity_action": {
        "type": "apoli:actor_action",
        "action": {
            "type": "apoli:execute_command",
            "command": "title @s actionbar {\"text\": \"Cannot interact with pigs!\", \"color\": \"red\"}"
        }
    },
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:pig"
        }
    }
}
```

This example will prevent the player that has the power from interacting with a Pig (also prevent powers that enables you to interact with a Pig) and executes an [apoli:execute_command](/docs/datapack/entity-actions/execute_command) to the entity that has attempted to interact with a Pig.
