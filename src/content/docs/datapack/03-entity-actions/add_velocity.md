---
title: "Add Velocity (Entity Action Type)"
description: "Adds or sets velocity towards a specific direction."
navigation_title: "Add Velocity"
---

Adds or sets velocity towards a specific direction.

Type ID: `apoli:add_velocity`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`x` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | The amount of velocity to add on the x-axis.
`y` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | The amount of velocity to add on the y-axis.
`z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | The amount of velocity to add on the z-axis.
`space` | [Space](/docs/datapack/data-types/space) | `"world"` | Determines how the direction of the velocity to add/set will be calculated.
`set` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If this is true, the action will act as a "set" velocity action, overriding the entity's current velocity instead of adding to it.

## Examples

```json
"entity_action": {
    "type": "apoli:add_velocity",
    "y": 2
}
```

This example will add velocity to the entity's positive Y axis, essentially launching the entity up in the air.

```json
"entity_action": {
    "type": "apoli:add_velocity",
    "space": "local",
    "z": "health * 0.5"
}
```

This example launches the entity forward with a strength scaled by its current health — 10 blocks/tick of velocity at full health (20 × 0.5), less as it gets hurt. Expressions are evaluated against the entity the velocity is applied to; see [Expression](/docs/datapack/data-types/expression) for the variable list.
