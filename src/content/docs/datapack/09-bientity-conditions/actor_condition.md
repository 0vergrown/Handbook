---
title: "Actor Condition (Bi-Entity Condition Type)"
description: "Checks an entity condition on the actor."
navigation_title: "Actor Condition"
---

Checks an entity condition on the actor.

Type ID: `apoli:actor_condition`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _required_ | The entity condition to check on the actor. |

## Examples

```json
"bientity_condition": {
    "type": "apoli:actor_condition",
    "condition": {
       "type": "apoli:tamed"
    }
}
```

This checks whether the actor is a tameable mob that has been tamed.
