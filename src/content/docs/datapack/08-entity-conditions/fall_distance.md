---
title: "Fall Distance (Entity Condition Type)"
description: "Checks how much blocks the entity has been falling."
navigation_title: "Fall Distance"
---

Checks how much blocks the entity has been falling.

Type ID: `apoli:fall_distance`

> This entity condition type will return `0` if the entity has the Slow Falling status effect.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | Comparison | | Determines how the fall distance of the entity should be compared to the specified value.
`compare_to` | Float | | The value at which the fall distance of the entity will be compared to.

## Examples

```json
"condition": {
    "type": "apoli:fall_distance",
    "comparison": ">=",
    "compare_to": 4
}
```

This example will check if the entity has been falling for 4 or more blocks.
