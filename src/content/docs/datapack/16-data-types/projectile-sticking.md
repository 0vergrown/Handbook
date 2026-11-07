---
title: "Projectile Sticking (Data Type)"
description: "An object that makes a projectile from apoli:fire_projectile stick in the block it hits, like an arrow."
navigation_title: "Projectile Sticking"
---

An [Object](/docs/datapack/data-types/object) that makes a projectile stop in the block it hits and stay there, the way an arrow sticks in a wall. It goes in the `sticky` field of [apoli:fire_projectile](/docs/datapack/powers/fire_projectile), as a power or as an [entity action](/docs/datapack/entity-actions/fire_projectile). `"sticky": true` sticks with the defaults below.

Only a projectile drawn from `texture_location` sticks. A vanilla projectile fired with `entity_type` keeps its own behaviour and ignores `sticky`.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1200` | Ticks the projectile stays stuck before it expires. It then runs `bientity_action_on_expire` and is removed, the same as when `lifetime` runs out. `0` keeps it stuck until something else ends it. |
| `depth` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | How far the projectile sinks past the point it hit, in blocks, along its direction of flight. `0` leaves its centre on the face of the block, and a negative value holds it off the surface. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Only blocks that pass this hold the projectile. On any other block the shot ends as usual. |
| `bientity_action_on_stick` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs each time the projectile sticks, with the owner as the actor and the projectile as the target. |

`duration` and `depth` are worked out when the projectile sticks, with the owner as the entity.

## How it behaves

- The hit still counts as a block hit. `block_action_on_hit` and `bientity_action_on_miss` run first, then the projectile sticks, keeping the angle it flew in at.
- A stuck projectile doesn't move, hit entities or home. `tick_bientity_action` keeps running every tick, so it can still act on whatever comes near it.
- `lifetime` keeps counting while the projectile is stuck, so whichever runs out first, `lifetime` or `duration`, removes it.
- With [reflective](/docs/datapack/data-types/projectile-reflection) set, the projectile bounces while it has bounces left and sticks to the next block it hits after that.
- With [return](/docs/datapack/data-types/projectile-return) set, it sticks instead of turning around on a block hit. Its `after` timer keeps running, and when it is up the projectile pulls itself out and flies back to its owner.
- When the block holding it breaks or loses its collision box, the projectile falls with normal gravity, even if its `tag` gave it `NoGravity`, and sticks again where it lands. Each new stick runs `bientity_action_on_stick` again and restarts `duration`.
- A stuck projectile is removed when its chunk loads again after being unloaded, because nothing drives it once the power that fired it is gone.

## Examples

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/entity/sticky_bomb.png",
  "speed": 1.0,
  "divergence": 0,
  "lifetime": 200,
  "sticky": {
    "duration": 60,
    "bientity_action_on_stick": {
      "type": "apoli:target_action",
      "action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:block.slime_block.place"
      }
    }
  },
  "bientity_action_on_expire": {
    "type": "apoli:explode",
    "power": 3,
    "at_target": true,
    "damage_self": false,
    "destruction_type": "none"
  }
}
```

A sticky bomb that clings to the first block it hits and explodes three seconds later, or when its `lifetime` runs out if it never lands. The blast runs with the owner as the actor, so its kills are credited to whoever threw it.

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/projectile/blank.png",
  "speed": 2.2,
  "divergence": 0,
  "sticky": {
    "depth": 0.3,
    "block_condition": {
      "type": "apoli:in_tag",
      "tag": "minecraft:logs"
    }
  },
  "projectile_action": {
    "type": "apoli:grant_power",
    "power": "example:spear_model",
    "source": "example:spear"
  }
}
```

A spear that sinks a third of a block into logs and stays there for the default minute, while a hit on anything else ends the shot as usual.
