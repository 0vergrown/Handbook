---
title: "Action On Use (Power Type)"
description: "Executes an action when one entity right-clicks another."
navigation_title: "Action On Use"
aliases: ["action_on_entity_use", "action_on_being_used"]
---

Executes an action when one entity right-clicks another. The same power type covers both sides of the interaction — toggle with `target_used`.

Type ID: `apoli:action_on_use`

> Aliases the two legacy ids: `apoli:action_on_entity_use` (`target_used` defaults to `false`) and `apoli:action_on_being_used` (`target_used` defaults to `true`). Old data packs using either id load unchanged.

> When `target_used` is `false` (entity-use side), the `actor` is the entity that has the power and `target` is the entity that was right-clicked. When `target_used` is `true` (being-used side), the `actor` is the entity that did the right-clicking and `target` is the entity that has the power. In both cases, `actor` = the right-clicker and `target` = the entity being right-clicked.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_action` | Bi-entity Action Type | _optional_ | If specified, run on the actor/target pair.
`held_item_action`| Item Action Type | _optional_ | If specified, run on the actor's held stack in the hand that triggered the use.
`result_item_action` | Item Action Type | _optional_ | If specified, run on whatever stack ends up in the actor's hand AFTER `held_item_action` and `result_stack` have applied. Skipped if the stack ends up empty.
`bientity_condition` | Bi-entity Condition Type | _optional_ | Gate: only run if this passes for the actor/target pair.
`item_condition` | Item Condition Type | _optional_ | Gate: only run if this passes for the actor's held stack.
`hands`| [Array](/docs/datapack/data-types/array) of [Hand](/docs/datapack/data-types/hand) | `["off_hand", "main_hand"]` | Which hand(s) of the actor are allowed to trigger this power.
`result_stack`| [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If specified, this stack is given to the actor (replacing the held stack if empty, otherwise added to inventory or dropped).
`action_result` | [Action Result](/docs/datapack/data-types/action-result) | `"success"` | The InteractionResult returned to the engine when this power fires.
`target_used` | [Boolean](/docs/datapack/data-types/boolean) | `false` | `false` = listen on the actor side (entity-use); `true` = listen on the target side (being-used). Authored automatically when using the legacy aliases.

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

Player with this power can right-click any entity (empty main hand, not sneaking) to mount it. Equivalent to the legacy `apoli:action_on_entity_use` form.

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

The entity with this power can be mounted by right-clicking it, unless it already has a passenger. Equivalent to the legacy `apoli:action_on_being_used` form.
