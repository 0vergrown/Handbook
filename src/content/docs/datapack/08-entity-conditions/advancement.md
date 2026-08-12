---
title: "Advancement (Entity Condition Type)"
description: "Checks whether the entity has completed a specified advancement."
navigation_title: "Advancement"
---

Checks whether the entity has completed a specified advancement.

Type ID: `apoli:advancement`

> **This entity condition type will only work on players.**

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`advancement` | Identifier | | The namespace and ID of the advancement the player needs to have completed in order for this condition to evaluate to true.

## Examples

```json
"condition": {
    "type": "apoli:advancement",
    "advancement": "minecraft:story/smelt_iron"
}
```

This example will check if the player has the `minecraft:story/smelt_iron` advancement, which can be obtained by smelting or obtaining their first Iron Ingot.
