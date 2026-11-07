---
title: "Sticky projectiles, and explosions that name the killer"
description: "Apoli 1.129.0: a sticky option for apoli:fire_projectile, kill credit for explosions set off by raycasts and projectiles, and damage_self doing what the docs say."
date: 2026-11-07
author: Overgrown
---

This is Apoli 1.129.0, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Origins 1.52.0 works with it as it is, and the network format hasn't changed. There's one new option and one fix I'm glad to be rid of, plus a behaviour change you should read before updating.

## Sticky projectiles

I wanted sticky bombs. [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) could already bounce, home in on things, pierce a crowd and come back like a boomerang, but it couldn't stay in a wall the way an arrow does.

It has a `sticky` option now, an object like `homing` and `reflective`. The projectile stops in the block it hits, keeps the angle it flew in at, and stays until its `duration` runs out, which is a minute by default. Then `bientity_action_on_expire` runs, and that's where you put the bang:

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

That's a bomb that squelches onto the first block it hits and goes off three seconds later. `"sticky": true` works too if the defaults are fine.

A few things fall out of it that I didn't plan but like. Break the block a projectile is stuck in and it drops and sticks wherever it lands. A projectile with `reflective` bounces until it runs out of bounces and then sticks. And one with `return` sticks in the wall and then pulls itself back out when its `after` timer is up, like an axe thrown into a tree and called back. `depth` lets a spear sink into the wood instead of resting on the surface, and `block_condition` keeps it from sticking to things it shouldn't. The full list is on [Projectile Sticking](/docs/datapack/data-types/projectile-sticking).

It only works on projectiles drawn from `texture_location`, same as homing and return. Arrows already stick, after all.

## Kill credit for explosions

Death messages were broken for explosions set off by a raycast, and once I lined up a test for every way a pack can make that happen, broken was generous:

- A raycast with an `apoli:explode` block action killed someone and the chat said they "blew up", with no killer at all. If they'd been hit by someone else in the last few seconds, the message blamed that person instead.
- A beam that ran `apoli:explode` on its target through [`apoli:target_action`](/docs/datapack/bientity-actions/target_action) credited every kill to the target. Shoot one player standing next to another and the second one "was blown up by" the first.
- A projectile that exploded from `bientity_action_on_hit` credited the projectile itself, and since Apoli's projectile has no translated name, the chat said someone "was blown up by entity.apoli.custom_projectile".

All three now credit whoever is really responsible. A block explosion is credited to the entity that ran the block action, so the raycaster or the shooter. An entity explosion run on the target of a bi-entity action is credited to that action's actor, and anything a projectile sets off is credited to whoever fired it. You get the right death message, the kill counts for the player, mobs get angry at the right person, and mobs killed this way drop their experience.

A credited explosion also follows the server's PvP and team rules, the way a sword hit does. On a server with `pvp=false`, a player's explosions no longer hurt other players. Before, an explosion with nobody behind it ignored those rules entirely.

## damage_self works now

While I was in there I found that `damage_self` on the entity and bi-entity `apoli:explode` never did anything. The docs said the default, `true`, hurts whoever set the explosion off, and Apace's version does exactly that. Ours never did, because the code made that entity the source of the explosion, and vanilla never damages an explosion's own source.

After this update, an `apoli:explode` without a `damage_self` field hurts the entity that triggers it, as the docs always promised. Add `"damage_self": false` if you were relying on the old behaviour.

The block version of `apoli:explode` still starts at the centre of the block it runs on. When that block is solid it shields the entities around it, so a block explosion from a raycast that hits a wall deals very little damage. The [Explode (Block Action Type)](/docs/datapack/block-actions/explode) page has a note about it now.
