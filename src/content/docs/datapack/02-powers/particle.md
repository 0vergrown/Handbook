---
title: "Particle (Power Type)"
description: "Spawns particles on the body of the entity that has the power for visual effects."
navigation_title: "Particle"
---

Spawns particles on the body of the entity that has the power for visual effects.

Type ID: `apoli:particle`

> Apoli spawns these particles **server-side**, once per viewer, so `bientity_condition` is evaluated on the server and every condition type works there. The power's own `condition` field is honoured as well: while it is false, no particles spawn. Both are checked once per `frequency` interval, so neither costs anything per tick.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`particle` | [Particle Effect](/docs/datapack/data-types/particle-effect) | | The particle type that will be spawned. Use [`apoli:custom`](/docs/datapack/data-types/custom-particle) for a particle built from your own texture.
`bientity_condition` | Bi-entity Condition Type | *optional* | If specified, the particle will only be visible if this bi-entity condition is fulfilled by either or both the entity that has the power and the entity looking at the entity that has the power.
`count` | Integer | `1` | Determines the amount of particles to spawn.
`speed` | Float | `0.0` | Determines the speed of the specified particle type.
`force` | Boolean | `false` | Determines whether to display the emitted particles within 512 blocks (`true`) or 32 blocks (`false`).
`spread` | Vector | `{"x": 0.5, "y": 0.5, "z": 0.5}` | Determines the size of the three-dimensional cuboid volume to spawn the specified particle type in.
`offset_x` | Float | `0.0` | The offset of where the particle will be centered in the X axis.
`offset_y` | Float | `0.5` | The offset of where the particle will be centered in the Y axis.
`offset_z` | Float | `0.0` | The offset of where the particle will be centered in the Z axis.
`frequency` | Integer | | Determines how often the particles should spawn (interval in ticks).
`visible_in_first_person` | Boolean | `false` | Whether the holder sees their own particles while in first person. Other viewers are unaffected, and the holder still sees them in third person.
`visible_while_invisible` | Boolean | `false` | Determines whether the particle type should be visible if the entity is invisible.

## Examples

```json
{
  	"type": "apoli:particle",
  	"particle": "minecraft:portal",
  	"frequency": 4
}
```

This example will continuously spawn portal particles on the entity that has the power.
