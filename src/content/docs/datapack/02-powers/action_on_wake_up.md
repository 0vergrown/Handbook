---
title: "Action On Wake Up (Power Type)"
description: "Executes an Entity Action Type or a Block Action type when the player wakes up after sleeping."
navigation_title: "Action On Wake Up"
---

Executes an Entity Action Type or a Block Action type when the player wakes up after sleeping.

Type ID: `apoli:action_on_wake_up`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_action` | Entity Action Type | _optional_ | If specified, this action will be executed on the player when they wake up.
`block_action` | Block Action Type | _optional_ | If specified, this action will be executed on the bed block.
`block_condition` | Block Condition Type | _optional_ | If specified, the specified actions will only execute if this condition is fulfilled by the bed block.

> Fires as the player leaves the bed, while the bed position is still known, so `block_condition` can test the bed they slept in. It runs server-side only.

## Examples

```json
{
    "type": "apoli:action_on_wake_up",
    "entity_action": {
        "type": "apoli:and",
        "actions": [
            {
                "type": "apoli:execute_command",
                "command": "title @s actionbar {\"translate\": \"You feel %1$s but %2$s\", \"color\": \"yellow\", \"with\": [{\"text\": \"rejuvenated\", \"color\": \"green\"}, {\"text\": \"hungry...\", \"color\": \"red\"}]}"
            },
            {
                "type": "apoli:apply_effect",
                "effects": [
                    {
                        "effect": "minecraft:regeneration",
                        "duration": 100,
                        "amplifier": 1,
                        "is_ambient": true,
                        "show_particles": true,
                        "show_icon": true
                    },
                    {
                        "effect": "minecraft:hunger",
                        "duration": 100,
                        "amplifier": 2,
                        "is_ambient": true,
                        "show_particles": true,
                        "show_icon": true
                    }
                ]
            }
        ]
    },
    "block_condition": {
        "type": "apoli:block",
        "block": "minecraft:red_bed"
    }
}
```

This example will apply a Regeneration II and Hunger III status effect that both lasts for 5 seconds, and execute a `/title` command that will display a "`You feel rejuvenated but hungry...`" message in the actionbar if the player has woken up from sleeping in a Red Bed.
