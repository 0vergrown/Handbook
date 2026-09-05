---
title: "Fire Projectile (Entity Action Type)"
description: "Fires one or more projectiles or entities."
navigation_title: "Fire Projectile"
---

Fires one or more projectiles or entities. It takes the same fields as the [apoli:fire_projectile](/docs/datapack/powers/fire_projectile) power type, minus the four that only make sense on a power — `cooldown`, `hud_render`, `key` and `allow_conditional_cancelling`.

Type ID: `apoli:fire_projectile`

## Fields

| Field                                 | Type                   | Default    | Description                                                                                                                                                                      |
|---------------------------------------|------------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `entity_type`                         | [Identifier](/docs/datapack/data-types/identifier) |            | The identifier of the projectile or entity that will be launched.                                                                                                                |
| `entity_id`                           | [Identifier](/docs/datapack/data-types/identifier) | *optional* | Identifier for tracking the projectile                                                                                                                                           |
| `texture_location`                    | [Identifier](/docs/datapack/data-types/identifier) or keyword | *optional* | If specified, the texture used for the custom projectile and `entity_type` is ignored. The keywords `held_item` and `offhand_item` make the projectile render the shooter's held stack as a real item model. |
| `count`                               | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression)    | `1`        | The amount of projectiles to fire each use.                                                                                                                                      |
| `interval`                            | [Integer](/docs/datapack/data-types/integer)    | `0`        | Ticks between consecutive shots. `0` fires the whole `count` on the same tick.                                                                                                    |
| `start_delay`                         | [Integer](/docs/datapack/data-types/integer)    | `0`        | Ticks to wait before the first shot.                                                                                                                                             |
| `speed`                               | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression)      | `1.5`      | The speed applied to the fired projectile.                                                                                                                                       |
| `max_distance`                        | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression)      | `0`        | Removes the projectile once it has travelled this far, in blocks. `0` leaves it to fly until it hits something or expires.                                                        |
| `offset_x`, `offset_y`, `offset_z`    | [Float](/docs/datapack/data-types/float) | `0` | Where the projectile spawns, relative to the shooter's eyes. Read through `space`, so `local` puts `offset_z: 1.5` a block and a half in front of wherever they are looking. |
| `space`                               | [Space](/docs/datapack/data-types/space) | `world` | How the spawn offset is read. `local` is relative to the shooter's facing, `world` to the world axes. |
| `divergence`                          | [Float](/docs/datapack/data-types/float)      | `1.0`      | How much each projectile fired is affected by random spread.                                                                                                                     |
| `sound`                               | [Identifier](/docs/datapack/data-types/identifier) | *optional* | If set, the sound with this ID will be played when the power is used.                                                                                                            |
| `tag`                                 | [NBT](/docs/datapack/data-types/nbt)        | *optional* | NBT data to apply to projectiles                                                                                                                                                 |
| `entity_action_before_firing`         | Entity Action          | *optional* | If specified, the entity action to execute on the entity firing the projectile just prior to the projectile being created.                                                       |
| `bientity_action_after_firing`        | Bi-entity Action       | *optional* | If specified, the bi-entity action to execute with the projectile owner the actor, and the projectile as the target as soon as the projectile is created.                        |
| `block_action_on_hit`                 | Block Action           | *optional* | If specified, the block action to execute on the block the projectile lands on upon having it land on it.                                                                        |
| `bientity_action_on_miss`             | Bi-entity Action       | *optional* | If specified, the bi-entity action to execute with the projectile owner as the actor, and the projectile as the target upon missing.                                             |
| `bientity_action_on_hit`              | Bi-entity Action       | *optional* | If specified, the bi-entity action to execute with the projectile as the actor, and the hit entity as the target upon hitting an entity.                                         |
| `owner_target_bientity_action_on_hit` | Bi-entity Action       | *optional* | If specified, the bi-entity action to execute with the projectile owner as the actor, and the hit entity as the target upon hitting an entity.                                   |
| `block_action_cancels_miss_action`    | [Boolean](/docs/datapack/data-types/boolean)    | `false`    | Determines if the `block_action_on_hit` action will cancel the `bientity_action_on_miss` action.                                                                                 |
| `block_condition`                     | Block Condition        | *optional* | If specified, the block condition that the block targeted by the `block_action_on_hit` field must meet in order for that to run.                                                 |
| `bientity_condition`                  | Bi-entity Condition    | *optional* | If specified, the bi-entity condition with the projectile as the actor and the target as the target for the projectile to actually hit the target instead of pass through.       |
| `owner_bientity_condition`            | Bi-entity Condition    | *optional* | If specified, the bi-entity condition with the projectile owner as the actor and the target as the target for the projectile to actually hit the target instead of pass through. |
| `tick_bientity_action`                | Bi-entity Action       | *optional* | If specified, the bi-entity action with the projectile owner as the actor, and the projectile as the target that is run each tick of the projectile's lifespan.                  |
| `projectile_action`                   | Entity Action Type     | _optional_ | If specified, this entity action will be executed on the projectile or entity that will be launched.                                                                             |
| `shooter_action`                      | Entity Action Type     | _optional_ | If specified, this entity action will be executed on the entity firing the projectile.                                                                                           |

## Examples

```json
"entity_action": {
    "type": "apoli:fire_projectile",
    "entity_type": "minecraft:snowball",
    "divergence": 3.0,
    "count": 3
}
```

This example will fire three snowballs at where the player is facing.

```json
"entity_action": {
    "type": "apoli:fire_projectile",
    "entity_type": "minecraft:arrow",
    "count": 5,
    "interval": 3,
    "start_delay": 10,
    "offset_z": 1.5,
    "space": "local",
    "speed": 2.5
}
```

Half a second after the action runs, five arrows leave a point a block and a half in front of the shooter's eyes, one every three ticks.
