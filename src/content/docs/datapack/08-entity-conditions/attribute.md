---
title: "origins:attribute"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Applies a check towards a specific attribute value of the entity.

Type ID: `origins:attribute`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`attribute` | Identifier | |  ID of the attribute of which the value should be checked. See [Minecraft Wiki: Attribute (Attributes)](https://minecraft.wiki/w/Attribute#Attributes) for a list of vanilla attributes that can be checked for.
`comparison` | Comparison | |  Determines how the attribute's total value should be compared to the specified value.
`compare_to` | Float | | The value at which the attribute's total value will be compared to.


## Examples

```json
"condition": {
    "type": "origins:attribute",
    "attribute": "minecraft:generic.armor",
    "comparison": ">=",
    "compare_to": 10.0
}
```

This example will check if the value of the entity's `minecraft:generic.armor` attribute is 10 or more.

