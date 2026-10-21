---
title: "Emit Game Event (Entity Action Type)"
description: "Emits a game event, such as a vibration, at the entity's position."
navigation_title: "Emit Game Event"
---

Emits a game event at the entity's position. Game events are what sculk sensors and other vibration listeners react to.

Type ID: `apoli:emit_game_event`

> [!TIP]
> [Minecraft Wiki: Sculk Sensor (Vibration amplitudes)](https://minecraft.wiki/w/Sculk_Sensor?oldid=2099339#Vibration_amplitudes) lists the vanilla game events you can use.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `event` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of a game event. |

## Examples

```json
"entity_action": {
    "type": "apoli:emit_game_event",
    "event": "minecraft:ring_bell"
}
```

This emits a `minecraft:ring_bell` game event, which has a redstone signal output of 6.
