---
title: "Emit Game Event (Entity Action Type)"
description: "Emits a 'game event' at the entity's position."
navigation_title: "Emit Game Event"
---

Emits a 'game event' at the entity's position.

Type ID: `apoli:emit_game_event`

> See [Minecraft Wiki: Sculk Sensor (Vibration amplitudes)](https://minecraft.wiki/w/Sculk_Sensor?oldid=2099339#Vibration_amplitudes) for a list of vanilla game events you can use.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`event` | Identifier | | The namespace and ID of a game event.

## Examples

```json
"entity_action": {
    "type": "apoli:emit_game_event",
    "event": "minecraft:ring_bell"
}
```
This example will emit a `minecraft:ring_bell` game event, which has a redstone signal output of 6.
