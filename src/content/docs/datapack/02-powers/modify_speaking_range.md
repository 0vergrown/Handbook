---
title: "Modify Speaking Range (Power Type)"
description: "Changes how far the holder's voice carries in Simple Voice Chat."
navigation_title: "Modify Speaking Range"
---

Changes how far the holder's own voice carries over [Simple Voice Chat](/docs/compat/simple-voice-chat/overview) proximity audio. This is the **speaker-side** counterpart to [apoli:modify_hearing_range](/docs/datapack/powers/modify_hearing_range): it changes what everyone else hears from the holder, not what the holder hears.

Type ID: `apoli:modify_speaking_range`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the holder's broadcast distance. |
| `modifiers` | Array of Attribute Modifier | _optional_ | Several modifiers applied to the holder's broadcast distance. |
| `normal` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Apply to ordinary speech. |
| `whisper` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Apply to whispering. |

## What the base value is

| Channel | Base |
| --- | --- |
| Speaking | The server's `max_voice_distance`, `48` blocks by default. |
| Whispering | The server's `whisper_distance`, `24` blocks by default. |

A result of `0` or less silences the holder for everyone in proximity chat. There is no upper limit.

## Examples

A booming voice that carries three times as far, whispers included:

```json
{
  "type": "apoli:modify_speaking_range",
  "modifier": {
    "operation": "multiply_total",
    "value": 2
  }
}
```

Mute — nobody nearby hears the holder at all:

```json
{
  "type": "apoli:modify_speaking_range",
  "modifier": {
    "operation": "set_total",
    "value": 0
  }
}
```

Whispers travel as far as ordinary speech, but speaking is unchanged:

```json
{
  "type": "apoli:modify_speaking_range",
  "normal": false,
  "modifier": {
    "operation": "set_total",
    "value": 48
  }
}
```

The modifier's `value` accepts an [Expression](/docs/datapack/data-types/expression), so a voice can fade with a resource: `"value": "example:breath / 2"`.

## Notes

- Speaking range is resolved first, then each listener's hearing range is applied on top of it, so the two powers compose: a quiet speaker heard by a keen listener lands somewhere between the two.
- Only **proximity** voice audio is affected. Group chat is a separate channel and is always audible to its members.
- Several active `modify_speaking_range` powers stack, in the order the modifiers sort.
- Everything is decided on the server, so it works for vanilla clients and cannot be tampered with.
- Needs Simple Voice Chat installed. Without it this power loads and does nothing.
