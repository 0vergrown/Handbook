---
title: "Invert (Bi-Entity Condition Type)"
description: "Checks a bi-entity condition with the actor and target swapped."
navigation_title: "Invert"
---

Checks a bi-entity condition with the actor and the target swapped.

Type ID: `apoli:invert`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _required_ | The bi-entity condition to check with the actor and target swapped. |

## Examples

```json
"bientity_condition": {
    "type": "apoli:invert",
    "condition": {
        "type": "apoli:can_see"
    }
}
```

This checks whether the target can see the actor, since the roles are swapped.
