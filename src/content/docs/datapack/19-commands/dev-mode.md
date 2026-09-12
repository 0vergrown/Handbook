---
title: "Dev Mode (Command)"
description: "Toggles a debugging view that draws resource values as text, outlines every radius and raycast with particles, explains skipped commands, and removes cooldowns."
navigation_title: "Dev Mode"
---

Toggles Apoli's developer mode for a player: a debugging view that makes the invisible parts of a power visible while you are building it. Run it again to turn it off.

```mcfunction
apoli:dev_mode
apoli:dev_mode @a
```

Without arguments it toggles for the player running the command. With `<targets>` it toggles for each of them independently, so two people can be in different states.

## What changes while it is on

| | |
|---|---|
| **Resources** | The bar-and-icon [HUD](/docs/datapack/data-types/hud-render) is replaced by a plain list in the top-left, one line per resource: `4/10 - example:resource`. Every [`apoli:resource`](/docs/datapack/powers/resource) you hold is listed, including ones with no `hud_render` at all, and table resources list each slot as `example:table[0]`. |
| **Areas** | Anything that acts on a radius draws its shape in blue dust — the real shape, including `offset`, `space` and a per-axis `radius`. Cubes get their twelve edges, spheres three rings, cones a base ring and slant lines, stars their eight faces. That covers [`apoli:area_of_effect`](/docs/datapack/entity-actions/area_of_effect), its [block counterpart](/docs/datapack/block-actions/area_of_effect), the `area` target of [`apoli:modify_tick_rate`](/docs/datapack/powers/modify_tick_rate), the inflated hitbox of [`apoli:action_on_collision`](/docs/datapack/powers/action_on_collision), and the scare radius of [`apoli:scare_mobs`](/docs/datapack/powers/scare_mobs). |
| **Tested radii** | [`apoli:entity_in_radius`](/docs/datapack/entity-conditions/entity_in_radius) and [`apoli:block_in_radius`](/docs/datapack/entity-conditions/block_in_radius) draw in **green** instead, so a radius that is only being *tested* reads differently from one that acts. |
| **Raycasts** | Every [`apoli:raycast`](/docs/datapack/entity-actions/raycast) draws its path in red dust, out to where it actually stopped, with the `radius` tube or the `cone_angle` spread drawn at the far end. |
| **Commands** | Every [`apoli:execute_command`](/docs/datapack/entity-actions/execute_command) run by you echoes its finished command into your chat with `$(…)` macros already expanded, so you can see what actually ran rather than what was written. When a command is *skipped* because a `$(key)` had no value, you get a red line naming the key and saying why — the power is not loaded, the holder does not have it, or it is not a resource. |
| **Keys** | Every change to the set of keys your client reports as held prints a red line: `held keys +key.origins.primary_active` when one goes down, `-key.origins.primary_active` when it comes up, both on one line when they change together. This is the exact stream the server drives [`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) from, so a condition that flickers when you did not touch the key shows up here as a stray `-`/`+` pair. |
| **Cooldowns** | Every cooldown reads as `0`, so abilities can be spammed. This applies to [`apoli:cooldown`](/docs/datapack/powers/cooldown) and to the `cooldown` field built into power types like [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) and [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile). |

The particles are sent **forced**, so they draw at any distance and through the particle-count setting, and only to players who have dev mode on. They are drawn per dev-mode player in the same dimension, whoever the actor was — so you can watch a mob's raycast, not just your own.

Outlines that come from a one-off action are drawn every time that action runs. Outlines that come from something evaluated every tick — a condition, a ticking power — redraw every ten ticks instead, which is often enough that the dust never lapses, and there is a per-tick particle budget on top, so a hundred mobs testing the same radius cannot flood the view.

> Nothing here changes what a power *does* except the cooldowns. The outlines are drawn from the same numbers the action uses, so if the shape looks wrong on screen, the shape is wrong.

Dev mode is per-session: it is not saved with the world, and it clears when the player disconnects.

## Permission

Needs permission level 2, or the `apoli.command.dev_mode` node.
