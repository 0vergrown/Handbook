---
title: "apoli:voice_loudness"
description: "Compares how loudly the entity is currently talking."
---

Compares the entity's current speaking loudness, on a `0`–`100` scale, against a value.

Type ID: `apoli:voice_loudness`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How to compare. |
| `compare_to` | Integer | `1` | The value to compare against, `0`–`100`. |

The default of `>= 1` is effectively "is making any sound at all".

> Loudness is approximated from the size of the encoded voice packet — no audio is decoded. It is cheap but coarse: reliable for "loud vs. quiet", not for precise volume. Pick thresholds by testing rather than by expecting decibels.

## Example

Only shout-powered abilities:

```json
{
  "type": "apoli:action_on_speak",
  "condition": { "type": "apoli:voice_loudness", "comparison": ">=", "compare_to": 70 },
  "entity_action": {
    "type": "apoli:area_of_effect",
    "radius": 6.0,
    "bientity_action": { "type": "apoli:damage", "amount": 4.0 }
  }
}
```

## See also

- [`apoli:voice_speaking`](/docs/compat/simple-voice-chat/voice_speaking)
- [`apoli:voice_listeners`](/docs/compat/simple-voice-chat/voice_listeners)
