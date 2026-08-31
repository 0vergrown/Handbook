---
title: "Spawn Particles (Entity Action Type)"
description: "Spawns particles on the body of the entity that has the power for visual effects."
navigation_title: "Spawn Particles"
---

Spawns particles on the body of the entity that has the power for visual effects.

Type ID: `apoli:spawn_particles`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`particle` | [Particle Effect](/docs/datapack/data-types/particle-effect) | | The particle type that will be spawned. Use [`apoli:custom`](/docs/datapack/data-types/custom-particle) for a particle built from your own texture.
`bientity_condition` | Bi-entity Condition Type | *optional* | If specified, the particle will only be visible if this bi-entity condition is fulfilled by either or both the entity that has the power and the entity looking at the entity that has the power.
`count` | Integer | | How much of the specified particle type will be spawned.
`speed` | [Float](/docs/datapack/data-types/float), [Expression](/docs/datapack/data-types/expression) or [Vector](/docs/datapack/data-types/vector) | `0.0` | A number is vanilla's random speed multiplier — every particle flies off in a random direction at up to that speed. A **vector** instead gives every particle that exact velocity, which is the version you want when the particles should go somewhere. Read through `space`.
`velocity_x`, `velocity_y`, `velocity_z` | [Float](/docs/datapack/data-types/float) | `0` | The same explicit velocity, written per axis. Takes priority over a vector `speed`. Read through `space`.
`space` | [Space](/docs/datapack/data-types/space) | `world` | How `offset_*` and the velocity are read. `world` uses the world axes; `local` is relative to the entity's facing, so `offset_z: 2` is two blocks in front of them and `velocity_z: 0.5` fires the particles the way they are looking.
`model_part` | [String](/docs/datapack/data-types/string) | _optional_ | Anchor the particles to a body part instead of the entity's feet: `head`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg`. The same names [`apoli:model_color`](/docs/datapack/powers/model_color) and [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) use. `offset_*` is then measured from that part.
`force` | Boolean | `false` | If set to `true`, the specified particle type that will be spawned can be seen from a far distance.
`spread` | Vector | `{"x": 0.5, "y": 0.5, "z": 0.5}` | Determines the size of the three-dimensional cuboid volume to spawn the specified particle type in.
`offset_x` | Float | `0.0` | The offset of where the particle will be centered in the X axis.
`offset_y` | Float | `0.5` | The offset of where the particle will be centered in the Y axis.
`offset_z` | Float | `0.0` | The offset of where the particle will be centered in the Z axis.

### Aiming particles

Without a velocity, `offset_*` is measured along the **world** axes, which is why `offset_z: 10`
puts the particles ten blocks due south rather than ten blocks in front of the player. Set
`space: "local"` and both the offset and the velocity turn with the entity:

```json
{
  "type": "apoli:spawn_particles",
  "particle": {"type": "apoli:custom", "texture": "example:textures/particle/spark.png"},
  "count": 12,
  "space": "local",
  "offset_y": 1.4,
  "offset_z": 1.5,
  "velocity_z": 0.6,
  "spread": {"x": 0.15, "y": 0.15, "z": 0.05}
}
```

That is a cone of sparks a block and a half in front of the entity's eyes, travelling the way they
are facing. `spread` still scatters the **spawn positions**; the velocity is the same for all of them.

> An explicit velocity is sent as one packet per particle, because the vanilla particle packet can
> only carry a direction when its count is zero. Apoli caps that at 64 packets per call — keep
> `count` modest on a directed burst, and use the scalar `speed` for large ambient clouds.

### Particles on a body part

`model_part` moves the anchor point to a limb, so `right_arm` puts the particles at the entity's
hand and `head` at its eyes. The anchor follows the entity's body rotation, its size and its
crouching pose; it does **not** follow swing or walk animations, so it is a place on the body rather
than a point on the animated bone.

```json
{
  "type": "apoli:spawn_particles",
  "particle": "minecraft:flame",
  "count": 6,
  "model_part": "right_arm",
  "space": "local",
  "velocity_y": 0.1
}
```

## Examples

```json
"entity_action": {
    "type": "apoli:spawn_particles",
    "particle": {
        "type": "minecraft:block",
        "block_state": {
            "Name": "minecraft:redstone_block"
        }
    },
    "count": 16,
    "speed": 0.0,
    "force": true,
    "spread": {
        "x": 3.0,
        "y": 0.0,
        "z": 3.0
    }
}
```

This example will spawn a particle cuboid that is about 5x0x5 in size that will use the Redstone Block texture.
