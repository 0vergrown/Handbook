---
title: "Add Velocity (Entity Action Type)"
description: "Adds velocity to the entity in a direction, or sets its velocity outright."
navigation_title: "Add Velocity"
---

Adds velocity to the entity in a direction, or replaces its velocity with `set`.

Type ID: `apoli:add_velocity`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `x` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | Velocity to add on the X axis. |
| `y` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | Velocity to add on the Y axis. |
| `z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | Velocity to add on the Z axis. |
| `space` | [Space](/docs/datapack/data-types/space) | `"world"` | How the direction of the velocity is worked out. |
| `set` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, the velocity replaces the entity's current velocity instead of adding to it. |

## Examples

```json
"entity_action": {
    "type": "apoli:add_velocity",
    "y": 2
}
```

This adds upward velocity, launching the entity into the air.

```json
"entity_action": {
    "type": "apoli:add_velocity",
    "space": "local",
    "z": "health * 0.5"
}
```

This launches the entity forward with a strength that follows its current health: 10 blocks per tick at full health (20 × 0.5), and less as it gets hurt. Expressions are evaluated against the entity the velocity is applied to. See [Expression](/docs/datapack/data-types/expression) for the variables.
