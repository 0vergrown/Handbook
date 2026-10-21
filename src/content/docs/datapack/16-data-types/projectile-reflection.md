---
title: "Projectile Reflection (Data Type)"
description: "An object that makes a projectile from apoli:fire_projectile bounce off blocks, and optionally off the entities it hits."
navigation_title: "Projectile Reflection"
---

An [Object](/docs/datapack/data-types/object) that makes a projectile bounce off blocks instead of stopping on them, and off the entities it hits as well when `entities` is on. It goes in the `reflective` field of [apoli:fire_projectile](/docs/datapack/powers/fire_projectile), as a power or as an [entity action](/docs/datapack/entity-actions/fire_projectile).

`reflective` also takes a [Boolean](/docs/datapack/data-types/boolean): `true` bounces with the defaults below, and `false` doesn't bounce at all. Written that way, `max_bounces` and `bounce_speed` can sit next to it on the projectile itself and are read as the fields below.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `max_bounces` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `4` | How many times the projectile can bounce. The block hit after the last bounce ends the shot normally. `-1` bounces forever. |
| `speed` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | The fraction of its speed the projectile keeps after each bounce. `1.0` loses nothing, `0.6` is like a rubber ball, and values above `1` speed it up. `bounce_speed` is another name for it. |
| `entities` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Also bounces off the entities it hits. Bounces off blocks and off entities count against the same `max_bounces`. |

Both numbers are worked out at every bounce, with the owner as the entity, so a shot can bounce further or harder while its owner holds a resource.

## How it bounces

- The projectile's velocity is mirrored through the face it struck and scaled by `speed`. A bounce that would leave it almost still ends the shot instead.
- Without `entities`, hitting an entity isn't a bounce. A reflective projectile still hits the first entity it reaches, subject to `bientity_condition`, and stops there.
- With `entities`, the hit runs the shot's hit actions first, then the projectile glances off the side of the entity's hitbox it struck and flies on. It can't hit that entity again until it hits something else, bounces off a block or turns back, so it doesn't rattle around inside one target.
- On a projectile fired with `entity_type`, bouncing off an entity takes the place of the projectile's own impact, so an arrow that bounces off a zombie deals none of its arrow damage. Deal the damage in `bientity_action_on_hit` or `owner_target_bientity_action_on_hit`.
- Every bounce off a block runs `block_action_on_hit` (and checks `block_condition`) and then `bientity_action_on_bounce`. A bounce off an entity runs `bientity_action_on_bounce` after the hit actions.
- With [`pierce`](/docs/datapack/powers/fire_projectile#passing-through) as well, the projectile bounces off entities while it has bounces left and passes through them after that.
- `bientity_action_on_miss` waits until the projectile stops for good, so it runs once, on the hit that ends the shot.
- A projectile with a [return](/docs/datapack/data-types/projectile-return) uses up its bounces first, and the block hit after the last one turns it around.

## Examples

A ricochet shot that bounces up to three times and loses a little speed each time:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/entity/ricochet.png",
  "speed": 1.6,
  "divergence": 0,
  "reflective": {
    "max_bounces": 3,
    "speed": 0.8
  },
  "bientity_action_on_hit": {
    "type": "apoli:damage",
    "amount": 4,
    "damage_type": "minecraft:arrow"
  }
}
```

A bouncing orb that ricochets forever and relies on `max_distance` to end the shot:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/entity/bouncy_orb.png",
  "speed": 1.0,
  "reflective": {
    "max_bounces": -1
  },
  "max_distance": 48
}
```

A disc that ricochets from one enemy to the next, four times, before it falls:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/entity/disc.png",
  "speed": 1.1,
  "divergence": 0,
  "max_distance": 30,
  "reflective": {
    "max_bounces": 4,
    "entities": true
  },
  "homing": {
    "range": 8,
    "angle": 80,
    "turn_rate": 12
  },
  "owner_target_bientity_action_on_hit": {
    "type": "apoli:damage",
    "amount": 4,
    "damage_type": "minecraft:thrown"
  }
}
```

After each bounce, the enemy it just hit is ruled out, so `homing` picks the next one in front of it.

> [!WARNING]
> A `speed` above `1.0` compounds. At `1.3`, a projectile travels nearly four times its launch speed after six bounces, which is fast enough to tunnel through a one-block wall between ticks. Pair it with a low `max_bounces`.
