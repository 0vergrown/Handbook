---
title: "origins:power_type"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks if the entity has a power that uses the specified Power Type.

Type ID: `origins:power_type`


## Fields

Field | Type | Default | Description
------|------|---------|------------
`power_type` | Identifier | | The namespace and ID of the Power Type of a power the entity has.


## Examples

```json
"condition": {
    "type": "origins:power_type",
    "power_type": "origins:active_self"
}
```

This example will check if the entity has a power that uses the Active Self (Power Type).

