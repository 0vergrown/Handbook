---
title: "Voice Whispering (Entity Condition Type)"
description: "Checks whether the entity is talking with Simple Voice Chat's whisper key held."
navigation_title: "Voice Whispering"
---

Checks whether the entity is talking while holding Simple Voice Chat's whisper key, which halves how far their voice carries.

Type ID: `apoli:voice_whispering`

## Fields

This condition has no fields.

The condition is false whenever the entity isn't speaking, so it already implies [`apoli:voice_speaking`](/docs/compat/simple-voice-chat/voice_speaking). To test for talking normally, pair it inverted with `apoli:voice_speaking`.

## Examples

```json
{
  "type": "apoli:invisibility",
  "condition": {
    "type": "apoli:voice_whispering"
  }
}
```

This power makes the holder invisible while they whisper.

```json
{
  "type": "apoli:modify_damage_dealt",
  "condition": {
    "type": "apoli:voice_whispering"
  },
  "modifier": {
    "operation": "multiply_total",
    "value": 1
  }
}
```

This doubles the holder's damage, but only while they whisper.
