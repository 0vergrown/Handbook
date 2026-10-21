---
title: "Action On Use (Power Type)"
description: "Runs an action when one entity right-clicks another."
navigation_title: "Action On Use"
aliases: ["action_on_entity_use", "action_on_being_used"]
---

Runs an action when one entity right-clicks another. One power type covers both sides of the interaction, and `target_used` picks the side.

Type ID: `apoli:action_on_use`

It is also reached through two legacy IDs: `apoli:action_on_entity_use` (`target_used` defaults to `false`) and `apoli:action_on_being_used` (`target_used` defaults to `true`). Old data packs using either ID load unchanged.

The actor is always the entity doing the right-clicking and the target is the entity being right-clicked. With `target_used: false` the actor is the entity with the power, and with `target_used: true` the target is.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | If set, this runs on the actor and target pair. |
| `held_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this runs on the stack in the actor's hand that triggered the use. |
| `result_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this runs on `result_stack` before the actor gets it. Without `result_stack` it does nothing, so to change the item in hand, use `held_item_action`. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | The actions only run if this passes for the actor and target pair. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | The actions only run if this passes for the actor's held stack. |
| `hands` | [Array](/docs/datapack/data-types/array) of [Hand](/docs/datapack/data-types/hand) | `["off_hand", "main_hand"]` | The actor's hands that can trigger this power. |
| `result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If set, this stack is given to the actor. It replaces the held stack if that is empty, and otherwise goes into the inventory or is dropped. |
| `action_result` | [Action Result](/docs/datapack/data-types/action-result) | `"success"` | The interaction result returned to the game when this power fires. |
| `target_used` | [Boolean](/docs/datapack/data-types/boolean) | `false` | `false` listens on the actor's side (using another entity), and `true` listens on the target's side (being used). The legacy aliases set it for you. |

## Examples

```json
{
    "type": "apoli:action_on_use",
    "bientity_action": {
        "type": "apoli:mount"
    },
    "item_condition": {
        "type": "apoli:empty"
    },
    "hands": ["main_hand"],
    "condition": {
        "type": "apoli:sneaking",
        "inverted": true
    }
}
```

A player with this power can ride any entity by right-clicking it with an empty main hand while not sneaking. This is the same as the legacy `apoli:action_on_entity_use` form.

```json
{
    "type": "apoli:action_on_use",
    "target_used": true,
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

Others can ride the entity with this power by right-clicking it, unless it already has a passenger. This is the same as the legacy `apoli:action_on_being_used` form.
