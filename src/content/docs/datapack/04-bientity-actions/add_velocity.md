---
title: "Add Velocity (Bi-Entity Action Type)"
description: "Adds velocity to the target, or sets it, based on the direction from the actor to the target."
navigation_title: "Add Velocity"
---

Adds velocity to the target entity, or sets it, based on the direction from the actor to the target.

Type ID: `apoli:add_velocity`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `x` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | Velocity to add on the X axis. |
| `y` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | Velocity to add on the Y axis. |
| `z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | Velocity to add on the Z axis. |
| `reference` | [String](/docs/datapack/data-types/string) | `"position"` | Whether the target's `"position"` or `"rotation"` is used to work out the velocity. Ignored when `space` is set. |
| `space` | [Space](/docs/datapack/data-types/space) | _optional_ | Reads `x`, `y` and `z` in a fixed frame relative to the actor, instead of the frame that points from the actor to the target. `"world"` gives absolute axes, so the numbers you write are the velocity you get. |
| `set` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, the velocity replaces the target's current velocity instead of adding to it. |
| `blend` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | With `set`, how far to move from the target's current velocity toward the new one, from `0.0` to `1.0`. `1.0` snaps, and smaller values turn gradually. Ignored when `set` is `false`. |
| `keep_speed` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `set`, rescales the result to the target's current speed, so the action only changes direction. Ignored when `set` is `false`. |

## Examples

```json
"bientity_action": {
    "type": "apoli:add_velocity",
    "z": -2
}
```

This pulls the target toward the actor.

```json
"bientity_action": {
    "type": "apoli:add_velocity",
    "space": "world",
    "y": 0.6
}
```

With `space` set, `x`, `y` and `z` are read in that frame instead of being rotated into the frame from the actor to the target. Use `"world"` when a knockback keeps sending things into orbit: `0.6` up is exactly `0.6` up, whatever angle the target is at.

## Which entity the expressions read

`x`, `y` and `z` are [expressions](/docs/datapack/data-types/expression). A bare variable reads the actor, the entity whose power fired the action, while the velocity itself is applied to the target. Use the `target_` prefix to read the entity being pushed:

```json
"bientity_action": {
    "type": "apoli:add_velocity",
    "y": "0.4 + (target_max_health / 40)"
}
```

## Homing and steering

`set: true` replaces the target's velocity outright, on the server and on every client tracking it, instead of adding to it. On its own that snaps the target onto the new heading in a single tick, which looks like a jolt on a projectile.

`blend` and `keep_speed` turn that into steering. `keep_speed` throws away the length of the computed vector and keeps whatever speed the target already had, so only the direction changes. `blend` moves that fraction of the way toward the new direction each tick. Together they give a homing projectile with a turn rate:

```json
"bientity_action": {
  "type": "apoli:add_velocity",
  "reference": "position",
  "z": 1,
  "set": true,
  "keep_speed": true,
  "blend": 0.15
}
```

Run from a `tick_bientity_action`, that curves the projectile 15% of the way toward its target every tick without changing how fast it flies. Raise `blend` for a tighter lock, and lower it for a wider arc.

> [!NOTE]
> With `reference: "position"` the action needs a direction from the actor to the target. When the two are in the same spot there is no direction to use, so the action leaves the velocity alone instead of zeroing it.
