---
title: "origins:fluid_height"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks how high a specific fluid is at the entity. A fluid height of 0 means the entity is not touching the fluid.

Type ID: `origins:fluid_height`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`fluid` | Identifier | | The namespace and ID of the fluid tag of which the height should be checked. Most important examples: `minecraft:water` and `minecraft:lava`.
`comparison` | Comparison | | Determines how the height of the fluid should be compared to the specified value.
`compare_to` | Float | | The value at which the height of the fluid will be compared to.


## Examples

```json
"condition": {
    "type": "origins:fluid_height",
    "fluid": "minecraft:lava",
    "comparison": "==",
    "compare_to": 0
}
```

This example will check if the entity is not touching a lava fluid.

