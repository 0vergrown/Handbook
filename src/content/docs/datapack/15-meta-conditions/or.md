---
title: "apoli:or"
description: "Checks whether any (one or more) of the provided conditions are fulfilled."
---

Checks whether any (one or more) of the provided conditions are fulfilled.

Type ID: `apoli:or`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`conditions` | [Array](/docs/datapack/data-types/array) of Condition Types | | Any of these condition types have to be fulfilled in order for this condition to be fulfilled.


## Examples

```json
"condition": {
    "type": "apoli:or",
    "conditions": [
        {
            "type": "apoli:status_effect",
            "effect": "minecraft:poison"
        },
        {    
            "type": "apoli:status_effect",
            "effect": "minecraft:wither"
        }
    ]
}
```

This example will check if the entity has either the Poison or Wither status effects.

