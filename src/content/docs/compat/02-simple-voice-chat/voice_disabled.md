---
title: "apoli:voice_disabled"
description: "Passes when the entity has voice chat turned off or isn't connected to it."
---

Passes when the entity has voice chat disabled, or is not connected to it at all — including every player on a server without Simple Voice Chat installed.

Type ID: `apoli:voice_disabled` (alias `apoli:voice_muted`)

> This is **not** microphone mute. Simple Voice Chat keeps the mic-mute toggle client-side and never tells the server about it, so no server-side condition can see it.

## Fields

This type has no fields.

## Example

Fall back to a chat-based trigger for players who don't use voice:

```json
{
  "type": "apoli:action_on_sending_message",
  "condition": { "type": "apoli:voice_disabled" },
  "filter": { "filter": "(?i)fireball", "prevent": true },
  "entity_action": {
    "type": "apoli:fire_projectile",
    "entity_type": "minecraft:small_fireball"
  }
}
```

## See also

- [`apoli:voice_speaking`](/docs/compat/simple-voice-chat/voice_speaking)
