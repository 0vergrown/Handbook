---
title: "Dev Mode (Command)"
description: "Toggles a debugging view that draws resource values as text, outlines area-of-effect and raycast shapes with particles, and removes cooldowns."
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
| **Area of effect** | Every [`apoli:area_of_effect`](/docs/datapack/entity-actions/area_of_effect) that runs draws its shape in blue dust — the real shape, including `offset`, `space` and a per-axis `radius`. Cubes get their twelve edges, spheres three rings, cones a base ring and slant lines, stars their eight faces. |
| **Raycasts** | Every [`apoli:raycast`](/docs/datapack/entity-actions/raycast) draws its path in red dust, out to where it actually stopped, with the `radius` tube or the `cone_angle` spread drawn at the far end. |
| **Commands** | Every [`apoli:execute_command`](/docs/datapack/entity-actions/execute_command) run by you echoes its finished command into your chat with `$(…)` macros already expanded, so you can see what actually ran rather than what was written. |
| **Cooldowns** | Every cooldown reads as `0`, so abilities can be spammed. This applies to [`apoli:cooldown`](/docs/datapack/powers/cooldown) and to the `cooldown` field built into power types like [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) and [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile). |

The particles are sent **forced**, so they draw at any distance and through the particle-count setting, and only to players who have dev mode on. They are drawn per dev-mode player in the same dimension, whoever the actor was — so you can watch a mob's raycast, not just your own.

> Nothing here changes what a power *does* except the cooldowns. The outlines are drawn from the same numbers the action uses, so if the shape looks wrong on screen, the shape is wrong.

Dev mode is per-session: it is not saved with the world, and it clears when the player disconnects.

## Permission

Needs permission level 2, or the `apoli.command.dev_mode` node.
