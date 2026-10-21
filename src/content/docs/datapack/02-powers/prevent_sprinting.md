---
title: "Prevent Sprinting (Power Type)"
description: "Stops the entity that has the power from sprinting."
navigation_title: "Prevent Sprinting"
---

Stops the entity that has the power from sprinting. Every attempt to start a sprint becomes a stop, and a sprint already in progress ends on the tick the power becomes active.

Type ID: `apoli:prevent_sprinting`

## Fields

_None._

## Examples

```json
{
    "type": "apoli:prevent_sprinting",
    "condition": {
        "type": "apoli:food_level",
        "compare_to": 12,
        "comparison": "<="
    }
}
```

This stops the player from sprinting while their food level is 12 or lower, which is 6 hunger shanks.

> [!NOTE]
> The power works on any living entity, not only players, and it applies on both sides. The client never starts the sprint, and the server refuses a sprint packet that arrives anyway.
