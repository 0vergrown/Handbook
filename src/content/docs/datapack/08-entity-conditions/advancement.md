---
title: "origins:advancement"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks whether the entity has completed a specified advancement.

Type ID: `origins:advancement`

!!! note

    **This entity condition type will only work on players.**


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`advancement` | Identifier | | The namespace and ID of the advancement the player needs to have completed in order for this condition to evaluate to true.


## Examples

```json
"condition": {
    "type": "origins:advancement",
    "advancement": "minecraft:story/smelt_iron"
}
```

This example will check if the player has the `minecraft:story/smelt_iron` advancement, which can be obtained by smelting or obtaining their first Iron Ingot.

