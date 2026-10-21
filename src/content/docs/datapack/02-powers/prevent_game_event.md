---
title: "Prevent Game Event (Power Type)"
description: "Stops the entity from emitting the game events you list."
navigation_title: "Prevent Game Event"
---

Stops the entity that has the power from emitting the game events you list.

Type ID: `apoli:prevent_game_event`

The Minecraft Wiki's [sculk sensor page](https://minecraft.wiki/w/Sculk_Sensor?oldid=2099339#Vibration_amplitudes) lists the vanilla game events.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `event` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If set, the game event to stop. Prefix it with `#` to name a game event tag instead. |
| `events` | [Array](/docs/datapack/data-types/array) of [Identifiers](/docs/datapack/data-types/identifier) | _optional_ | If set, the game events to stop. Any entry can start with `#` to name a game event tag. |
| `tag` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If set, every game event in this tag is stopped. The leading `#` is optional. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the entity each time a game event is stopped. |

## Examples

```json
{
    "type": "apoli:prevent_game_event",
    "event": "minecraft:hit_ground",
    "entity_action": {
        "type": "apoli:execute_command",
        "command": "say donk"
    }
}
```

This stops the entity from emitting `minecraft:hit_ground`, the game event that landing after a fall usually emits, and runs `say donk` each time.
