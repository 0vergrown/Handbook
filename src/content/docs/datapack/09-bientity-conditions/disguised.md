---
title: "apoli:disguised"
description: "Checks whether the actor is currently disguised as the target."
---

Checks whether the **actor** is currently disguised as the **target**. For a player target it compares UUIDs; otherwise it compares entity types. Ported from the Sync mod.

Type ID: `apoli:disguised`

## Fields

This condition type has no fields.

## Examples

```json
"bientity_condition": {
    "type": "apoli:disguised"
}
```

True while the actor is disguised as the target (same entity type, or same player).

