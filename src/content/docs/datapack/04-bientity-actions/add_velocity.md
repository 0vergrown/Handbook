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
