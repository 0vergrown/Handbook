---
title: "Projectile Homing (Data Type)"
description: "An Object that makes a projectile from apoli:fire_projectile seek out a nearby target and curve toward it."
navigation_title: "Projectile Homing"
---

An [Object](/docs/datapack/data-types/object) that makes a projectile look for a target ahead of it and curve toward it in flight. It goes in the `homing` field of [apoli:fire_projectile](/docs/datapack/powers/fire_projectile), as a power or as an [entity action](/docs/datapack/entity-actions/fire_projectile).

Only the projectile drawn from `texture_location` homes. A vanilla projectile fired with `entity_type` keeps its own behaviour and ignores `homing`.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`delay` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks the projectile flies straight before it starts looking for a target.
`duration` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks it keeps homing once `delay` is over. After that it lets go of its target and flies on in a straight line. `0` homes for the whole flight.
`range` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `8` | How far away, in blocks, a target can be picked up. A target it is already chasing is kept until it is half as far again away. `0` never finds one.
`angle` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `60` | How far to either side of its direction of travel, in degrees, the projectile looks. `180` looks all the way round, `20` only at what is nearly straight ahead.
`turn_rate` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `8` | The most the projectile turns in one tick, in degrees. It keeps its speed while it turns. `0` picks a target but never steers toward it.
`bientity_condition` | Bi-entity Condition | _optional_ | If specified, only entities that pass it are chased, with the owner as the actor and the candidate as the target.

The expressions are worked out once, when the projectile is fired, with the shooter as the entity.

## How it picks a target

- Only living entities that are alive and not spectating are considered, and the nearest one inside `range` and `angle` wins.
- It never chases the shooter, anyone on the shooter's team, or a tamed animal, minion or clone the shooter owns.
- It never chases an entity the projectile could not hit: the shot's own `bientity_condition` and `owner_bientity_condition` filter the search as well as the hit.
- Without a target it looks again every four ticks. It changes target when the one it has dies, leaves the dimension, moves out of reach or stops passing the conditions.
- The target is chosen on the server and sent to every client watching, which steer the projectile the same way, so the curve looks smooth without extra network traffic.
- A projectile that turns around with [return](/docs/datapack/data-types/projectile-return) stops homing for the rest of its flight.

## Examples

A slow, drifting orb that waits a quarter of a second, then chases anything in front of it for three seconds:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/entity/spirit_orb.png",
  "speed": 0.4,
  "divergence": 0,
  "max_distance": 16,
  "homing": {
    "delay": 5,
    "duration": 60,
    "range": 8,
    "angle": 70,
    "turn_rate": 10
  },
  "bientity_action_on_hit": {
    "type": "apoli:damage",
    "amount": 4,
    "damage_type": "minecraft:magic"
  }
}
```

A fast missile that only locks on to undead mobs, turns gently, and can overshoot a target that dodges:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/entity/missile.png",
  "speed": 1.8,
  "divergence": 0,
  "homing": {
    "range": 24,
    "angle": 30,
    "turn_rate": 4,
    "bientity_condition": {
      "type": "apoli:target_condition",
      "condition": {
        "type": "apoli:entity_group",
        "group": "undead"
      }
    }
  }
}
```

A high `turn_rate` on a slow projectile makes it circle in on its target like a wisp; a low `turn_rate` on a fast one makes it curve like a guided missile.
