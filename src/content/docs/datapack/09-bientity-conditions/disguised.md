---
title: "Disguised (Bi-Entity Condition Type)"
description: "Checks whether the actor is disguised as the target."
navigation_title: "Disguised"
---

Checks whether the actor is disguised as the target. For a player target it compares UUIDs, and otherwise it compares entity types. It was ported from the Sync mod.

Type ID: `apoli:disguised`

## Fields

This condition has no fields.

## Examples

```json
"bientity_condition": {
    "type": "apoli:disguised"
}
```

This passes while the actor is disguised as the target, meaning the same entity type or the same player.
