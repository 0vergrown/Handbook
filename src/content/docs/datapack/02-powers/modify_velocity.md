---
title: "Modify Velocity (Power Type)"
description: "Modifies all velocity in a specified axis."
navigation_title: "Modify Velocity"
---

Modifies all velocity in a specified axis.

Type ID: `apoli:modify_velocity`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`axes` | Array of Identifiers| `["x","y","z"]` | Used to specify the axes affected by this modifier. 
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will apply to velocity in the specified axes.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will apply to the specified axes.

## How the operations act

Every tick the modifiers change how far the entity moves along the chosen axes. Two kinds of operation behave differently:

- **Limits** — `min_base`, `max_base`, `set_base`, `min_total`, `max_total` and `set_total` — also hold the entity's stored velocity to the limit, so gravity cannot build up behind it. A `min_base` of `-0.1` on `y` is a terminal velocity: the entity never falls faster than 0.1 blocks per tick, and when the power stops it carries on from that speed.
- **Everything else** (`add_*`, `multiply_*`) only scales or shifts the step taken that tick. The entity's own velocity keeps following normal physics underneath, which is why the reversed-velocity example below falls upwards faster and faster.

## Examples

```json
{
  "type": "apoli:modify_velocity",
  "axes": [
    "y"
  ],
  "modifier": {
    "operation": "min_base",
    "value": -0.1
  }
}
```

This example makes the entity drift down no faster than 0.1 blocks per tick. Fall distance still counts every block fallen, so add [apoli:modify_falling](/docs/datapack/powers/modify_falling) with `take_fall_damage: false` if the landing should not hurt.

```json
{
  "type": "apoli:modify_velocity",
  "modifier": {
    "value": -2,
    "operation": "multiply_total"
  },
  "axes": [
    "x",
    "y",
    "z"
  ]
}
```

This example will make all of the player's velocity reversed. You'll fall upwards, your movement keys will be inverted, etc.
