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
`speed` | [Float](/docs/datapack/data-types/float), [Expression](/docs/datapack/data-types/expression) or [Vector](/docs/datapack/data-types/vector) | `0.0` | A number is vanilla's random speed multiplier — every particle flies off in a random direction at up to that speed. A **vector** instead gives every particle that exact velocity, which is the version you want when the particles should go somewhere. Read through `space`.
`velocity_x`, `velocity_y`, `velocity_z` | [Float](/docs/datapack/data-types/float) | `0` | The same explicit velocity, written per axis. Takes priority over a vector `speed`. Read through `space`.
`space` | [Space](/docs/datapack/data-types/space) | `world` | How `offset_*` and the velocity are read. `world` uses the world axes; `local` is relative to the entity's facing, so `offset_z: 2` is two blocks in front of them and `velocity_z: 0.5` fires the particles the way they are looking. With `model_part` set and no `space` written, both are read in the **part's own frame** instead — see below.
`model_part` | [String](/docs/datapack/data-types/string) | _optional_ | Anchor the particles to a body part instead of the entity's feet, and read `offset_*` and the velocity along that part. See [Particles on a body part](#particles-on-a-body-part) for the names.
`force` | Boolean | `false` | Determines whether to display the emitted particles within 512 blocks (`true`) or 32 blocks (`false`).
`spread` | Vector | `{"x": 0.5, "y": 0.5, "z": 0.5}` | Determines the size of the three-dimensional cuboid volume to spawn the specified particle type in.
`offset_x` | Float | `0.0` | The offset of where the particle will be centered in the X axis.
`offset_y` | Float | `0.5` | The offset of where the particle will be centered in the Y axis.
`offset_z` | Float | `0.0` | The offset of where the particle will be centered in the Z axis.
`frequency` | Integer | | Determines how often the particles should spawn (interval in ticks).
`visible_in_first_person` | Boolean | `false` | Whether the holder sees their own particles while in first person. Other viewers are unaffected, and the holder still sees them in third person.
`visible_while_invisible` | Boolean | `false` | Determines whether the particle type should be visible if the entity is invisible.

### Aiming particles

Without a velocity, `offset_*` is measured along the **world** axes, which is why `offset_z: 10`
puts the particles ten blocks due south rather than ten blocks in front of the player. Set
`space: "local"` and both the offset and the velocity turn with the entity:

```json
{
  "type": "apoli:particle",
  "particle": {"type": "apoli:custom", "texture": "example:textures/particle/spark.png"},
  "count": 12,
  "frequency": 2,
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

`model_part` moves the anchor point onto a limb and reads `offset_*` and the velocity **in that
limb's frame**, so the particles follow the part as it moves.

The axes are measured from the anchor: `+y` runs back along the part towards its pivot, `+z` out of
the part's front and `+x` out of its left. A **negative** `offset_y` from a hand or foot anchor
therefore carries on past the fingertips or toes, whichever way the limb happens to be pointing —
that is the one you want for "just in front of the hand".

Anchor | Where it sits
-------|---------------
`head`, `hat` | the neck pivot, at eye level
`body` | the top of the torso
`right_arm`, `left_arm` | the shoulder
`right_hand`, `left_hand`, `main_hand`, `off_hand` | the end of that arm, where a held item is
`right_leg`, `left_leg` | the hip
`right_foot`, `left_foot` | the end of that leg

`head` through `left_leg` are the same names [`apoli:model_color`](/docs/datapack/powers/model_color)
and [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) use; the hand and foot
anchors are extras that only this field understands.

The anchor tracks the pose the entity is actually in — walking and attack swings, crouching, riding,
swimming, gliding — and the rotations, pivots and scales that
[`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) applies on top of them. Raise
an arm with a `modify_model_parts` power and a particle anchored to `right_hand` rises with it.

```json
{
  "type": "apoli:particle",
  "particle": "minecraft:flame",
  "count": 6,
  "frequency": 4,
  "model_part": "main_hand",
  "offset_x": 0,
  "offset_y": -0.25,
  "offset_z": 0,
  "spread": {"x": 0.05, "y": 0.05, "z": 0.05},
  "velocity_y": -0.15
}
```

Flames a quarter of a block past the fingertips, drifting further out — and they stay past the
fingertips when the arm swings, or when a `modify_model_parts` power raises it.

> Writing `space` explicitly opts back out: the anchor still moves to the part, but `offset_*` and
> the velocity are then read in that space (`world` axes, the entity's facing, its velocity) rather
> than along the limb.

## Examples

```json
{
  	"type": "apoli:particle",
  	"particle": "minecraft:portal",
  	"frequency": 4
}
```

This example will continuously spawn portal particles on the entity that has the power.
