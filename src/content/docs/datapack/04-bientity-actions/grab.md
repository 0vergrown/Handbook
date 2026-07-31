---
title: "Grab (Bi-Entity Action Type)"
description: "Makes the actor grab the target: the target entity is held in front of the actor's face and follows the actor's camera as they look and move around, like…"
navigation_title: "Grab"
---

Makes the actor grab the target: the target entity is held in front of the actor's face and follows the actor's camera as they look and move around, like carrying something at arm's length. The hold is enforced server-side every tick (velocity zeroed, fall distance reset), so the grabbed entity cannot walk, fall or knockback away. The target's hitbox collides with the world while held: looking down presses it against the ground (never into it), and it cannot be pushed through walls or ceilings, so a grab can't suffocate the target in blocks.

Type ID: `apoli:grab`

> A grab ends when its `duration` runs out, when either entity dies, unloads or changes dimension, when the grabbed entity is grabbed by someone else, or when [apoli:release_grab](/docs/datapack/entity-actions/release_grab) runs on either entity. Grabs are not persisted across relogs or server restarts.

## Fields

| Field             | Type                                     | Default      | Description                                                                                                   |
| ----------------- | ---------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| `duration`        | Integer | _continuous_ | How long the grab lasts, in ticks. Omit (or use a value ≤ 0) for a continuous grab that lasts until released. |
| `distance`        | Double   | `2.0`        | How far in front of the actor's eyes the target is held, in blocks.                                           |
| `disable_grabber` | Boolean | `false`      | While the grab is active, the **actor** cannot use Apoli power keybinds (active powers, toggles).             |
| `disable_grabbed` | Boolean | `false`      | While the grab is active, the **target** cannot use Apoli power keybinds.                                     |
| `horizontal_only` | Boolean | `false`      | The target only moves **left/right** with the actor's camera: it stays at eye height and ignores looking up or down (pitch is treated as level). |
| `vertical_only`   | Boolean | `false`      | The target only moves **up/down** with the actor's camera: the horizontal direction is frozen to where the actor faced when the grab started, and only pitch moves it. |

Setting both booleans holds the target at a fixed point: eye height, in the direction the actor faced when the grab began.

## Example

```json
{
    "type": "apoli:grab",
    "duration": 100,
    "distance": 1.5,
    "disable_grabbed": true
}
```

Holds the target in front of the actor for 5 seconds; the target cannot fire their power keybinds while held.
