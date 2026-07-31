---
title: "Fire Projectile (Power Type)"
description: "Fires one or more projectiles upon pressing the specified Key with customizable projectile-firing ability with configurable visuals, behavior, and actions…"
navigation_title: "Fire Projectile"
---

Fires one or more projectiles upon pressing the specified [Key](/docs/datapack/data-types/key) with customizable projectile-firing ability with configurable visuals, behavior, and actions on hit/miss.

Type ID: `apoli:fire_projectile`

## Fields

| Field                                 | Type                   | Default    | Description                                                                                                                                                                      |
|---------------------------------------|------------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `entity_type`                         | [Identifier](/docs/datapack/data-types/identifier) |            | The ID of the entity type that will be fired.                                                                                                                                    |
| `texture_location`                    | [Identifier](/docs/datapack/data-types/identifier) | *optional* | If specified, the texture used for the projectile and the `entity_type` will be ignored.                                                                                         |
| `cooldown`                            | [Integer](/docs/datapack/data-types/integer)    | `1`        | Interval of ticks this power needs to recharge before the power can be triggered again.                                                                                          |
| `hud_render`                          | [Hud Render](/docs/datapack/data-types/hud-render) | _optional_ | Determines how the cooldown of this power is visualized on the HUD.                                                                                                              |
| `count`                               | [Integer](/docs/datapack/data-types/integer)    | `1`        | The amount of projectiles to fire each use.                                                                                                                                      |
| `interval`                            | [Integer](/docs/datapack/data-types/integer)    | `0`        | Determines the interval for firing multiple projectiles consecutively (in ticks). If set to 0, it will fire all the projectiles at the same tick.                                |
| `start_delay`                         | [Integer](/docs/datapack/data-types/integer)    | `0`        | Determines how long the start of the firing process is delayed (in ticks).                                                                                                       |
| `speed`                               | [Float](/docs/datapack/data-types/float)      | `1.5`      | The speed applied to the fired projectile.                                                                                                                                       |
| `divergence`                          | [Float](/docs/datapack/data-types/float)      | `1.0`      | How much each projectile fired is affected by random spread.                                                                                                                     |
| `sound`                               | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If set, the sound with this ID will be played when the power is used.                                                                                                            |
| `tag`                                 | [NBT](/docs/datapack/data-types/nbt)        | _optional_ | NBT data of the entity.                                                                                                                                                          |
| `allow_conditional_cancelling`        | [Boolean](/docs/datapack/data-types/boolean)    | `false`    | Determines if extra projectiles will no longer be fired as soon as the entity no longer meets this power's condition.                                                            |
| `block_action_cancels_miss_action`    | [Boolean](/docs/datapack/data-types/boolean)    | `false`    | Determines if the `block_action_on_hit` action will cancel the `bientity_action_on_miss` action.                                                                                 |
| `entity_action_before_firing`         | Entity Action          | *optional* | If specified, the entity action to execute on the entity firing the projectile just prior to the projectile being created.                                                       |
| `bientity_action_after_firing`        | Bi-entity Action       | *optional* | If specified, the bi-entity action to execute with the projectile owner the actor, and the projectile as the target as soon as the projectile is created.                        |
| `block_action_on_hit`                 | Block Action           | *optional* | If specified, the block action to execute on the block the projectile lands on upon having it land on it.                                                                        |
| `bientity_action_on_miss`             | Bi-entity Action       | *optional* | If specified, the bi-entity action to execute with the projectile owner as the actor, and the projectile as the target upon missing.                                             |
| `bientity_action_on_hit`              | Bi-entity Action       | *optional* | If specified, the bi-entity action to execute with the projectile as the actor, and the hit entity as the target upon hitting an entity.                                         |
| `owner_target_bientity_action_on_hit` | Bi-entity Action       | *optional* | If specified, the bi-entity action to execute with the projectile owner as the actor, and the hit entity as the target upon hitting an entity.                                   |
| `tick_bientity_action`                | Bi-entity Action       | *optional* | If specified, the bi-entity action with the projectile owner as the actor, and the projectile as the target that is run each tick of the projectile's lifespan.                  |
| `block_condition`                     | Block Condition        | *optional* | If specified, the block condition that the block targeted by the `block_action_on_hit` field must meet in order for that to run.                                                 |
| `bientity_condition`                  | Bi-entity Condition    | *optional* | If specified, the bi-entity condition with the projectile as the actor and the target as the target for the projectile to actually hit the target instead of pass through.       |
| `owner_bientity_condition`            | Bi-entity Condition    | *optional* | If specified, the bi-entity condition with the projectile owner as the actor and the target as the target for the projectile to actually hit the target instead of pass through. |
| `key`                                 | [Key](/docs/datapack/data-types/key)        | _optional_ | Which active key this power should respond to. If none is specified, this power will use the primary active power key.                                                           |
| `projectile_action`                   | Entity Action Type     | _optional_ | If specified, this entity action will be executed on the projectile or entity that will be launched.                                                                             |
| `shooter_action`                      | Entity Action Type     | _optional_ | If specified, this entity action will be executed on the entity that has the power.                                                                                              |

## Examples

```json
{
  	"type": "apoli:fire_projectile",
	"entity_type": "minecraft:arrow",
  	"cooldown": 2,
	"hud_render": {
		"should_render": false
	},
	"tag": "{pickup:0b}",
	"key": {
		"key": "key.attack",
		"continuous": true
	}
}
```

This example will let the player fire arrows very rapidly by holding the left mouse button. They can't be picked up.

```json
{
    "type": "apoli:fire_projectile",
    "entity_type": "minecraft:snowball",
    "cooldown": 100,
    "hud_render": {
        "should_render": false
    },
    "count": 4,
    "interval": 5,
    "tag": "{Item: {id: 'minecraft:slime_ball', Count: 1b}}",
    "key": {
        "key": "key.use",
        "continuous": false
    }
}
```

This example will let the player fire 4 snow balls disguised as slime balls consecutively, with an interval of 5 ticks upon pressing the right mouse button.
