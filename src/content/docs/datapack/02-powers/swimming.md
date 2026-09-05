---
title: "Swimming (Power Type)"
description: "Allows the player to swim (outside of water!)."
navigation_title: "Swimming"
---

Allows the player to swim (outside of water!).

Type ID: `apoli:swimming`

The entity swims while it is **sprinting** and not riding anything — the same trigger as vanilla's
swim-sprint, minus the water. It takes the swimming pose, glides forward along its view direction and
stops taking fall damage while it does. Let go of sprint and it stands back up.

## Fields

_None._

## Examples

```json
{
    "type": "apoli:swimming",
    "condition": {
        "type": "apoli:on_block"
    }
}
```

This example will make the player swim instead of sprint if the player is on the ground.
