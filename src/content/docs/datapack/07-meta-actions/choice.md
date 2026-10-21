---
title: "Choice (Meta Action Type)"
description: "Runs one action from a list, picked at random by weight."
navigation_title: "Choice"
---

Runs one action from a list, picked at random by weight. Actions with a higher weight are more likely to be picked.

Type ID: `apoli:choice`

> [!NOTE]
> The chance of each entry is its weight divided by the sum of all the weights (`weight / sumOfAllWeights = chance`).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `actions` | [Array](/docs/datapack/data-types/array) of objects | _required_ | Each object needs an `element`, which is the action, and a `weight`, which is an [Integer](/docs/datapack/data-types/integer). |

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

This has three entity actions with different weights: a 25% chance of adding 0.5 exhaustion to the player, a 25% chance of giving Regeneration II for 5 seconds, and a 50% chance of setting the entity on fire for 8 seconds.
