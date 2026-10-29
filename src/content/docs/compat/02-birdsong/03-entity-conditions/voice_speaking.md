---
title: "Voice Speaking (Entity Condition Type)"
description: "Checks whether the entity is talking into voice chat."
navigation_title: "Voice Speaking"
---

Checks whether the entity is currently talking into voice chat.

Type ID: `birdsong:voice_speaking` (alias `apoli:voice_speaking`)

> [!NOTE]
> This condition comes from [Birdsong](/docs/compat/birdsong/overview) and needs Simple Voice Chat on the server.

## Fields

This condition has no fields.

## Example

```json
{
  "type": "apoli:entity_glow",
  "condition": { "type": "birdsong:voice_speaking" }
}
```

This power makes the holder glow while they are talking.
