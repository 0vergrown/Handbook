---
title: "Target Condition (Bi-Entity Condition Type)"
description: "Checks an entity condition on the target."
navigation_title: "Target Condition"
---

Checks an entity condition on the target.

Type ID: `apoli:target_condition`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _required_ | The entity condition to check on the target. |

## Examples

```json
"bientity_condition": {
    "type": "apoli:target_condition",
    "condition": {
       "type": "apoli:tamed"
    }
}
```

This checks whether the target is a tameable mob that has been tamed.
