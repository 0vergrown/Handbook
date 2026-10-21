---
title: "Voice Disabled (Entity Condition Type)"
description: "Checks whether the entity has voice chat turned off or isn't connected to it."
navigation_title: "Voice Disabled"
aliases: ["voice_muted"]
---

Checks whether the entity has voice chat disabled or isn't connected to it at all, which includes every player on a server without Simple Voice Chat installed.

Type ID: `apoli:voice_disabled` (alias `apoli:voice_muted`)

> [!NOTE]
> This doesn't detect a muted microphone. Simple Voice Chat keeps the mute toggle on the client and never tells the server about it, so no condition on the server can see it.

## Fields

This condition has no fields.

## Example

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

This power is a fallback for players who don't use voice: typing "fireball" in chat casts a fireball and hides the message.
