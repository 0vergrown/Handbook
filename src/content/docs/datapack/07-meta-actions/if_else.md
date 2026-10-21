---
title: "If Else (Meta Action Type)"
description: "Runs an action when a condition holds, and optionally another action when it doesn't."
navigation_title: "If Else"
---

Runs an action when a condition holds, and optionally another action when it doesn't.

Type ID: `apoli:if_else`

> [!NOTE]
> The kind of action depends on the kind of condition:
>
> | Action type | Condition type |
> | --- | --- |
> | Bi-entity Action Type | Bi-entity Condition Type |
> | Entity Action Type | Entity Condition Type |
> | Block Action Type | Block Condition Type |
> | Item Action Type | Item Condition Type |

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `condition` | Condition type | _required_ | A condition of the kind that matches the action. |
| `if_action` | Action type | _required_ | The action that runs when the condition is true. |
| `else_action` | Action type | _optional_ | The action that runs when the condition is false. |

## Examples

```json
"entity_action": {
    "type": "apoli:if_else",
    "condition": {
        "type": "apoli:sneaking"
    },
    "if_action": {
        "type": "apoli:set_on_fire",
        "duration": 5
    },
    "else_action": {
        "type": "apoli:heal",
        "amount": 6
    }
}
```

This sets the entity on fire for 5 seconds if it is sneaking, and otherwise restores 3 hearts of health.
