---
title: "Projectile Reflection (Data Type)"
description: "An Object that makes a projectile from apoli:fire_projectile bounce off blocks instead of stopping on them."
navigation_title: "Projectile Reflection"
---

An [Object](/docs/datapack/data-types/object) that makes a projectile bounce off blocks instead of stopping on them. It goes in the `reflective` field of [apoli:fire_projectile](/docs/datapack/powers/fire_projectile), as a power or as an [entity action](/docs/datapack/entity-actions/fire_projectile).

`reflective` also takes a [Boolean](/docs/datapack/data-types/boolean): `true` bounces with the defaults below, `false` does not bounce at all. Written that way, `max_bounces` and `bounce_speed` can sit next to it on the projectile itself and are read as the fields below.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`max_bounces` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `4` | How many times the projectile may bounce. The block hit after the last bounce ends the shot normally. `-1` bounces forever.
`speed` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | The fraction of its speed the projectile keeps after each bounce. `1.0` loses nothing, `0.6` is a rubber ball, values above `1` speed it up. `bounce_speed` is another name for it.

Both are worked out at every bounce, with the owner as the entity, so a shot can bounce further or harder while its owner holds a resource.

## How it bounces

- The projectile's velocity is mirrored through the face it struck and scaled by `speed`. A bounce that would leave it almost still ends the shot instead.
- Entity hits are unaffected: a reflective projectile still hits the first entity it reaches, subject to `bientity_condition`.
- Every bounce runs `block_action_on_hit` (honouring `block_condition`) and then `bientity_action_on_bounce`.
- `bientity_action_on_miss` waits until the projectile actually stops, so it runs once, on the hit that ends the shot.
- A projectile with a [return](/docs/datapack/data-types/projectile-return) uses up its bounces first; the block hit after the last one turns it around.

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

> A `speed` above `1.0` compounds — at `1.3` a projectile is travelling nearly four times its launch speed after six bounces, fast enough to tunnel through a one-block wall between ticks. Pair it with a low `max_bounces`.
