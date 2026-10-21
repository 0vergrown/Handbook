---
title: "Swimming (Power Type)"
description: "Lets the player swim outside of water."
navigation_title: "Swimming"
---

Lets the player swim outside of water.

Type ID: `apoli:swimming`

The entity swims while it is sprinting and not riding anything, the same trigger as vanilla's swim sprint without the water. It takes the swimming pose, glides forward in the direction it is looking and takes no fall damage while swimming. When it stops sprinting, it stands back up.

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

This makes the player swim instead of sprint while they are on the ground.
