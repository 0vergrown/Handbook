---
title: "Gamemode (Entity Condition Type)"
description: "Checks the gamemode of the entity."
navigation_title: "Gamemode"
---

Checks the gamemode of the entity.

Type ID: `apoli:gamemode`

> **This entity condition type will only work on players.**


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`gamemode` | String | | Name of the gamemode the player should have in order for this condition to evaluate to true.

## Examples

```json
"condition": {
  "type": "apoli:gamemode",
  "gamemode": "creative"
}
```

This example will check if the player is in Creative Mode.
