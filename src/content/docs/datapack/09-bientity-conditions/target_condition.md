---
title: "Target Condition (Bi-Entity Condition Type)"
description: "Checks for an Entity Condition Type on the target entity."
navigation_title: "Target Condition"
---

Checks for an Entity Condition Type on the target entity.

Type ID: `apoli:target_condition`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`condition` | Entity Condition Type | | The entity condition type to check for on the target entity.

## Examples

```json
"bientity_condition": {
    "type": "apoli:target_condition",
    "condition": {
       "type": "apoli:tamed"
    }
}
```

This example will check if the target entity is a tamable and a tamed mob.
