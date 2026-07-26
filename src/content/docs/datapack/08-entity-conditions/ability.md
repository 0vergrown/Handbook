---
title: "origins:ability"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks if the player has the specified ability enabled.

Type ID: `origins:ability`


## Fields

Field | Type | Default | Description
------|------|---------|------------
`ability` | Player Ability | | The namespace and ID of the ability to check for.


## Examples

```json
"condition": {
    "type": "origins:ability",
    "ability": "minecraft:mayfly"
}
```

This example will check if the player can fly in a Creative Mode-like fashion.

