---
title: "Macros, resource triggers and raycasts you can see"
description: "Apoli 1.102.0 and Origins 1.46.7: reusable JSON macros, on_change for resources, placeholders that leave selectors alone, and a dev mode that draws every raycast's reach, beam and cone."
date: 2026-09-28
author: Overgrown
---

Apoli **1.102.0** and Origins **1.46.7**, with macros and `on_change` contributed by FLDebug10.

## Macros

Write a piece of power JSON once and call it anywhere with arguments. A [macro](/docs/datapack/introduction/macros) is a file in `powers` with `"type": "apoli:macro"` and a `value`; a call is an object with `"type": "apoli:macro"`, the macro's id and its `arguments`, and it can stand in for an action, a condition, a `hud_render`, a sub-power or a whole power.

```json
{
    "type": "apoli:macro",
    "macro": "example:macros/burst",
    "arguments": { "count": 12 }
}
```

Macros are expanded while the data pack loads, so the game never sees them — a power built from macros runs exactly like the same power written out by hand. A pack that uses no macros skips the expansion entirely. Mistakes are reported with the power, where in the file the call is and the macros it went through, and dev mode shows them in chat after every `/reload`. A macro that grows out of control — each level calling the next one twice — is stopped at 250,000 values and its power is left out, instead of stalling the reload.

## Resources react to changes

[`apoli:resource`](/docs/datapack/powers/resource#reacting-to-changes) takes an `on_change` list: each entry compares the new value with `value` or `values` and runs its `entity_action` when it matches, or on every change when it has neither. Inside those expressions, `value` is the new value. An action that keeps changing the resource that triggered it is stopped after 64 chained changes, with one warning in the log.

## Placeholders leave selectors alone

In an [`apoli:function`](/docs/datapack/powers/function) body — and in macros — only a name in square brackets is a placeholder: letters, digits, `_`, `-` and `.`. Target selectors like `@e[distance=..5]`, JSON text and table reads such as `example:table[0]` stay as written, so commands work inside a function without breaking it. Write `parameters` out and nothing else in brackets is touched; `"parameters": []` makes a body completely literal. A boolean argument spliced into text reads `true` or `false` on every Minecraft version.

## Dev mode draws every raycast

With [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) on, every raycast draws what it tested: red for raycasts that act, yellow for the raycast conditions and `can_see`. The bold line runs to where the ray stopped and a thinner one to its full reach; `radius` draws as the beam it really is and `cone_angle` as a cone with a rounded end. Blocks and entities that were hit are outlined, and a condition outlines what it rejected more faintly.

Conditions checked inside an `action_over_time` draw their outlines now as well — the green radius of `entity_in_radius` and `block_in_radius` included. Dev mode also prints a line whenever a resource's `min_action`, `max_action` or `on_change` runs.

## The raycast condition stops at walls

The [`apoli:raycast`](/docs/datapack/entity-conditions/raycast) entity condition judges the nearest thing the ray hits. A block that fails `block_condition` now blocks the ray like any other block; before, the ray went on through it and could pass on an entity behind the wall. `hit_bientity_condition` is tested on the nearest entity rather than on any entity along the ray.

## Compatibility

Origins 1.46.7 is built against this release and needs Apoli 1.100.2 or newer. A pack that used a failing `block_condition` to see entities through walls needs `"block": false` on that raycast instead.
