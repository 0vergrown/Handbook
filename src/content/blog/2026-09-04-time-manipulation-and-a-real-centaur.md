---
title: "Time manipulation, and a real centaur"
description: "Apoli 1.67.0 builds tick rates for single entities, chunks and dimensions into the engine, replaces the centaur model with a real four-legged one, adds a spawn_particles block action so raycasts and projectiles can leave custom particles where they land, and puts expressions on grab distance and particle roll."
date: 2026-09-04
author: Overgrown
---

The headline is a new system: time runs at whatever speed you say, for a single entity, a chunk or a whole dimension, without a second mod in the pack.

## Tick rates are an Apoli type now

Minecraft has had `/tick` since 1.20.3, but only for the whole server. Apoli 1.67.0 takes the same idea and lets you aim it. An entity, the chunk under a block, or a whole dimension can each carry their own rate, and the three fall back to each other: an entity with no rate of its own takes its chunk's, and a chunk takes its dimension's.

There are five new types, all sharing the name:

- [apoli:modify_tick_rate](/docs/datapack/powers/modify_tick_rate) is the power. It applies its state again every tick and lets it lapse when the power stops, so nothing stays frozen after a death, a revoke or a `/reload`. `target: area` slows or freezes everything around the holder.
- [apoli:tick_rate](/docs/datapack/entity-actions/tick_rate) and [the block action](/docs/datapack/block-actions/tick_rate) are the one-shot form, with `rate`, `frozen`, `step`, `sprint`, `reset` and `duration`.
- [apoli:tick_rate](/docs/datapack/entity-conditions/tick_rate) and [the block condition](/docs/datapack/block-conditions/tick_rate) read the effective rate back.

A slowed chunk covers block entities, scheduled block and fluid ticks, and random ticks, so a bubble of stopped time stops furnaces and crops as well as mobs. Rates never run anything faster than the server's own tick rate. To speed the world up, raise it with vanilla `/tick rate` and hold everything else down with a power.

```json
{
    "type": "apoli:modify_tick_rate",
    "target": "area",
    "radius": 8,
    "shape": "sphere",
    "frozen": true,
    "affect_chunks": true,
    "condition": { "type": "apoli:sneaking" }
}
```

## The centaur is a centaur

`apoli:centaur` used to be a pose: a seated rider, meant for sitting on someone else's avatar. It's now an actual centaur. The player's own head, torso and arms sit on a four-legged horse body with a mane and a tail, the player's legs are hidden, and the horse's legs trot along with the player's real movement.

The horse half is drawn from its own texture, a plain 64 × 64 horse skin at `apoli:textures/entity/centaur/horse.png`, so any horse texture drops straight in, either for everyone through a resource pack or for one power with the new `model_texture_location` field on [apoli:modify_player_model](/docs/datapack/powers/modify_player_model). Every horse part can be named (`horse_body`, `horse_tail`, `front_left_leg` and the rest, plus `horse_legs` and `horse`) from `modify_model_parts`, `model_color` and `custom_model_render`.

## Custom particles where a shot lands

[apoli:spawn_particles](/docs/datapack/block-actions/spawn_particles) is now a block action too, so a raycast's `block_action` and a projectile's `block_action_on_hit` can spawn an Apoli custom particle at the impact, which `/particle` through a command could never do. Its `anchor` defaults to `hit`, which uses the exact impact point instead of the block's centre.

## Expressions in two more places

`distance` on [apoli:grab](/docs/datapack/bientity-actions/grab) is worked out again every tick, so an expression can reel the held target in and out while the grab is running.

`roll` and `roll_speed` on a [custom particle](/docs/datapack/data-types/custom-particle) are worked out once per particle, which is what you want them for:

```json
"roll": "rUni(0, 360)",
"roll_speed": "rNor(0, 4)"
```

Every particle in the burst starts at its own angle and tumbles at its own rate.

## Smaller things

- The [apoli:fire_projectile](/docs/datapack/entity-actions/fire_projectile) action now honours `interval` and `start_delay` like the power does, and its page finally lists the fields it always shared with the power: `offset_x`, `offset_y`, `offset_z`, `space`, `max_distance` and `shooter_action`.
- `origins:` resolves to `apoli:` even without the Origins mod installed. A single type ID that can't be resolved anywhere inside a power's `entity_action` drops the whole action, so a pack written with `origins:` IDs used to go quietly dead on a server with only Apoli. It doesn't any more.
