---
title: "origins:dimension"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks whether the entity is in a specified dimension.

Type ID: `origins:dimension`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`dimension` | Identifier | |  The namespace and ID of the dimension the player needs to be in for this condition to evaluate to true. Vanilla dimensions are `minecraft:overworld`, `minecraft:the_nether` and `minecraft:the_end`, but namespace and IDs of custom/modded dimensions should also work.


## Examples

```json
"condition": {
    "type": "origins:dimension",
    "dimension": "minecraft:overworld",
    "inverted": true
}
```

This example will check if the player is **not** in the Overworld dimension.

