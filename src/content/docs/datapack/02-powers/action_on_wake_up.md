---
title: "Action On Wake Up (Power Type)"
description: "Runs an entity action, a block action or both when the player wakes up after sleeping."
navigation_title: "Action On Wake Up"
---

Runs an entity action, a block action or both when the player wakes up after sleeping.

Type ID: `apoli:action_on_wake_up`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player when they wake up. |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | If set, this action runs on the bed block. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the actions only run when the bed block passes this condition. |
| `require_full_sleep` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Only run when the sleep finished, meaning the night or the storm passed and the game woke the player. With `false`, the actions also run when the player climbs out of bed early, is teleported away or has the bed broken under them. |

> [!NOTE]
> The power fires as the player leaves the bed, while the bed's position is still known, so `block_condition` can test the bed they slept in. It runs on the server only.

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

When the player wakes up after sleeping in a red bed, this gives them Regeneration II and Hunger III for 5 seconds and shows "You feel rejuvenated but hungry..." in the action bar.
