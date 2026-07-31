---
title: "Either (Bi-Entity Condition Type)"
description: "Checks for a condition on either the actor or the target entities."
navigation_title: "Either"
---

Checks for a condition on either the actor or the target entities.

Type ID: `apoli:either`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`condition` | Condition Type | | The condition type to check on either actor or target entities.

## Examples

```json
"bientity_condition": {
    "type": "apoli:either",
    "condition": {
        "type": "apoli:in_rain"
    }
}
```

This example will check if either the actor or target entities are in rain.
