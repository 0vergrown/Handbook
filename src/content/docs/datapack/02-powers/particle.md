---
title: "origins:particle"
description: "[Power Type](../powertypes.md)"
---

Power Type

Spawns particles on the body of the entity that has the power for visual effects.

Type ID: `origins:particle`


> Unlike the original Apoli, this re-implementation spawns the particles **server-side** (via `sendParticles` per viewer), so the `bientity_condition` is evaluated on the server and every condition type works. The power-level `condition` field is also honored: while the condition is false, no particles spawn (fixed July 2026; the condition is checked once per `frequency` interval, so it adds no per-tick cost).


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`particle` | Particle Effect | | The particle type that will be spawned.
`bientity_condition` | Bi-entity Condition Type | *optional* | If specified, the particle will only be visible if this bi-entity condition is fulfilled by either or both the entity that has the power and the entity looking at the entity that has the power.
`count` | Integer | `1` | Determines the amount of particles to spawn.
`speed` | Float | `0.0` | Determines the speed of the specified particle type.
`force` | Boolean | `false` | Determines whether to display the emitted particles within 512 blocks (`true`) or 32 blocks (`false`).
`spread` | Vector | `{"x": 0.5, "y": 0.5, "z": 0.5}` | Determines the size of the three-dimensional cuboid volume to spawn the specified particle type in.
`offset_x` | Float | `0.0` | The offset of where the particle will be centered in the X axis.
`offset_y` | Float | `0.5` | The offset of where the particle will be centered in the Y axis.
`offset_z` | Float | `0.0` | The offset of where the particle will be centered in the Z axis.
`frequency` | Integer | | Determines how often the particles should spawn (interval in ticks).
`visible_in_first_person` | Boolean | `false` | Determines whether the particle type should be visible in first person.
`visible_while_invisible` | Boolean | `false` | Determines whether the particle type should be visible if the entity is invisible.


## Examples

```json
{
  	"type": "origins:particle",
  	"particle": "minecraft:portal",
  	"frequency": 4
}
```

This example will continuously spawn portal particles on the entity that has the power.

