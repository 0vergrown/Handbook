---
title: "Fire Projectile (Power Type)"
description: "Fires one or more projectiles when a key is pressed, with configurable visuals, flight behaviour and actions on hit and miss."
navigation_title: "Fire Projectile"
---

Fires one or more projectiles when the player presses a [Key](/docs/datapack/data-types/key). The projectile can be any entity type or Apoli's own textured projectile, and the power controls how it flies and what happens when it hits or misses.

Type ID: `apoli:fire_projectile`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_type` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The ID of the entity type to fire. Set this or `texture_location`. |
| `texture_location` | [Identifier](/docs/datapack/data-types/identifier) or keyword | _optional_ | The texture of the projectile. When set, `entity_type` is ignored and the projectile is Apoli's own entity, which can also wear a [Bedrock model](#giving-the-projectile-a-model). The keywords `held_item` and `offhand_item` throw the shooter's item instead (see [Throwing what you are holding](#throwing-what-you-are-holding)). |
| `cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | Ticks the power needs to recharge before it can be used again. |
| `hud_render` | [Hud Render](/docs/datapack/data-types/hud-render) | _optional_ | How the cooldown shows on the HUD. |
| `count` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | How many projectiles to fire each use. An expression is evaluated once per use, with the shooter as the subject. |
| `interval` | [Integer](/docs/datapack/data-types/integer) | `0` | Ticks between projectiles when firing several in a row. `0` fires them all on the same tick. |
| `start_delay` | [Integer](/docs/datapack/data-types/integer) | `0` | Ticks before the first projectile is fired. |
| `speed` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.5` | The speed of the fired projectile. An expression is evaluated for every projectile, with the shooter as the subject. |
| `offset_x`, `offset_y`, `offset_z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | Where the projectile spawns, relative to the shooter's eyes. Read through `space`, so `local` puts `offset_z: 1.5` a block and a half in front of wherever they are looking, like the muzzle of a cannon. An expression is evaluated for every projectile, with the shooter as the subject, so `"rUni(-3, 3)"` scatters a volley. |
| `space` | [Space](/docs/datapack/data-types/space) | `world` | How the spawn offset is read. `local` is relative to the shooter's facing, and `world` uses the world axes. |
| `max_distance` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | Removes the projectile once it has travelled this far in blocks, or turns it around when `return` is set. Distance is measured along the path it flew, so bounces and homing curves count. `0` lets it fly until it hits something or expires. Apoli's own projectiles keep drifting on inertia, so `speed` alone doesn't limit their range. |
| `lifetime` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Removes the projectile after this many ticks in the air, whatever it is doing, and runs `bientity_action_on_expire` first. Use it as the backstop for a slow projectile that would otherwise hang where it stopped, in water for example. Unlike `max_distance`, it also ends a projectile on its way back. `0` sets no limit. |
| `divergence` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | How much random spread each projectile gets. An expression is evaluated for every projectile, with the shooter as the subject, so `"rUni(0, 4)"` gives every shot in a volley its own spread. |
| `sound` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | A sound to play when the power is used. |
| `tag` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | NBT data for the fired entity. |
| `allow_conditional_cancelling` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Stops firing the remaining projectiles as soon as the entity no longer meets this power's condition. |
| `block_action_cancels_miss_action` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether `block_action_on_hit` cancels `bientity_action_on_miss`. |
| `entity_action_before_firing` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity firing the projectile, just before the projectile is created. |
| `bientity_action_after_firing` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs as soon as the projectile is created, with the owner as the actor and the projectile as the target. |
| `block_action_on_hit` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | Runs on the block the projectile lands on. |
| `bientity_action_on_miss` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs when the projectile misses, with the owner as the actor and the projectile as the target. |
| `bientity_action_on_hit` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs when the projectile hits an entity, with the projectile as the actor and the hit entity as the target. |
| `owner_target_bientity_action_on_hit` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs when the projectile hits an entity, with the owner as the actor and the hit entity as the target. |
| `tick_bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs every tick of the projectile's flight, with the owner as the actor and the projectile as the target. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | The block hit by the projectile must pass this for `block_action_on_hit` to run. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Tested with the projectile as the actor and the entity in its path as the target. The projectile only hits the entity when this passes, and passes through it otherwise. |
| `owner_bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | The same test with the owner as the actor and the entity in its path as the target. |
| `pierce` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | How many entities the projectile passes through. It hits them, runs its hit actions and flies on instead of stopping. `-1` passes through every entity. It is worked out at each hit, with the owner as the entity. See [Passing through](#passing-through). |
| `key` | [Key](/docs/datapack/data-types/key) | _optional_ | Which active key the power responds to. Without one, it uses the primary active power key. |
| `projectile_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the projectile or entity that is launched. |
| `shooter_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity that has the power. |
| `reflective` | [Projectile Reflection](/docs/datapack/data-types/projectile-reflection) or [Boolean](/docs/datapack/data-types/boolean) | _optional_ | Makes the projectile bounce off blocks instead of stopping on them, and off the entities it hits when `entities` is on. `true` bounces off blocks with the default settings. See [Bouncing off walls](#bouncing-off-walls). |
| `bientity_action_on_bounce` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs every time the projectile bounces, with the owner as the actor and the projectile as the target. |
| `bientity_action_on_expire` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs when the projectile runs out of `max_distance` or `lifetime` and is removed, with the owner as the actor and the projectile as the target. It doesn't run when `return` turns the projectile around instead. |
| `return` | [Projectile Return](/docs/datapack/data-types/projectile-return) | _optional_ | Makes the projectile fly back to the shooter, like a trident with Loyalty. See [Coming back](#coming-back). |
| `homing` | [Projectile Homing](/docs/datapack/data-types/projectile-homing) | _optional_ | Makes the projectile seek out a nearby target and curve toward it. See [Chasing a target](#chasing-a-target). |

## Bouncing off walls

`reflective` turns a block hit into a rebound. The projectile's velocity is mirrored through the face it struck, scaled by the object's `speed`, and it carries on flying. Entity hits only bounce when the object's `entities` is `true` (see [Bouncing off enemies](#bouncing-off-enemies)). Otherwise a reflective projectile still hits the first entity it reaches, subject to `bientity_condition`. The fields are described on [Projectile Reflection](/docs/datapack/data-types/projectile-reflection).

Each bounce still runs `block_action_on_hit` (and checks `block_condition`), so a bouncing shot can leave a mark on every wall it touches. `bientity_action_on_miss` waits until the projectile stops for good, so it only runs on a real miss.

Once `max_bounces` is used up, the next block hit ends the shot normally. Give a projectile that bounces forever (`max_bounces: -1`) a `max_distance` so it can't outlive the player who fired it.

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

`"reflective": true` bounces with the defaults. The flat form, with `max_bounces` and `bounce_speed` written next to `"reflective": true` on the power itself, reads the same way.

> [!WARNING]
> A `speed` above `1.0` compounds. At `1.3`, a projectile travels nearly four times its launch speed after six bounces, which is fast enough to tunnel through a one-block wall between ticks. Pair it with a low `max_bounces`.

## Bouncing off enemies

With `entities: true` in its `reflective` object, a projectile glances off the entities it hits too. The hit runs first (`bientity_action_on_hit` and `owner_target_bientity_action_on_hit`), then the velocity is mirrored through the side of the entity's hitbox it struck, and `bientity_action_on_bounce` runs. Bounces off blocks and off entities share `max_bounces`. The projectile can't hit the entity it just bounced off again until it hits something else, bounces off a block or turns back.

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

On a projectile fired with `entity_type`, a bounce off an entity takes the place of its own impact, so an arrow that glances off a zombie deals none of its arrow damage. Deal the damage in the hit actions instead.

## Passing through

`pierce` lets the projectile fly on through the entities it hits. Each one still gets the hit actions, once. An entity it has passed through can't be hit again until the projectile bounces off a block or turns back, so a [returning](#coming-back) projectile can cut through the same crowd on its way home. `-1` passes through everything, and a positive number passes through that many before the next entity stops the shot as usual. `bientity_condition` and `owner_bientity_condition` still decide what it can hit at all.

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

With `entities` on in `reflective` as well, the projectile bounces off entities while it has bounces left and passes through them after that. As with a bounce, passing through takes the place of a vanilla projectile's own impact.

## Coming back

`return` turns the projectile around after it hits something, reaches `max_distance` or has been in the air for a set time, then pulls it back to the shooter on a curve, through blocks, like a boomerang. It disappears when it reaches them, and `bientity_action_on_catch` runs at that moment. Only a projectile drawn from `texture_location` comes back. The fields are described on [Projectile Return](/docs/datapack/data-types/projectile-return).

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

A `condition` on `return` holds back the turn that `after` or `max_distance` calls for. It is tested every tick, with the owner as the actor and the projectile as the target, and the projectile keeps flying until it passes. `"condition": {"type": "apoli:actor_condition", "condition": {"type": "apoli:key_pressed", "key": "key.origins.primary_active", "inverted": true}}` keeps a boomerang out for as long as its owner holds the key. A hit that turns it around is never held back, and `lifetime` still ends a shot that is held out too long.

## Chasing a target

`homing` makes the projectile look for a living entity ahead of it and bend its flight toward it, turning at most `turn_rate` degrees a tick without losing speed. It never picks the shooter, their teammates, or a tamed animal, minion or clone they own. It also skips any entity the projectile couldn't hit anyway, because `bientity_condition` and `owner_bientity_condition` filter the search as well as the hit. Only a projectile drawn from `texture_location` homes. The fields are described on [Projectile Homing](/docs/datapack/data-types/projectile-homing).

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

A slow projectile with a high `turn_rate` circles in on its target like a wisp, and a fast one with a low `turn_rate` curves like a guided missile and can overshoot. Once `duration` runs out, it flies on in a straight line.

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

The player fires arrows very rapidly while holding the left mouse button. The arrows can't be picked up.

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

The player fires 4 snowballs that look like slime balls, one every 5 ticks, after pressing the right mouse button.

## Throwing what you are holding

Set `texture_location` to `held_item` (or `offhand_item`) and the projectile carries the shooter's stack and renders its real item model. Blocks come out as blocks and items as their sprite, the same way a thrown snowball or ender pearl renders:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "held_item",
  "speed": 1.5
}
```

The stack is read when the projectile spawns, so it keeps looking like that item even if the shooter swaps hands mid-flight. It is a copy for rendering only and nothing is taken from the shooter's inventory, so pair it with an [apoli:consume](/docs/datapack/item-actions/consume) or [apoli:change_slot](/docs/datapack/entity-actions/change_slot) if the throw should cost the item.

## Giving the projectile a model

A projectile spawned by `texture_location` is Apoli's own entity. Like a minion or a clone, it renders whatever [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) geometry it holds. Grant the model power to the projectile from `projectile_action` and it wears the model instead of the flat texture:

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

The model faces the projectile's direction of travel, pitch included. The side Blockbench labels north (−Z) leads, which is the same side a player model's face is on, so build the projectile pointing north. Its animations play from the moment it is granted, so a spin or a flame flicker runs for the whole flight.

Every geometry power the projectile holds when it is fired is resolved at that point and carried in its own entity data, so it arrives with the spawn and every viewer sees the model on the very first frame. A projectile can wear several at once, such as a body plus a glowing eyes layer, and draws them all. Granting or revoking a model power mid-flight still works, because the live powers are checked when the projectile isn't carrying stamped ones.

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

> [!NOTE]
> `texture_location` is what selects Apoli's projectile entity in the first place, so it stays required even when a model covers it. Point it at a blank texture. A vanilla `entity_type` projectile renders the way vanilla renders it and ignores model powers.
