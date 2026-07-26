---
title: "origins:relative_health"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks the current (and the percentage) health value of the entity.

Type ID: `origins:relative_health`

!!! note

    The percentage of the health value can be calculated with the `currentHealth / maxHealth` formula.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | Comparison | | Determines how the relative health of the entity should be compared to the specified value.
`compare_to` | Float | | The value at which the relative health of the entity will be compared to.


## Examples

```json
"condition": {
    "type": "origins:relative_health",
    "comparison": "<=",
    "compare_to": 0.5
}
```

This example will check if the player has half or less of their max health.
