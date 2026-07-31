---
title: "Moving (Entity Condition Type)"
description: "Checks whether the entity is currently moving."
navigation_title: "Moving"
---

Checks whether the entity is currently moving.

Type ID: `apoli:moving`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`horizontally` | Boolean | `true` | Determines whether to check if the entity is moving horizontally.
`vertically` | Boolean | `true` | Determines whether to check if the entity is moving vertically.

## Examples

```json
"condition": {
    "type": "apoli:moving"
}
```

This example will check if the entity is moving either horizontally or vertically.

```json
"condition": {
    "type": "apoli:moving",
    "horizontally": false
}
```

This example will check if the entity is only moving vertically.
