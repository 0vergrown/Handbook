---
title: "If Else (Meta Action Type)"
description: "Executes an action only if a condition holds, and optionally executes another action when it doesn't hold."
navigation_title: "If Else"
---

Executes an action only if a condition holds, and optionally executes another action when it doesn't hold.

Type ID: `apoli:if_else`

> Depending on the condition type, a different action type is expected:
> 
> Action Type | Condition Type
> ------------|----------------
> Bi-entity Action Type | Bi-entity Condition Type
> Entity Action Type | Entity Condition Type
> Block Action Type| Block Condition Type
> Item Action Type | Item Condition Type

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`condition` | Condition Type | | A condition based on the type of action.
`if_action` | Action Type | | The action which is executed when the condition evaluates to true.
`else_action` | Action Type | _optional_ | If present, this action will be executed when the condition evaluates to false.

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

This example will set the entity on fire for 5 seconds if they are "sneaking". Otherwise, it will restore 3 hearts of health to the entity instead.
