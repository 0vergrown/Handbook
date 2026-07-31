---
title: "And (Meta Action Type)"
description: "Executes all provided actions in order."
navigation_title: "And"
---

Executes all provided actions in order.

Type ID: `apoli:and`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`actions` | [Array](/docs/datapack/data-types/array) of Action Types | | These actions will be executed one after the other (but in the same tick).

## Examples

```json
"entity_action": {
    "type": "apoli:and",
    "actions": [
        {
            "type": "apoli:exhaust",
            "amount": 0.5
        },
        {    
            "type": "apoli:apply_effect",
            "effect": {
            "effect": "minecraft:regeneration",
            "amplifier": 1,
            "duration": 100
            }
        }
    ]
}
```

This example will apply exhaustion with a value of 0.5 to the player, and apply a Regeneration II status effect that would last for 5 seconds.
