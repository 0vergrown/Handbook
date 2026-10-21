---
title: "Grab (Bi-Entity Action Type)"
description: "Makes the actor hold the target in front of its face, following the actor's camera as it looks and moves."
navigation_title: "Grab"
---

Makes the actor grab the target. The target is held in front of the actor's face and follows the actor's camera as it looks and moves around, like carrying something at arm's length. The hold is enforced on the server every tick, with the target's velocity zeroed and its fall distance reset, so the grabbed entity can't walk, fall or be knocked away. Its hitbox still collides with the world while it is held, so it can't be pushed through walls or ceilings, and a grab never suffocates the target in blocks.

The hold point never drops below half a block above the actor's own feet, so looking down swings the target around the actor at that height instead of scraping it along the floor.

Type ID: `apoli:grab`

> [!NOTE]
> A grab ends when its `duration` runs out, when either entity dies, unloads or changes dimension, when someone else grabs the grabbed entity, or when [apoli:release_grab](/docs/datapack/entity-actions/release_grab) runs on either entity. Grabs aren't saved across relogs or server restarts.

To check a grab from data, [apoli:grabbed](/docs/datapack/entity-conditions/grabbed) asks whether an entity is being held, and the [bi-entity form](/docs/datapack/bientity-conditions/grabbed) asks whether the actor is the one holding the target.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _continuous_ | How long the grab lasts, in ticks. Leave it out (or use 0 or less) for a grab that lasts until it is released. It is evaluated once, when the grab starts. |
| `distance` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `2.0` | How far in front of the actor's eyes the target is held, in blocks. It is evaluated again every tick against the grabber, so an expression makes the hold reach in and out while the grab runs. |
| `disable_grabber` | [Boolean](/docs/datapack/data-types/boolean) | `false` | While the grab is active, the actor can't use Apoli power keybinds (active powers and toggles). |
| `disable_grabbed` | [Boolean](/docs/datapack/data-types/boolean) | `false` | While the grab is active, the target can't use Apoli power keybinds. |
| `horizontal_only` | [Boolean](/docs/datapack/data-types/boolean) | `false` | The target only moves left and right with the actor's camera. It stays at eye height and ignores looking up or down, as if the pitch were level. |
| `vertical_only` | [Boolean](/docs/datapack/data-types/boolean) | `false` | The target only moves up and down with the actor's camera. The horizontal direction stays where the actor faced when the grab started, and only pitch moves it. |

Setting both booleans holds the target at a fixed point: eye height, in the direction the actor faced when the grab began.

> [!NOTE]
> Looking far enough down puts the raw hold point below the actor's feet, so it stops at the height limit. Aiming a target downwards, including with `vertical_only`, moves it toward the actor instead of pressing it into the ground.

> [!TIP]
> `distance` is the one field that keeps updating. Give it an expression and the target is reeled in or pushed out as the grab runs, following a resource, how long the grab has lasted, or anything else the [expression](/docs/datapack/data-types/expression) engine can read.

```json
{
    "type": "apoli:grab",
    "distance": "1 + 4 * resource('example:pull_charge') / 10"
}
```

This holds the target between one and five blocks out, following a charge resource as it fills.

## Example

```json
{
    "type": "apoli:grab",
    "duration": 100,
    "distance": 1.5,
    "disable_grabbed": true
}
```

This holds the target in front of the actor for 5 seconds, and the target can't use its power keybinds while it is held.
