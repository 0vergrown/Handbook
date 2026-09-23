---
title: "Prevent Sprinting (Power Type)"
description: "Stops the entity that has the power from sprinting."
navigation_title: "Prevent Sprinting"
---

Stops the entity that has the power from sprinting. Every attempt to start a sprint is turned into a stop, and a sprint already in progress ends the tick the power becomes active.

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

This example will prevent the player from sprinting if their food level is at, or below 6 hunger shanks.

> It works on any living entity, not only players, and it holds on both sides — the client never starts the sprint, and a sprint packet that arrives anyway is refused by the server.
