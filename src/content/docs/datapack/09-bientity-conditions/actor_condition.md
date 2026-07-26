---
title: "apoli:actor_condition"
description: "Checks for an Entity Condition Type on the actor entity."
---

Checks for an Entity Condition Type on the actor entity.

Type ID: `apoli:actor_condition`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`condition` | Entity Condition Type | | The entity condition type to check for on the acting entity.

## Examples

```json
"bientity_condition": {
    "type": "apoli:actor_condition",
    "condition": {
       "type": "apoli:tamed"
    }
}
```

This example will check if the actor entity is a tamable and tamed mob.
