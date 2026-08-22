---
title: "Voice Whispering (Entity Condition Type)"
description: "Passes while the entity is talking with Simple Voice Chat's whisper key held."
navigation_title: "Voice Whispering"
---

Passes while the entity is talking **and** holding Simple Voice Chat's whisper key, which halves how far their voice carries.

Type ID: `apoli:voice_whispering`

## Fields

This type has no fields.

The condition is false whenever the entity is not speaking, so it already implies [`apoli:voice_speaking`](/docs/compat/simple-voice-chat/voice_speaking). Pair it with `apoli:voice_speaking` inverted to test for "talking normally".

## Example

Turn invisible while whispering:

```json
{
  "type": "apoli:invisibility",
  "condition": {
    "type": "apoli:voice_whispering"
  }
}
```

Sneak-attack damage that only lands while whispering:

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
