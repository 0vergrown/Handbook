---
title: "origins:health"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks the current health value of the entity.

Type ID: `origins:health`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | Comparison | | Determines how the current health of the entity should be compared to the specified value.
`compare_to` | Float | | The value at which the current health of the entity will be compared to.


## Examples

```json
"condition": {
    "type": "origins:health",
    "comparison": "<",
    "compare_to": 20
}
```

This example will check if the entity's health is less than 10 hearts (or 20 health points).

