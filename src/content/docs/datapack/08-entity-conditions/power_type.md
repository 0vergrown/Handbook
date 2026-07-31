---
title: "Power Type (Entity Condition Type)"
description: "Checks if the entity has a power that uses the specified Power Type."
navigation_title: "Power Type"
---

Checks if the entity has a power that uses the specified Power Type.

Type ID: `apoli:power_type`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`power_type` | Identifier | | The namespace and ID of the Power Type of a power the entity has.

## Examples

```json
"condition": {
    "type": "apoli:power_type",
    "power_type": "apoli:active_self"
}
```

This example will check if the entity has a power that uses the Active Self (Power Type).
