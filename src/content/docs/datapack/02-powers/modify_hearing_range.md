---
title: "Modify Hearing Range (Power Type)"
description: "Changes how far away the holder can hear game sounds and voice chat."
navigation_title: "Modify Hearing Range"
---

Changes how far away the holder can hear — both ordinary game sounds and [Simple Voice Chat](/docs/compat/simple-voice-chat/overview) proximity audio. This is a **listener-side** power: it changes what its holder hears, not what anyone hears from them.

Type ID: `apoli:modify_hearing_range`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the base hearing distance. |
| `modifiers` | Array of Attribute Modifier | _optional_ | Several modifiers applied to the base hearing distance. |
| `sounds` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Apply to ordinary game sounds. |
| `voice` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Apply to Simple Voice Chat proximity audio. |

## What the base value is

The modifiers are applied to whatever the sound would normally carry, so one power covers every sound at once:

| Channel | Base |
| --- | --- |
| Game sounds | The sound event's own range — `16` blocks for most sounds, further for loud ones such as the Ender Dragon or a lightning strike. |
| Voice chat | The server's `max_voice_distance` (`48` by default), or `whisper_distance` (`24`) when the speaker is whispering. |

A result of `0` or less means the holder hears nothing on that channel. There is no upper limit — set it high enough and the holder hears the whole dimension.

## Examples

Deaf — no game sounds, no voice chat:

```json
{
  "type": "apoli:modify_hearing_range",
  "modifier": {
    "operation": "multiply_total",
    "value": -1
  }
}
```

Keen hearing — everything reaches four times as far:

```json
{
  "type": "apoli:modify_hearing_range",
  "modifier": {
    "operation": "multiply_total",
    "value": 3
  }
}
```

Hears voices from anywhere in the dimension, but game sounds normally:

```json
{
  "type": "apoli:modify_hearing_range",
  "sounds": false,
  "modifier": {
    "operation": "set_total",
    "value": 10000
  }
}
```

Deafened only while a `example:concussed` resource is above zero, and only for game sounds:

```json
{
  "type": "apoli:modify_hearing_range",
  "voice": false,
  "condition": {
    "type": "apoli:resource",
    "resource": "example:concussed",
    "comparison": ">",
    "compare_to": 0
  },
  "modifier": {
    "operation": "multiply_total",
    "value": -0.9
  }
}
```

The modifier's `value` accepts an [Expression](/docs/datapack/data-types/expression), so hearing can scale off a resource: `"value": "example:focus / 10"`.

## Notes

- Everything is decided **on the server**, so it works for vanilla clients and cannot be tampered with.
- Extended voice hearing works by widening how far the speaker's audio is broadcast and then trimming it back per listener, so a distant listener hears the speaker while everyone else's range is unchanged.
- Only **proximity** voice audio is affected. Group chat is a separate channel and is always audible to its members.
- Several active `modify_hearing_range` powers stack, in the order the modifiers sort.
- The voice-chat half needs Simple Voice Chat installed; the `sounds` half does not. Without Simple Voice Chat the `voice` field simply does nothing.

> Game sounds are filtered per listener, so while any pack in the world uses this power, every broadcast sound costs one extra power lookup per online player. It is cheap, but it is not free — prefer one power with a condition over several.
