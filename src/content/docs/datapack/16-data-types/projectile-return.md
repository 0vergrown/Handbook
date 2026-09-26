---
title: "Projectile Return (Data Type)"
description: "An Object that makes a projectile from apoli:fire_projectile fly back to whoever fired it, like a trident with Loyalty."
navigation_title: "Projectile Return"
---

An [Object](/docs/datapack/data-types/object) that makes a projectile turn around and fly back to whoever fired it, the way a trident with Loyalty does. It goes in the `return` field of [apoli:fire_projectile](/docs/datapack/powers/fire_projectile), as a power or as an [entity action](/docs/datapack/entity-actions/fire_projectile).

Only the projectile drawn from `texture_location` comes back. A vanilla projectile fired with `entity_type` keeps its own behaviour and ignores `return`.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`on_hit_entity` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Come back after hitting an entity. When `false`, an entity hit ends the shot as usual.
`on_hit_block` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Come back after hitting a block. The projectile stops at the surface and starts back from there.
`after` | [Integer](/docs/datapack/data-types/integer) | `0` | Come back on its own after this many ticks in the air, hit or not. `0` never does.
`speed` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `2` | How strongly it is pulled back, on the same scale as Loyalty levels: `1` returns like Loyalty I, `3` like Loyalty III. Worked out when it turns around, with the owner as the entity. `0` or less means it does not come back this time.
`hit_while_returning` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether it can hit entities on the way back. Each hit runs the shot's usual hit actions. It never hits its owner, or the entity it hit last.
`bientity_action_on_return` | Bi-entity Action | _optional_ | Runs when it turns around, with the owner as the actor and the projectile as the target.
`bientity_action_on_catch` | Bi-entity Action | _optional_ | Runs when it reaches the owner, just before it disappears. Same actor and target.

## How it comes back

- Reaching `max_distance` turns the projectile around instead of removing it, so `max_distance` is also how far a boomerang flies before it swings back.
- On the way back it flies through blocks, ignores gravity and is pulled toward the owner's eyes every tick, curving round rather than snapping back. It disappears once it reaches them.
- A [reflective](/docs/datapack/powers/fire_projectile#bouncing-off-walls) projectile uses up its bounces first. The block hit after its last bounce turns it around, as long as `on_hit_block` is `true`.
- It is removed without being caught if the owner dies, leaves, changes dimension or switches to spectator.
- The pull is worked out on the server and on every client watching, so it looks smooth without extra network traffic.

## Examples

A boomerang that flies 12 blocks, comes back whether or not it hits anything, and is ready to throw again the moment it is caught:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "held_item",
  "cooldown": 200,
  "speed": 1.2,
  "divergence": 0,
  "max_distance": 12,
  "bientity_action_on_hit": {
    "type": "apoli:damage",
    "amount": 5,
    "damage_type": "minecraft:thrown"
  },
  "return": {
    "speed": 2,
    "bientity_action_on_catch": {
      "type": "apoli:actor_action",
      "action": {
        "type": "apoli:modify_resource",
        "resource": "*:*",
        "modifier": {
          "operation": "set_base",
          "value": 0
        }
      }
    }
  }
}
```

The long `cooldown` stops a second throw while the first is still out; catching it sets the power's remaining cooldown back to `0`. `*:*` is this power's own id — see [Identifier](/docs/datapack/data-types/identifier).

A chakram that turns back the moment it hits something, or after a second in the air if it hits nothing, and can strike again on the way home:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/entity/chakram.png",
  "speed": 1.5,
  "divergence": 0,
  "bientity_action_on_hit": {
    "type": "apoli:damage",
    "amount": 4,
    "damage_type": "minecraft:thrown"
  },
  "return": {
    "after": 20,
    "hit_while_returning": true
  }
}
```

Set `on_hit_entity` to `false` for a shot that only comes back when it misses: an entity hit then ends it where it lands, and `after` or `max_distance` bring back the throws that found nothing.
