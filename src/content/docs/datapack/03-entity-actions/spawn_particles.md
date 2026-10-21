---
title: "Spawn Particles (Entity Action Type)"
description: "Spawns a burst of particles on the entity, optionally anchored to a body part."
navigation_title: "Spawn Particles"
---

Spawns a burst of particles on the body of the entity, each time the action runs.

Type ID: `apoli:spawn_particles`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `particle` | [Particle Effect](/docs/datapack/data-types/particle-effect) | _required_ | The particle type to spawn. Use [`apoli:custom`](/docs/datapack/data-types/custom-particle) for a particle built from your own texture. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, a viewer only sees the particles when this condition passes. The actor is the entity the action runs on and the target is the player looking at it. |
| `count` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _required_ | How many particles to spawn. |
| `speed` | [Float](/docs/datapack/data-types/float), [Expression](/docs/datapack/data-types/expression) or [Vector](/docs/datapack/data-types/vector) | `0.0` | A number is vanilla's random speed multiplier: every particle flies off in a random direction at up to that speed. A vector gives every particle that exact velocity instead, which is what you want when the particles should travel somewhere. Read through `space`. |
| `velocity_x`, `velocity_y`, `velocity_z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | The same explicit velocity, written per axis. Takes priority over a vector `speed`. Read through `space`. |
| `space` | [Space](/docs/datapack/data-types/space) | `world` | How `offset_*`, `spread` and the velocity are read. `world` uses the world axes. `local` is relative to the entity's facing, so `offset_z: 2` is two blocks in front of it and `velocity_z: 0.5` sends the particles the way it is looking. With `model_part` set and no `space` written, they are all read in the part's own frame instead (see below). |
| `model_part` | [Body Part](/docs/datapack/data-types/body-part) | _optional_ | Anchors the particles to a body part instead of the entity's feet, and reads `offset_*` and the velocity along that part. See [Particles on a body part](#particles-on-a-body-part) for the names. |
| `force` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, the particles can be seen from far away. |
| `spread` | [Float](/docs/datapack/data-types/float), [Vector](/docs/datapack/data-types/vector) or [Expression](/docs/datapack/data-types/expression) | `{"x": 0.5, "y": 0.5, "z": 0.5}` | The size of the volume the particles scatter through. A single number applies to all three axes, and a vector sets each axis. Every component can be an expression. It is read through `space` like the offset, so `space: "local"` with `{"x": 0, "y": 0, "z": 3}` draws a line running away from the entity's face instead of along world south. |
| `offset_x` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | Where the particles are centered on the X axis, relative to the anchor. |
| `offset_y` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.5` | Where the particles are centered on the Y axis, relative to the anchor. |
| `offset_z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | Where the particles are centered on the Z axis, relative to the anchor. |

### Aiming particles

By default `offset_*` is measured along the world axes, which is why `offset_z: 10` puts the particles ten blocks due south instead of ten blocks in front of the player. Set `space: "local"` and both the offset and the velocity turn with the entity:

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

That sends sparks out from a block and a half in front of the entity's eyes, travelling the way it is facing. `spread` scatters the spawn positions and every particle gets the same velocity, so the cloud takes the shape of the spread. With `space` set, a spread of `{"x": 0, "y": 0, "z": 3}` is a line pointing where the entity looks, and `{"x": 3, "y": 0, "z": 0}` is a line across its shoulders.

> [!WARNING]
> An explicit velocity is sent as one packet per particle, because the vanilla particle packet can only carry a direction when its count is zero. Apoli caps that at 64 packets per call. Keep `count` modest on a directed burst, and use the scalar `speed` for large ambient clouds.

### Particles on a body part

`model_part` moves the anchor onto a limb and reads `offset_*` and the velocity in that limb's frame, so the particles come off the part in the direction it is pointing.

The axes are measured from the anchor: `+y` runs back along the part towards its pivot, `+z` out of the part's front and `+x` out of its left. A negative `offset_y` from a hand or foot anchor carries on past the fingertips or toes, whichever way the limb is pointing, so use that for particles just past the hand.

| Anchor | Where it sits |
| --- | --- |
| `head`, `hat` | the neck pivot, at eye level |
| `body` | the top of the torso |
| `chest` | the front of the chest |
| `back` | the middle of the back |
| `right_arm`, `left_arm` | the shoulder |
| `right_hand`, `left_hand`, `main_hand`, `off_hand` | the end of that arm, where a held item is |
| `right_leg`, `left_leg` | the hip |
| `right_foot`, `left_foot` | the end of that leg |
| `arms` | halfway between the shoulders |
| `hands` | halfway between the hands |
| `legs` | halfway between the hips |
| `feet` | halfway between the feet |
| `achilles_heel` | halfway between the backs of the heels |
| `upper` | the waist |
| `lower` | the neck |
| `whole` | the feet, on the ground |

These are the [body part](/docs/datapack/data-types/body-part) names every other body part field uses. An anchor that sits between two limbs (the groups, `hands`, `feet` and `achilles_heel`) has no single limb to follow, so its axes are the entity's own: `+y` up, `+z` forward and `+x` to its left.

The anchor follows the pose the entity is in (walking and attack swings, crouching, riding, swimming, gliding) and the rotations, pivots and scales that [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) applies on top of it. Fire this action from an [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) that also raises the arm, and the burst leaves the raised hand.

Each player's game places the particles on the part where it draws that part for them, at the moment they arrive, so the anchor follows a `modify_model_parts` keyframe animation frame by frame instead of lagging behind or jumping ahead of it. Poses that other mods put on the player model, such as a Better Combat swing, an Iron's Spells casting pose or anything built on playerAnimator, are followed too while the particles keep coming. The first burst for an entity sits where Minecraft and Apoli alone pose the part.

In first person, the holder sees particles anchored to an arm or hand at the hand on their own screen: the bare hand, or where the held item is gripped. Everyone else sees them on the body.

```json
"entity_action": {
  "type": "apoli:spawn_particles",
  "particle": "minecraft:flame",
  "count": 12,
  "model_part": "main_hand",
  "offset_y": -0.25,
  "spread": {"x": 0.05, "y": 0.05, "z": 0.05},
  "velocity_y": -0.4
}
```

> [!NOTE]
> Writing `space` explicitly opts back out. The anchor still moves to the part, but `offset_*` and the velocity are then read in that space (the world axes, the entity's facing or its velocity) instead of along the limb.

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

This spawns redstone block particles across a flat area about 5×0×5 blocks in size, visible from far away.
