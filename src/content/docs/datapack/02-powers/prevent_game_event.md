---
title: "origins:prevent_game_event"
description: "[Power Type](../powertypes.md)"
---

Power Type

Prevents specified game event(s) from being emitted by the entity that has the power.

Type ID: `origins:prevent_game_event`


!!! note

    See [Minecraft Wiki: Sculk Sensor (Vibration amplitudes)](https://minecraft.wiki/w/Sculk_Sensor?oldid=2099339#Vibration_amplitudes) for a list of vanilla game events you can check for.


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`event` | Identifier | _optional_ | If specified, the game event with this namespace and ID will be prevent from being emitted by the entity.
`events` | Array of Identifiers | _optional_ | If specified, the game events with these namespace and IDs will be prevent from being emitted by the entity.
`tag` | Identifier | _optional_ | If specified, the game events inside game event tag will be prevented from being emitted by the entity.
`entity_action` | Entity Action Type | _optional_ | If specified, this action will be executed on the entity upon preventing game events.


## Examples

```json
{
    "type": "origins:prevent_game_event",
    "event": "minecraft:hit_ground",
    "entity_action": {
        "type": "origins:execute_command",
        "command": "say donk"
    }
}
```

This example will prevent the entity that has the power to emit a `minecraft:hit_ground` game event, which is usually emitted by landing on the ground upon falling.

