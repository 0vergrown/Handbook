---
title: "Modify Velocity (Power Type)"
description: "Changes the entity's velocity along the axes you choose."
navigation_title: "Modify Velocity"
---

Changes all of the entity's velocity along the axes you choose.

Type ID: `apoli:modify_velocity`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `axes` | [Array](/docs/datapack/data-types/array) of [Strings](/docs/datapack/data-types/string) | `["x","y","z"]` | The axes the modifiers apply to. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the velocity along those axes. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the velocity along those axes. |

## How the operations act

Every tick the modifiers change how far the entity moves along the chosen axes, and two kinds of operation behave differently.

The limit operations, `min_base`, `max_base`, `set_base`, `min_total`, `max_total` and `set_total`, also hold the entity's stored velocity to the limit, so gravity can't build up behind it. A `min_base` of `-0.1` on `y` is a terminal velocity: the entity never falls faster than 0.1 blocks per tick, and when the power stops it carries on from that speed.

Every other operation (`add_*`, `multiply_*`) only scales or shifts the step taken that tick. The entity's own velocity keeps following normal physics underneath, which is why the reversed velocity example below falls upwards faster and faster.

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

This makes the entity drift down no faster than 0.1 blocks per tick. Fall distance still counts every block fallen, so add [apoli:modify_falling](/docs/datapack/powers/modify_falling) with `take_fall_damage: false` if the landing shouldn't hurt.

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

This reverses all of the player's velocity, so they fall upwards and their movement keys work backwards.
