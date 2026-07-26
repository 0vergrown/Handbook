---
title: "apoli:action_on_sending_message"
description: "Runs an [Entity Action Type](../entityactiontypes.md) when the holder sends a chat message — optionally only when the message matches a word or pattern."
---

Runs an Entity Action Type when the holder sends a chat message — optionally only when the message matches a word or pattern. This is the "magic word" trigger: type `Fireball` in chat and cast a fireball.

Type ID: `apoli:action_on_sending_message`

> True voice-keyword detection isn't possible — Simple Voice Chat sends audio, not text, and there is no speech-to-text. This chat-message trigger is the practical equivalent. For voice *activity* (not words) see [[Voice Chat](/docs/datapack/powers/voice-chat)](/docs/datapack/powers/voice-chat).

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_action` | Entity Action Type | _optional_ | The action run on the holder when a matching message is sent.
`message` | String | _optional_ | If set, the message must equal this exactly (case-insensitive, trimmed).
`regex` | String | _optional_ | If set, a regular expression that must be found in the message.

If both `message` and `regex` are set, either one matching triggers the action. If neither is set, **any** message the holder sends triggers it.

## Example

Say "fireball" to launch one:

```json
{
  "type": "apoli:action_on_sending_message",
  "message": "fireball",
  "entity_action": {
    "type": "apoli:fire_projectile",
    "entity_type": "minecraft:small_fireball",
    "speed": 1.5
  }
}
```

Trigger on any message that contains a number:

```json
{
  "type": "apoli:action_on_sending_message",
  "regex": "[0-9]+",
  "entity_action": { "type": "apoli:...": "..." }
}
```

