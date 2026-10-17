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
| `texture_location`                    | [Identifier](/docs/datapack/data-types/identifier) or keyword | *optional* | If specified, the texture used for the projectile and the `entity_type` will be ignored. The projectile is then Apoli's own entity, which can also wear a [Bedrock model](#giving-the-projectile-a-model). The keywords `held_item` and `offhand_item` throw the shooter's item instead — see [Throwing what you are holding](#throwing-what-you-are-holding). |
| `cooldown`                            | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression)    | `1`        | Interval of ticks this power needs to recharge before the power can be triggered again.                                                                                          |
| `hud_render`                          | [Hud Render](/docs/datapack/data-types/hud-render) | _optional_ | Determines how the cooldown of this power is visualized on the HUD.                                                                                                              |
| `count` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | The amount of projectiles to fire each use. An expression is evaluated once per use, with the shooter as the subject. |
| `interval`                            | [Integer](/docs/datapack/data-types/integer)    | `0`        | Determines the interval for firing multiple projectiles consecutively (in ticks). If set to 0, it will fire all the projectiles at the same tick.                                |
| `start_delay`                         | [Integer](/docs/datapack/data-types/integer)    | `0`        | Determines how long the start of the firing process is delayed (in ticks).                                                                                                       |
| `speed` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.5` | The speed applied to the fired projectile. An expression is evaluated for every projectile, with the shooter as the subject. |
| `offset_x`, `offset_y`, `offset_z`    | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | Where the projectile spawns, relative to the shooter's eyes. Read through `space`, so `local` puts `offset_z: 1.5` a block and a half in front of wherever they are looking — the muzzle of a cannon rather than a point due south of it. An expression is evaluated for every projectile, with the shooter as the subject, so `"rUni(-3, 3)"` scatters a volley. |
| `space`                               | [Space](/docs/datapack/data-types/space) | `world` | How the spawn offset is read. `local` is relative to the shooter's facing, `world` to the world axes. |
| `max_distance`                        | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression)      | `0`        | Removes the projectile once it has travelled this far, in blocks, measured along the path it actually flew — bounces and homing curves count — or turns it around, when `return` is set. `0` leaves it to fly until it hits something or expires. Apoli's own shots keep drifting on inertia, so `speed` alone does not bound their range. |
| `lifetime`                            | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Removes the projectile after this many ticks in the air, whatever it is doing, running `bientity_action_on_expire` first. It is the backstop for a slow projectile that would otherwise hang where it stopped — in water, say. Unlike `max_distance` it also ends a projectile that is on its way back. `0` sets no limit. |
| `divergence` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | How much each projectile fired is affected by random spread. An expression is evaluated for every projectile, with the shooter as the subject, so `"rUni(0, 4)"` gives every shot in a volley its own spread. |
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
| `pierce` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | How many entities the projectile passes through: it hits them, runs its hit actions and flies on instead of stopping. `-1` passes through every entity. Worked out at each hit, with the owner as the entity. See [Passing through](#passing-through). |
| `key`                                 | [Key](/docs/datapack/data-types/key)        | _optional_ | Which active key this power should respond to. If none is specified, this power will use the primary active power key.                                                           |
| `projectile_action`                   | Entity Action Type     | _optional_ | If specified, this entity action will be executed on the projectile or entity that will be launched.                                                                             |
| `shooter_action`                      | Entity Action Type     | _optional_ | If specified, this entity action will be executed on the entity that has the power.                                                                                              |
| `reflective`                          | [Projectile Reflection](/docs/datapack/data-types/projectile-reflection) or [Boolean](/docs/datapack/data-types/boolean) | *optional* | Makes the projectile bounce off blocks, and with `entities` off the entities it hits, instead of stopping on them. `true` bounces off blocks with the default settings. See [Bouncing off walls](#bouncing-off-walls). |
| `bientity_action_on_bounce`           | Bi-entity Action       | *optional* | If specified, the bi-entity action to execute with the projectile owner as the actor and the projectile as the target every time it bounces.                                     |
| `bientity_action_on_expire`           | Bi-entity Action       | *optional* | If specified, the bi-entity action to execute with the projectile owner as the actor and the projectile as the target when the projectile runs out of `max_distance` or `lifetime` and is removed. It does not run when `return` turns the projectile around instead. |
| `return`                              | [Projectile Return](/docs/datapack/data-types/projectile-return) | *optional* | Makes the projectile fly back to the shooter, like a trident with Loyalty. See [Coming back](#coming-back). |
| `homing`                              | [Projectile Homing](/docs/datapack/data-types/projectile-homing) | *optional* | Makes the projectile seek out and curve toward a nearby target. See [Chasing a target](#chasing-a-target). |

## Bouncing off walls

`reflective` turns a block hit into a rebound: the projectile's velocity is mirrored through the face it struck, scaled by the object's `speed`, and it carries on flying. Entity hits bounce only when the object's `entities` is `true` — see [Bouncing off enemies](#bouncing-off-enemies). Otherwise a reflective projectile still hits the first entity it reaches, subject to `bientity_condition`. The fields are on [Projectile Reflection](/docs/datapack/data-types/projectile-reflection).

Each bounce still runs `block_action_on_hit` (honouring `block_condition`), so a bouncing shot can leave a mark on every wall it kisses. `bientity_action_on_miss` is held back until the projectile actually stops, so "it missed" means what it says.

Once `max_bounces` is used up the next block hit ends the shot normally. Give a forever-bouncing projectile (`max_bounces: -1`) a `max_distance` so it cannot outlive the player who fired it.

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/entity/bouncy_orb.png",
  "speed": 1.2,
  "reflective": {
    "max_bounces": 6,
    "speed": 0.85
  },
  "max_distance": 64,
  "bientity_action_on_bounce": {
    "type": "apoli:target_action",
    "action": {
      "type": "apoli:play_sound",
      "sound": "minecraft:entity.slime.squish"
    }
  }
}
```

`"reflective": true` bounces with the defaults. The flat form, with `max_bounces` and `bounce_speed` written next to `"reflective": true` on the projectile itself, reads the same way.

> A `speed` above `1.0` compounds — at `1.3` a projectile is travelling nearly four times its launch speed after six bounces, fast enough to tunnel through a one-block wall between ticks. Pair it with a low `max_bounces`.

## Bouncing off enemies

With `entities: true` in its `reflective` object, a projectile glances off the entities it hits too. The hit runs first — `bientity_action_on_hit` and `owner_target_bientity_action_on_hit` — then the velocity is mirrored through the side of the entity's hitbox it struck, and `bientity_action_on_bounce` runs. Bounces off blocks and off entities share `max_bounces`. The projectile cannot hit the entity it just bounced off again until it hits something else, bounces off a block or turns back.

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/entity/pinball.png",
  "speed": 1.2,
  "divergence": 0,
  "max_distance": 40,
  "reflective": {
    "max_bounces": 5,
    "entities": true
  },
  "owner_target_bientity_action_on_hit": {
    "type": "apoli:damage",
    "amount": 3,
    "damage_type": "minecraft:thrown"
  }
}
```

On a projectile fired with `entity_type`, a bounce off an entity takes the place of its own impact — an arrow that glances off a zombie deals none of its arrow damage — so deal the damage in the hit actions.

## Passing through

`pierce` lets the projectile fly on through the entities it hits. Each one still takes the hit actions, once: an entity it has passed through cannot be hit again until the projectile bounces off a block or turns back, so a [returning](#coming-back) projectile can cut through the same crowd on its way home. `-1` passes through everything; a positive number passes through that many, and the next entity stops the shot as usual. `bientity_condition` and `owner_bientity_condition` still decide what it can hit at all.

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/entity/spear.png",
  "speed": 2.0,
  "divergence": 0,
  "max_distance": 24,
  "pierce": 3,
  "owner_target_bientity_action_on_hit": {
    "type": "apoli:damage",
    "amount": 6,
    "damage_type": "minecraft:thrown"
  }
}
```

With `reflective` `entities` as well, the projectile bounces off entities while it has bounces left and passes through them after. As with a bounce, passing through takes the place of a vanilla projectile's own impact.

## Coming back

`return` turns the projectile around after it hits something, reaches `max_distance`, or has been in the air for a set time, and pulls it back to the shooter on a curve, through blocks — a boomerang. It disappears when it reaches them, and `bientity_action_on_catch` runs as it does. Only the projectile drawn from `texture_location` comes back. The fields are on [Projectile Return](/docs/datapack/data-types/projectile-return).

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "held_item",
  "speed": 1.2,
  "divergence": 0,
  "max_distance": 12,
  "bientity_action_on_hit": {
    "type": "apoli:damage",
    "amount": 5,
    "damage_type": "minecraft:thrown"
  },
  "return": {
    "speed": 2
  }
}
```

A `condition` on `return` holds back the turn that `after` or `max_distance` calls for. It is tested every tick, with the owner as the actor and the projectile as the target, and the projectile keeps flying until it passes — so `"condition": {"type": "apoli:actor_condition", "condition": {"type": "apoli:key_pressed", "key": "key.origins.primary_active", "inverted": true}}` keeps a boomerang out for as long as its owner holds the key. A hit that turns it around is never held back, and `lifetime` still ends a shot that is held out too long.

## Chasing a target

`homing` makes the projectile look for a living entity ahead of it and bend its flight toward it, turning at most `turn_rate` degrees a tick without losing speed. It never picks the shooter, their teammates, or a tamed animal, minion or clone they own, and never an entity the projectile could not hit anyway — `bientity_condition` and `owner_bientity_condition` filter the search as well as the hit. Only the projectile drawn from `texture_location` homes. The fields are on [Projectile Homing](/docs/datapack/data-types/projectile-homing).

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

A slow projectile with a high `turn_rate` circles in on its target like a wisp; a fast one with a low `turn_rate` curves like a guided missile and can overshoot. Once `duration` runs out it flies on in a straight line.

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

## Throwing what you are holding

Set `texture_location` to `held_item` (or `offhand_item`) and the projectile carries the shooter's stack, rendering its real item model — blocks come out as blocks, items as their sprite, exactly the way a thrown snowball or ender pearl renders:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "held_item",
  "speed": 1.5
}
```

The stack is read when the projectile spawns, so it keeps looking like that item even if the shooter swaps hands mid-flight. It is a copy for rendering only — nothing is taken from the shooter's inventory, so pair it with an [apoli:consume](/docs/datapack/item-actions/consume) or [apoli:change_slot](/docs/datapack/entity-actions/change_slot) if the throw should cost the item.

## Giving the projectile a model

A projectile spawned by `texture_location` is Apoli's own entity, and like a minion or a clone it
renders whatever [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) geometry it
is holding. Grant the model power to the projectile from `projectile_action` and it wears the model
instead of the flat texture:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/projectile/blank.png",
  "speed": 1.8,
  "projectile_action": {
    "type": "apoli:grant_power",
    "power": "example:shuriken_model",
    "source": "example:shuriken"
  }
}
```

```json
{
  "type": "apoli:custom_model_render",
  "mode": "geometry",
  "model_location": "example:shuriken",
  "texture_location": "example:textures/entity/shuriken.png",
  "animations": {
    "animation": "example:shuriken",
    "name": "animation.shuriken.spin",
    "loop": true
  }
}
```

The model is read from `assets/example/geo/shuriken.geo.json` and the animation from `assets/example/animations/shuriken.animation.json`.

The model faces the projectile's direction of travel, pitch included: the side Blockbench labels **north**
(−Z) leads — the same side a player model's face is on — so build the projectile pointing north. Its
animations play from the moment it is granted, so a spin or a flame flicker runs for the projectile's whole
flight.

Every geometry power the projectile holds when it is fired is resolved then and carried in its own
entity data, so it arrives with the spawn and every viewer sees the model on the very first frame. A
projectile can wear several at once — a body plus a glowing-eyes layer, say — and draws them all.
Granting or revoking a model power mid-flight still works — the live powers are checked when the
projectile is not carrying stamped ones.

Pair it with the spawn offset to line the projectile up with whatever fired it:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/projectile/blank.png",
  "space": "local",
  "offset_y": -0.4,
  "offset_z": 1.6,
  "speed": 2.0,
  "projectile_action": { "type": "apoli:grant_power", "power": "example:cannonball_model", "source": "example:cannon" }
}
```

> `texture_location` is what selects Apoli's projectile entity in the first place, so it stays
> required even when a model covers it — point it at a blank texture. A vanilla `entity_type`
> projectile renders the way vanilla renders it and ignores model powers.
