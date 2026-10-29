---
title: "Voice Disabled (Entity Condition Type)"
description: "Checks whether the entity has voice chat turned off or isn't connected to it."
navigation_title: "Voice Disabled"
aliases: ["voice_muted"]
---

Checks whether the entity has voice chat disabled or isn't connected to it at all, which includes players who don't have Simple Voice Chat on their client. On a server without Simple Voice Chat it reads `false`, like the other voice conditions, and so do `apoli:voice_disabled` and `apoli:voice_muted` on a server without Birdsong. A chat fallback that only tests this condition stays off on those servers.

Type ID: `birdsong:voice_disabled` (aliases `birdsong:voice_muted`, `apoli:voice_disabled`, `apoli:voice_muted`)

> [!NOTE]
> This condition comes from [Birdsong](/docs/compat/birdsong/overview) and needs Simple Voice Chat on the server.

> [!NOTE]
> This doesn't detect a muted microphone. Simple Voice Chat keeps the mute toggle on the client and never tells the server about it, so no condition on the server can see it.

## Fields

This condition has no fields.

## Example

```json
{
  "type": "apoli:action_on_sending_message",
  "condition": { "type": "birdsong:voice_disabled" },
  "filter": { "filter": "(?i)fireball", "prevent": true },
  "entity_action": {
    "type": "apoli:fire_projectile",
    "entity_type": "minecraft:small_fireball"
  }
}
```

This power is a fallback for players who don't use voice: typing "fireball" in chat casts a fireball and hides the message.
