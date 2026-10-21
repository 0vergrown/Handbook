---
title: "Prevent Entity Use (Power Type)"
description: "Stops the player that has the power from right-clicking entities, and can run actions or give an item when it does."
navigation_title: "Prevent Entity Use"
---

Stops the player that has the power from using (right-clicking) entities. When it stops them, it can run a bi-entity action, run item actions and give them an item. The actor is the entity with the power, and the target is the entity that was right-clicked.

Type ID: `apoli:prevent_entity_use`

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

This stops the player from interacting with pigs, including through powers that would let them, and runs an [apoli:execute_command](/docs/datapack/entity-actions/execute_command) that tells them so in the action bar.
