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
| `bientity_condition` | [Bi-entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Decides **per listener** whether this power applies, with the holder as the actor and the listener as the target. |

## What the base value is

| Channel | Base |
| --- | --- |
| Speaking | The server's `max_voice_distance`, `48` blocks by default. |
| Whispering | The server's `whisper_distance`, `24` blocks by default. |

A result of `0` or less silences the holder for everyone in proximity chat. There is no upper limit.

## Speaking to some people further than others

Without `bientity_condition` the power changes one number: how far the holder's voice carries for everybody. With one, the range is worked out for each listener separately — the holder is the **actor** and the listener is the **target** — and only listeners who pass get the modified range. Everyone else hears the holder at whatever the unconditional powers leave.

Unconditional powers are applied first and conditional ones on top of them, so the two combine into an audience. The first power below mutes the holder; the second gives their voice back, at full range, to everyone in the `example:audience` [entity set](/docs/datapack/powers/entity_set):

```json
{
  "type": "apoli:modify_speaking_range",
  "modifier": {
    "operation": "set_total",
    "value": 0
  }
}
```

```json
{
  "type": "apoli:modify_speaking_range",
  "bientity_condition": {
    "type": "apoli:in_entity_set",
    "set": "example:audience"
  },
  "modifier": {
    "operation": "set_total",
    "value": 48
  }
}
```

Fill the set however the pack likes. This [apoli:raycast](/docs/datapack/entity-actions/raycast) adds everyone in a 60° cone in front of the holder for 30 seconds — run it from a key press and whoever you point at can hear you:

```json
{
  "type": "apoli:raycast",
  "distance": 16,
  "block": false,
  "cone_angle": 30,
  "pierce_entities": true,
  "bientity_action": {
    "type": "apoli:add_to_entity_set",
    "set": "example:audience",
    "time_limit": 600
  }
}
```

Muting always wins over a listener's own hearing: if the range for a listener comes out at `0` or less, an [apoli:modify_hearing_range](/docs/datapack/powers/modify_hearing_range) on that listener cannot bring the holder's voice back.

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
- Per-listener ranges are worked out once a tick, and only while the holder is actually talking, so a `bientity_condition` costs nothing while they are quiet.
- Only **proximity** voice audio is affected. Group chat is a separate channel and is always audible to its members.
- Several active `modify_speaking_range` powers stack, in the order the modifiers sort — unconditional ones first, then the ones with a `bientity_condition`.
- Everything is decided on the server, so it works for vanilla clients and cannot be tampered with.
- Needs Simple Voice Chat installed. Without it this power loads and does nothing.
