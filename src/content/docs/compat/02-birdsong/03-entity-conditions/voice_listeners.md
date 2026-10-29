---
title: "Voice Listeners (Entity Condition Type)"
description: "Checks whether enough players connected to voice chat are within earshot."
navigation_title: "Voice Listeners"
---

Checks whether at least `min_count` other players who are connected to voice chat are within `range` blocks of the entity.

Type ID: `birdsong:voice_listeners` (alias `apoli:voice_listeners`)

> [!NOTE]
> This condition comes from [Birdsong](/docs/compat/birdsong/overview) and needs Simple Voice Chat on the server.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `range` | [Float](/docs/datapack/data-types/float) | `16.0` | The radius in blocks to search. |
| `min_count` | [Integer](/docs/datapack/data-types/integer) | `1` | How many connected players must be inside it. |

The entity itself isn't counted.

## Example

```json
{
  "type": "birdsong:action_on_speak",
  "condition": { "type": "birdsong:voice_listeners", "range": 8.0, "min_count": 2 },
  "entity_action": { "type": "apoli:apply_effect", "effect": { "effect": "minecraft:strength", "duration": 200 } }
}
```

This power only gives Strength when at least two other players within eight blocks are there to hear the holder speak.
