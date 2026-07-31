---
title: "Choice (Meta Action Type)"
description: "Executes one of the provided actions, choosing randomly based on the assigned weights."
navigation_title: "Choice"
---

Executes one of the provided actions, choosing randomly based on the assigned weights. The actions with higher weight values are more likely to be chosen.

Type ID: `apoli:choice`

> The chance of the object is determined by dividing the weight of the object to the sum of all weights of all the objects (`weight / sumOfAllWeights = chance`).

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`actions` | [Array](/docs/datapack/data-types/array) of Objects (Data Type) | | Each object has to have an `element` for Action Type and a `weight` for [Integer](/docs/datapack/data-types/integer).

## Examples

```json
"entity_action": {
    "type": "apoli:choice",
    "actions": [
        {
            "element": {
                "type": "apoli:exhaust",
                "amount": 0.5
            },
            "weight": 10
        },
        {
            "element": {    
            "type": "apoli:apply_effect",
                "effect": {
                    "effect": "minecraft:regeneration",
                    "amplifier": 1,
                    "duration": 100
                }
            },
            "weight": 10
        },
        {
            "element": {
                "type": "apoli:set_on_fire",
                "duration": 8
            },
            "weight": 20
        }
    ]
}
```

This example has multiple entity action types with different weights: one with a 25% chance of applying exhaustion with a value of `0.5` to the player, another with a 25% chance of applying a Regeneration II status effect that would last for 5 seconds, and another one with a 50% of setting the entity on fire for 8 seconds.
