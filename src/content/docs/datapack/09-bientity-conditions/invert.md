---
title: "Invert (Bi-Entity Condition Type)"
description: "Swaps the context of the target entity and the actor entity."
navigation_title: "Invert"
---

Swaps the context of the target entity and the actor entity.

Type ID: `apoli:invert`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`condition` | Bi-entity Condition Type | | The bi-entity condition type to check which will have its 'target' and 'actor' contexts swapped.

## Examples

```json
"bientity_condition": {
    "type": "apoli:invert",
    "condition": {
        "type": "apoli:can_see"
    }
}
```
This example will check if the target entity can see the actor entity, as the roles are now swapped.
