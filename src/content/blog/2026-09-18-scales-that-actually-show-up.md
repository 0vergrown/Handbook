---
title: "Scales that actually show up"
description: "Apoli 1.87.0 makes the scale system visible to everyone on the server, gives action_over_time an expression for its interval, and reworks Water Protection into a delay."
date: 2026-09-18
author: Overgrown
---

This is Apoli 1.87.1 and Origins 1.39.0. The last release shipped the scale system, and this one makes it work.

## The scale system was hooked into the wrong methods

There were two mistakes, both of the same shape: a mixin on a method that the classes we cared about override.

`Entity.getDimensions(Pose)` is where the hitbox comes from, except that `LivingEntity` overrides it and never calls up. Every player and every mob therefore kept its vanilla hitbox no matter what the scale said. `LivingEntityRenderer.scale`, where the model was being resized, is overridden by `PlayerRenderer` without a `super` call, so players were never resized on screen either.

So the whole thing looked inert: `/apoli:scale set @s apoli:base 2` reported success, the value was stored, and nothing about the world changed.

Now the hitbox is scaled in `LivingEntity.getDimensions` (and in `Player.getDimensions` on 1.20.1, where the override chain is different again), and the model is scaled in `EntityRenderDispatcher.render`. That's one place, above every renderer, so it covers players, mobs, armour stands, item frames and anything a mod adds. The entity's shadow scales with it.

Held items moved too. They used to be scaled only in the first person hand renderer, which is why `apoli:held_item` and `apoli:base` interacted so strangely: one of them applied in first person and neither applied in third. Both views now go through `ItemRenderer`, and `apoli:held_item` is no longer built from `apoli:base`. In third person the item is drawn inside the model and already follows it, so `held_item` is the extra multiplier on top of that, in both views.

## Everyone can see it

A scale set by command or by [`apoli:scale`](/docs/datapack/entity-actions/scale) is sent to every player tracking the entity, and again when a player joins, respawns or changes dimension. Respawning keeps the size you had. The `ticks` animation is sent as its start, end and easing instead of as a value per tick, so a four second shrink costs one packet and every client eases through it in step.

## And it costs less than it did

An entity whose size has settled does no work at all. The hook that runs every tick now returns straight away unless an animation is in flight, and a scaled entity with no [`apoli:scale`](/docs/datapack/powers/scale) power keeps its resolved values until something actually changes them: granting the power, revoking it, suppressing it, or a `/reload`. Only scales driven by expressions are worked out again every tick, because only they can change by themselves.

## `interval` takes an expression

[`apoli:action_over_time`](/docs/datapack/powers/action_over_time) can now work out its own interval:

```json
{
  "type": "apoli:action_over_time",
  "interval": "20 + min(enchantment[origins:water_protection, armor, sum], 8) * 6",
  "condition": { "type": "apoli:in_rain" },
  "entity_action": { "type": "apoli:damage", "amount": 2, "damage_type": "origins:hurt_by_water" }
}
```

The gap is measured from the last time it ran and worked out again when the action runs, so it follows whatever you put in it. The first hit also lands on the tick the condition becomes true, instead of up to one interval later. An expression interval checks the condition every tick, which is the trade you're making. A plain number still samples once per interval and costs exactly what it did before.

## Custom projectiles were rendering upside down

An [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) in `geometry` mode on a custom projectile drew the model inverted and mirrored, hanging below the projectile.

Entity models are made in a flipped space, with Y pointing down, and `LivingEntityRenderer` sets that up with `scale(-1, -1, 1)` before any render layer runs. A projectile isn't a living entity, so its renderer builds that space itself, and it was missing the flip. It has it now, and the same `.geo.json` looks identical on a player and on a projectile.

## Water Protection is a delay now

It used to reduce water damage and, at a combined level of 8, stop it outright. Both of those are gone. `origins:hurt_by_water` bypasses armour, shields and enchantments, so the hit is always 2. What Water Protection changes is how often it lands: 6 more ticks per combined level, up to 8 levels, from one hit a second with no armour to one every 3.4 seconds in a full set.

The immunity moved somewhere you can see coming: Conduit Power. Stand in the range of a conduit and water and rain stop hurting.

The whole mechanic is one power file now, with no cooldown resource, no second power to carry the timer and no `origins:enchantment` condition. It also responds faster than the old version in both directions: stepping into the rain hurts straight away, and taking armour off shortens the gap on the next hit, without waiting for the next cycle.
