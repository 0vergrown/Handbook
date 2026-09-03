---
title: "Add Velocity (Bi-Entity Action Type)"
description: "Adds or sets the velocity of the target entity, based on the direction from the actor entity to the target entity."
navigation_title: "Add Velocity"
---

Adds or sets the velocity of the target entity, based on the direction from the actor entity to the target entity.

Type ID: `apoli:add_velocity`

## Fields

| Field       | Type                                | Default      | Description                                                                                                                                         |
| ----------- | ----------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x`         | Float or [Expression](/docs/datapack/data-types/expression) | `0.0`        | The amount of velocity to add on the x-axis.                                                                                                        |
| `y`         | Float or [Expression](/docs/datapack/data-types/expression) | `0.0`        | The amount of velocity to add on the y-axis.                                                                                                        |
| `z`         | Float or [Expression](/docs/datapack/data-types/expression) | `0.0`        | The amount of velocity to add on the z-axis.                                                                                                        |
| `reference` | String   | `"position"` | Determines whether to use the target entity's `"position"` or `"rotation"` when calculating the velocity that will be applied to the target entity. Ignored when `space` is set. |
| `space`     | [Space](/docs/datapack/data-types/space) | *optional* | Interprets `x`/`y`/`z` in a fixed frame relative to the **actor** instead of the actor→target basis. `"world"` gives absolute axes, so the numbers you write are the velocity you get. |
| `set`       | Boolean | `false`      | If this is true, the action will act as a "set" velocity action, overriding the entity's current velocity instead of adding to it.                  |
| `blend`     | Float or [Expression](/docs/datapack/data-types/expression) | `1.0` | With `set`, how far to move from the target's current velocity toward the new one, `0.0`–`1.0`. `1.0` snaps; smaller values turn gradually. Ignored when `set` is `false`. |
| `keep_speed`| Boolean | `false`      | With `set`, rescale the result to the target's current speed, so the action changes direction only. Ignored when `set` is `false`.                   |
## Examples

```json
"bientity_action": {
    "type": "apoli:add_velocity",
    "z": -2
}
```
This example will "pull" the target entity to the actor entity.

```json
"bientity_action": {
    "type": "apoli:add_velocity",
    "space": "world",
    "y": 0.6
}
```

With `space` set, `x`/`y`/`z` are read in that frame rather than rotated into the actor→target basis. `"world"` is the one to reach for when a knockback keeps sending things to orbit: `0.6` up is exactly `0.6` up, whatever angle the target is at.

## Which entity the Expressions read

`x`, `y` and `z` are [Expressions](/docs/datapack/data-types/expression), and a bare variable reads the **actor** — the entity whose power fired the action — while the velocity itself is applied to the target. Use the `target_` prefix to read the entity being pushed:

```json
"bientity_action": {
    "type": "apoli:add_velocity",
    "y": "0.4 + (target_max_health / 40)"
}
```

## Homing and steering

`set: true` **replaces** the target's velocity outright — server-side and on every client tracking it — rather than adding to it. On its own that snaps the target onto the new heading in a single tick, which reads as a jolt on a projectile.

`blend` and `keep_speed` are what turn that into steering. `keep_speed` throws away the length of the computed vector and keeps whatever speed the target already had, so only the direction changes; `blend` moves that fraction of the way toward the new direction each tick. Together they are a homing projectile with a turn rate:

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

Run from a `tick_bientity_action`, that curves the projectile 15% of the way toward its target every tick without changing how fast it flies. Raise `blend` for a tighter lock, lower it for a wider arc.

> With `reference: "position"` the action needs a direction from the actor to the target. When the two are in the same spot there is no direction to use, and the action leaves the velocity alone rather than zeroing it.
