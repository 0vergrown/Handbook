---
title: "origins:moving"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks whether the entity is currently moving.

Type ID: `origins:moving`


## Fields

Field | Type | Default | Description
------|------|---------|------------
`horizontally` | Boolean | `true` | Determines whether to check if the entity is moving horizontally.
`vertically` | Boolean | `true` | Determines whether to check if the entity is moving vertically.


## Examples

```json
"condition": {
    "type": "origins:moving"
}
```

This example will check if the entity is moving either horizontally or vertically.



```json
"condition": {
    "type": "origins:moving",
    "horizontally": false
}
```

This example will check if the entity is only moving vertically.

