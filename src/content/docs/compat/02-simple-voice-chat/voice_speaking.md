---
title: "apoli:voice_speaking"
description: "Passes while the entity is talking into voice chat."
---

Passes while the entity is currently talking into voice chat.

Type ID: `apoli:voice_speaking`

## Fields

This type has no fields.

## Example

Glow while you're on the mic:

```json
{
  "type": "apoli:entity_glow",
  "condition": { "type": "apoli:voice_speaking" }
}
```

## See also

- [`apoli:action_on_speak`](/docs/compat/simple-voice-chat/action_on_speak) — the same state as a trigger.
- [`apoli:voice_loudness`](/docs/compat/simple-voice-chat/voice_loudness)
