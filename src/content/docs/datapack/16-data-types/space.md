---
title: "Space (Data Type)"
description: "A string that picks the coordinate system directions are read in."
navigation_title: "Space"
---

A [String](/docs/datapack/data-types/string) that picks the coordinate system directions are read in.

## Values

| Value | Description |
| --- | --- |
| `world` | The axes are global: `x` points west (negative) or east (positive), `y` down (negative) or up (positive), and `z` north (negative) or south (positive). |
| `local` | The axes follow the entity: `x` points to its left side and is always horizontal, `y` points to the top of its head, and `z` points the way it is facing. |
| `local_horizontal` | Like `local`, except the vertical part of the entity's facing counts as 0, so `z` is flattened onto the horizontal plane and gets shorter. `x` and `y` shrink by the same amount, and `y` always points up. The axes shrink the further the entity's facing is from horizontal, and if it looks straight up or straight down they have a length of 0, as if `x`, `y` and `z` were all `0`. |
| `local_horizontal_normalized` | Like `local_horizontal`, except the axes are normalized, so the offset keeps its full length whatever the entity's pitch is. It is a pure rotation around the entity's yaw, so unlike `local_horizontal` it still works when the entity looks straight up or straight down. |
| `velocity` | The axes follow the entity's velocity, much like `local`. If the velocity is purely vertical, the way the entity faces decides the direction of `x` and `y` instead. The axes scale with how fast the entity is moving, so when it isn't moving they have a length of 0, as if `x`, `y` and `z` were all `0`. |
| `velocity_normalized` | Like `velocity`, except the axes are normalized back to a length of 1 whenever they aren't zero, so they don't depend on how fast the entity moves, only that it is moving. |
| `velocity_horizontal` | Like `velocity`, except the vertical velocity counts as `0`. |
| `velocity_horizontal_normalized` | Like `velocity_horizontal`, except the axes are normalized back to a length of 1 whenever they aren't zero. |
