---
title: "origins:submerged_in"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks whether the entity's eyes are in a fluid that is included in the specified fluid tag.

Type ID: `origins:submerged_in`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`fluid` | Identifier | | The namespace and ID of the fluid tag that should be checked. Most important examples: `minecraft:water` and `minecraft:lava`.


## Examples

```json
"condition": {
    "type": "origins:submerged_in",
    "fluid": "minecraft:water"
}
```

This example will check if the player is submerged in water.

