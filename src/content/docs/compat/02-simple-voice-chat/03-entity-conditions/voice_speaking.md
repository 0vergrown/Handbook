---
title: "Voice Speaking (Entity Condition Type)"
description: "Passes while the entity is talking into voice chat."
navigation_title: "Voice Speaking"
---

Passes while the entity is currently talking into voice chat.

Type ID: `apoli:voice_speaking`

## Fields

This type has no fields.

## Example

Glow while you're on the mic:

```json
{
  "type": "apoli:entity_glow",
  "condition": { "type": "apoli:voice_speaking" }
}
```
