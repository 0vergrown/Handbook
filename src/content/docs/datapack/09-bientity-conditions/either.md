---
title: "Either (Bi-Entity Condition Type)"
description: "Checks whether the actor or the target passes an entity condition."
navigation_title: "Either"
---

Checks whether the actor or the target passes an entity condition.

Type ID: `apoli:either`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _required_ | The condition to check on the actor and on the target. |

## Examples

```json
"bientity_condition": {
    "type": "apoli:either",
    "condition": {
        "type": "apoli:in_rain"
    }
}
```

This checks whether the actor or the target is in the rain.
