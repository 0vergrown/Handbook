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
| `x`         | Float     | `0.0`        | The amount of velocity to add on the x-axis.                                                                                                        |
| `y`         | Float     | `0.0`        | The amount of velocity to add on the y-axis.                                                                                                        |
| `z`         | Float     | `0.0`        | The amount of velocity to add on the z-axis.                                                                                                        |
| `reference` | String   | `"position"` | Determines whether to use the target entity's `"position"` or `"rotation"` when calculating the velocity that will be applied to the target entity. |
| `set`       | Boolean | `false`      | If this is true, the action will act as a "set" velocity action, overriding the entity's current velocity instead of adding to it.                  |
## Examples

```json
"bientity_action": {
    "type": "apoli:add_velocity",
    "z": -2
}
```
This example will "pull" the target entity to the actor entity.
