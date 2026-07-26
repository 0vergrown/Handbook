---
title: "origins:food_level"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks the entity's food level (chicken legs / hunger meter / whatever you wanna call it). The food level is in the range of 0 to 20.

Type ID: `origins:food_level`

!!! note

    **This entity condition type will only work on players.**


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | Comparison | | Determines how the food level of the player should be compared to the specified value.
`compare_to` | Float | | The value at which the food level of the player will be compared to.


## Examples

```json
"condition": {
    "type": "origins:food_level",
    "comparison": "==",
    "compare_to": 0
}
```

This example will check if the player have 0 hunger shanks (or 0 food points).

