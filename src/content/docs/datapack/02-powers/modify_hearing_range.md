---
title: "Modify Hearing Range (Power Type)"
description: "Changes how far away the entity can hear game sounds and voice chat."
navigation_title: "Modify Hearing Range"
---

Changes how far away the entity with the power can hear, for both ordinary game sounds and Simple Voice Chat proximity audio, the second through [Birdsong](/docs/compat/birdsong/overview). The power works on the listener's side: it changes what the entity hears, not how far others hear it.

Type ID: `apoli:modify_hearing_range`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the base hearing distance. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers applied to the base hearing distance. |
| `sounds` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the power applies to ordinary game sounds. |
| `voice` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the power applies to Simple Voice Chat proximity audio. |
| `bientity_condition` | [Bi-entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Decides for each speaker whether this power applies, with the listener as the actor and the speaker as the target. It only works for voice chat, so a power that sets it is skipped for game sounds. |

## What the base value is

The modifiers apply to however far the sound would normally carry, so one power covers every sound at once:

| Channel | Base |
| --- | --- |
| Game sounds | The sound event's own range: `16` blocks for most sounds, and further for loud ones such as the Ender Dragon or a lightning strike. |
| Voice chat | The server's `max_voice_distance` (`48` by default), or `whisper_distance` (`24`) when the speaker is whispering. |

A result of `0` or less means the entity hears nothing on that channel. There is no upper limit, so with a high enough value the entity hears the whole dimension.

## Hearing some players further than others

Without `bientity_condition`, this power changes one number: how far the entity hears everything. With one, the range is decided for each speaker separately, with the listener as the actor and whoever is talking as the target, so a pack can give one squad clear comms while everyone else fades out at the usual distance. This one triples how far the entity hears its own team and leaves everyone else alone:

```json
{
  "type": "apoli:modify_hearing_range",
  "sounds": false,
  "bientity_condition": {
    "type": "apoli:same_team"
  },
  "modifier": {
    "operation": "multiply_total",
    "value": 2
  }
}
```

Voice ranges are worked out once a tick, for each listener with one of these powers against each player who is talking, so the cost grows with the number of conversations, not the number of players. [birdsong:modify_speaking_range](/docs/compat/birdsong/modify_speaking_range) is applied in the same pass: the speaker's range is the base that the listener's modifiers apply to, so a shout heard by keen ears goes further still.

A power with a `bientity_condition` is skipped entirely for game sounds, because a sound has no speaker to test against. Split it into two powers if you want both.

## Examples

Deaf, with no game sounds and no voice chat:

```json
{
  "type": "apoli:modify_hearing_range",
  "modifier": {
    "operation": "multiply_total",
    "value": -1
  }
}
```

Keen hearing, where everything reaches four times as far:

```json
{
  "type": "apoli:modify_hearing_range",
  "modifier": {
    "operation": "multiply_total",
    "value": 3
  }
}
```

Hears voices from anywhere in the dimension, and game sounds as usual:

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

Deafened only while an `example:concussed` resource is above zero, and only for game sounds:

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

The modifier's `value` accepts an [expression](/docs/datapack/data-types/expression), so hearing can scale with a resource: `"value": "example:focus / 10"`.

## Notes

- The server decides whether the power is active, so its `condition` can use anything. For game sounds, the server decides which sounds reach the entity at all, and the entity's client, which needs Apoli installed, stretches how far each sound carries, so a far sound is heard and every sound in range is louder. Without Apoli on the client, the extra sounds arrive but fade out at the usual distance.
- Longer voice hearing works by widening how far the speaker's audio is broadcast and then trimming it back for each listener, so the distant listener hears the speaker while everyone else's range stays the same.
- For the first tick of a sentence, the listener hears at the speaker's own range, and the listener's modifiers take over from the next tick. At 50 ms this isn't audible, and it is why a range change never cuts off the start of a word.
- Only proximity voice audio is affected. Group chat is a separate channel and its members can always hear it.
- Several active `modify_hearing_range` powers stack, in the order their modifiers sort.
- The voice chat half needs Birdsong and Simple Voice Chat on the server, and the `sounds` half doesn't. Without them, the `voice` field does nothing.

> [!NOTE]
> Game sounds are filtered for each listener, so while any pack in the world uses this power, every broadcast sound costs one extra power lookup per online player. That is cheap, but it adds up, so prefer one power with a condition over several.
