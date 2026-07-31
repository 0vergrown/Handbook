---
title: "Ability (Entity Condition Type)"
description: "Checks if the player has the specified ability enabled."
navigation_title: "Ability"
---

Checks if the player has the specified ability enabled.

Type ID: `apoli:ability`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`ability` | Player Ability | | The namespace and ID of the ability to check for.

## Examples

```json
"condition": {
    "type": "apoli:ability",
    "ability": "minecraft:mayfly"
}
```

This example will check if the player can fly in a Creative Mode-like fashion.
