---
title: "Voice Listeners (Entity Condition Type)"
description: "Passes when enough voice-chat-connected players are within earshot."
navigation_title: "Voice Listeners"
---

Passes when at least `min_count` other players who are connected to voice chat are within `range` blocks of the entity.

Type ID: `apoli:voice_listeners`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `range` | Double | `16.0` | Radius in blocks to search. |
| `min_count` | Integer | `1` | How many connected players must be inside it. |

The entity itself is not counted.

## Example

A power that only works when somebody is there to hear it:

```json
{
  "type": "apoli:action_on_speak",
  "condition": { "type": "apoli:voice_listeners", "range": 8.0, "min_count": 2 },
  "entity_action": { "type": "apoli:apply_effect", "effect": { "effect": "minecraft:strength", "duration": 200 } }
}
```
