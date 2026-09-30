---
title: "Homing projectiles, true landings and frozen riders"
description: "Apoli 1.105.0 and Origins 1.46.10: projectiles can home in on targets, landing_condition reads the destination, a freeze holds through riding, and custom models can animate on their own."
date: 2026-09-29
author: Overgrown
---

Apoli **1.105.0** and Origins **1.46.10**. Origins has no changes of its own this time; it is built against the new Apoli.

## Projectiles that home in

[`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) has a `homing` field. The projectile looks for a living entity ahead of it and curves toward it, turning at most `turn_rate` degrees a tick without losing speed:

```json
"homing": {
  "delay": 5,
  "duration": 60,
  "range": 8,
  "angle": 70,
  "turn_rate": 10
}
```

It never chases the shooter, their teammates, or a pet, minion or clone they own, and the shot's own `bientity_condition` and `owner_bientity_condition` filter what it chases as well as what it hits. The target is picked on the server and every client steers the projectile the same way, so the curve stays smooth. The fields are on [Projectile Homing](/docs/datapack/data-types/projectile-homing).

## More for fire_projectile

- **`reflective` is an object now**, like `return`: `"reflective": { "max_bounces": 6, "speed": 0.85 }`. `"reflective": true` with `max_bounces` and `bounce_speed` beside it still works exactly as before. Both numbers take expressions. See [Projectile Reflection](/docs/datapack/data-types/projectile-reflection).
- **`bientity_action_on_expire`** runs when a projectile reaches `max_distance` and is removed — the place for a burst or a fizzle at the end of the range.
- **`offset_x`, `offset_y` and `offset_z` take expressions**, worked out for every projectile, so `"offset_x": "rUni(-4, 4)"` scatters a volley.

## Projectiles and summons hit as their owner

When [`apoli:damage`](/docs/datapack/bientity-actions/damage) runs with a projectile, a minion or a clone as the actor — a projectile's `bientity_action_on_hit`, say — the damage is now credited to whoever owns it. A kill drops experience and player-only loot, the victim retaliates against the owner, and the death message names them. Before, the projectile or summon took the credit, so mobs killed by a thrown power dropped no experience.

## landing_condition reads the destination

`landing_condition` on [`apoli:teleport`](/docs/datapack/entity-actions/teleport), [`apoli:random_teleport`](/docs/datapack/entity-actions/random_teleport) and [`apoli:teleport_to`](/docs/datapack/bientity-actions/teleport_to) is meant to be tested as though the entity were already at the destination. For [`apoli:fluid_height`](/docs/datapack/entity-conditions/fluid_height), [`apoli:submerged_in`](/docs/datapack/entity-conditions/submerged_in) and [`apoli:on_block`](/docs/datapack/entity-conditions/on_block) it wasn't: those read what the game had worked out for the spot the entity was leaving. A blink with "don't land in water or lava" was refused while you stood in water and let through into a lake. All three now read the destination.

## A freeze holds through riding

A frozen player could get into a boat and ride away unfrozen, because a passenger took its vehicle's tick rate instead of its own. Now:

- An entity's own rate or freeze always applies to it, riding or not. A frozen passenger is carried along but does not tick, so it cannot steer or climb out.
- A passenger with no rate of its own takes its vehicle's.
- A vehicle never runs faster than whoever is steering it, so a frozen rider freezes the boat, horse or strider under them until they are off it.
- A frozen vehicle stops on its rider's screen too.

The rules are on [`apoli:modify_tick_rate`](/docs/datapack/powers/modify_tick_rate#riding) and [`/tick`](/docs/datapack/commands/tick#riding).

## Custom models that animate themselves

[`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) has two new geometry fields:

- **`bind_body_parts: false`** draws the model exactly as its own animations pose it. Bones named `head` or `right_arm` stay inside their groups and no longer pick up the player's limb swing, so a creature with its own walk cycle no longer walks like a player. With `show_first_person`, its arm bones are drawn where the vanilla first-person arm is. See [Rigs that animate themselves](/docs/datapack/powers/custom_model_render#rigs-that-animate-themselves).
- **`offset`** moves the whole model, in blocks, along the holder's own left, up and forward axes.

Minions and projectiles now always draw their models this way, keeping bones named after body parts inside their groups. A minion or projectile model with a `head` or `body` bone nested in a rotated group now shows that rotation. Before, the bone was lifted out and lost it.

## Smaller changes

- [`apoli:delay`](/docs/datapack/meta-actions/delay) `ticks` and [`apoli:loop`](/docs/datapack/meta-actions/loop) `value` and `ticks` take expressions, worked out when the action starts.
- [`apoli:moving`](/docs/datapack/entity-conditions/moving) works on other players on the client. It always read `false` there, so a walk animation keyed on it never played on anyone but yourself.

## Documentation fixes

- The model example on [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile#giving-the-projectile-a-model) used `model` and `texture`, which `custom_model_render` doesn't have. It uses `model_location` and `texture_location` now, and a model id instead of a file path.
- `entity_id` on the [`fire_projectile` action](/docs/datapack/entity-actions/fire_projectile) is another name for `entity_type`, not a separate tracking id.
- `hide_cape` works in both `custom_model_render` modes, not only texture mode.
- The tick-rate pages said a frozen player could still walk. They can't. Their own client stops ticking them too.
