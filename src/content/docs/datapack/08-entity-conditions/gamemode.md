---
title: "origins:gamemode"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks the gamemode of the entity.

Type ID: `origins:gamemode`

!!! note

    **This entity condition type will only work on players.**


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`gamemode` | String | | Name of the gamemode the player should have in order for this condition to evaluate to true.


## Examples

```json
"condition": {
  "type": "origins:gamemode",
  "gamemode": "creative"
}
```

This example will check if the player is in Creative Mode.

