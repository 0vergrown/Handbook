---
title: "Dev Mode (Command)"
description: "Toggles a debugging view that shows resources as text, outlines areas and raycasts in particles, reports what powers did, and removes cooldowns."
navigation_title: "Dev Mode"
---

Toggles Apoli's developer mode for a player: a debugging view that makes the invisible parts of a power visible while you build it. Run it again to turn it off.

```mcfunction
apoli:dev_mode
apoli:dev_mode @a
```

Without arguments it toggles for the player running the command. With `<targets>` it toggles for each of them separately, so two people can be in different states.

## What changes while it is on

### Resources

The bar and icon [HUD](/docs/datapack/data-types/hud-render) is replaced by a plain list in the top-left corner, one line per resource: `4/10 - example:resource`. Every [`apoli:resource`](/docs/datapack/powers/resource) you hold is listed, including ones with no `hud_render` at all, and table resources list each slot as `example:table[0]`.

### Resource actions

When a resource's `min_action`, `max_action` or [`on_change`](/docs/datapack/powers/resource#reacting-to-changes) entries run, a red line names the power, the change and what ran: `example:mana 9 → 10 ran max_action, on_change[1]`. You get at most one line a second per holder and power, so a resource that changes every tick can't flood chat. A resource whose actions keep changing it says so once the chain is stopped.

### Areas

Anything that acts on a radius draws its shape in blue dust, using the real shape with its `offset`, `space` and per-axis `radius`. Cubes get their twelve edges, spheres three rings, cones a base ring and slant lines, and stars their eight faces. That covers [`apoli:area_of_effect`](/docs/datapack/entity-actions/area_of_effect), its [block counterpart](/docs/datapack/block-actions/area_of_effect), the `area` target of [`apoli:modify_tick_rate`](/docs/datapack/powers/modify_tick_rate), the inflated hitbox of [`apoli:action_on_collision`](/docs/datapack/powers/action_on_collision), and the scare radius of [`apoli:scare_mobs`](/docs/datapack/powers/scare_mobs).

### Tested radii

[`apoli:entity_in_radius`](/docs/datapack/entity-conditions/entity_in_radius) and [`apoli:block_in_radius`](/docs/datapack/entity-conditions/block_in_radius) draw in green instead, so a radius that is only tested looks different from one that acts.

### Raycasts

Every raycast draws what it tested. Raycasts that act draw in red: the [`apoli:raycast`](/docs/datapack/entity-actions/raycast) entity and [bi-entity](/docs/datapack/bientity-actions/raycast) actions, and the `raycast` endpoint of a [rope](/docs/datapack/data-types/rope-endpoint). Raycasts that are only tested draw in yellow: the [`apoli:raycast`](/docs/datapack/entity-conditions/raycast) entity and [bi-entity](/docs/datapack/bientity-conditions/raycast) conditions, and [`apoli:can_see`](/docs/datapack/bientity-conditions/can_see).

The bold line is the path up to where the ray stopped, and a thinner line carries on to its full reach and ends in a small ring. `radius` draws as the beam it really is, the target's hitbox growth swept along the ray, with a box at each end joined by its edges. `cone_angle` draws as a cone out to the entity reach, with a rounded end, because the cone tests distance from the eyes. Blocks and entities that were hit are outlined in bold. For a condition, a thin outline means the ray reached that block or entity but it failed the condition. `can_see` draws the line of sight to each target and outlines the block in the way.

### Commands

Every [`apoli:execute_command`](/docs/datapack/entity-actions/execute_command) you run echoes its finished command into your chat with `$(…)` macros already expanded, so you can see what actually ran instead of what was written. When a command is skipped because a `$(key)` had no value, a red line names the key and says why: the power isn't loaded, the holder doesn't have it, or it isn't a resource.

### Macros

When you turn dev mode on, and after every `/reload`, chat shows how many [macros](/docs/datapack/introduction/macros) are defined and how many calls were expanded in how many powers, followed by every macro error (red) and warning (gold). These are the same lines as the server log, naming the power, where in the file the call is, and the chain of macros it went through. Nothing is shown when no pack uses macros.

### Keys

Every change to the set of keys your client reports as held prints a red line: `held keys +key.origins.primary_active` when one goes down, `-key.origins.primary_active` when it comes up, and both on one line when they change together. This is the exact stream the server drives [`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) from, so a condition that flickers when you didn't touch the key shows up here as a stray `-` and `+` pair.

### Power storage

Every [`apoli:store_power`](/docs/datapack/entity-actions/store_power) and [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power) prints a red line saying what it did, naming the storage and the power. It says `stored`, or gives the reason it was refused: the target holds no storage at all, no storage has that ID, `from_held` found nothing matching on the actor, the power carries none of the storage's tags, it is already stored, or every slot is full. `run_stored_power` says whether the storage was empty, whether the filters matched nothing, or whether something matched but nothing ran.

### Damage

When an [`apoli:modify_damage`](/docs/datapack/powers/modify_damage) power changes a hit (also when written as `modify_damage_dealt` or `modify_damage_taken`), a red line on the victim shows the damage before and after, the damage type, and every power that took part: `Pig: damage 6 → 4 (minecraft:mob_attack) · dealt: example:strong (Steve) · taken: example:tough`. Powers on the attacker's side name who holds them. The first number is the amount the hit arrived with, and the second is the amount that armor, enchantments and Resistance then reduce. You get at most one line every half second per victim and attacker, so fire or poison can't flood chat.

### Cooldowns

Every cooldown reads as `0`, so abilities can be used over and over. This applies to [`apoli:cooldown`](/docs/datapack/powers/cooldown) and to the `cooldown` field built into power types like [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) and [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile).

## How the outlines are drawn

The particles are sent forced, so they draw at any distance and regardless of the particle setting, and only to players who have dev mode on. They are drawn for every dev mode player in the same dimension, whoever the actor was, so you can watch a mob's raycast as well as your own.

Outlines that come from a one-off action are drawn every time that action runs. Outlines that come from a condition or a ticking power redraw at most every ten ticks for each holder, however often the condition is checked, so one inside an `action_over_time` still draws and the dust never lapses. A per-tick particle budget on top keeps a hundred mobs testing the same radius from flooding the view.

> [!NOTE]
> Nothing here changes what a power does, except for the cooldowns. The outlines are drawn from the same numbers the action uses, so if the shape looks wrong on screen, the shape is wrong.

Dev mode only lasts for the session. It isn't saved with the world, and it clears when the player disconnects.

## Permission

It needs permission level 2, or the `apoli.command.dev_mode` node.
