---
title: "And (Meta Action Type)"
description: "Runs every action in a list, in order."
navigation_title: "And"
---

Runs every action in a list, in order.

Type ID: `apoli:and`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `actions` | [Array](/docs/datapack/data-types/array) of action types | _required_ | The actions to run one after the other, all in the same tick. |

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

This adds 0.5 exhaustion to the player and gives them Regeneration II for 5 seconds.
