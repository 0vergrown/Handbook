---
title: "Cameras, zoom and mob variants"
description: "Apoli 1.107.0 and Origins 1.46.12: new camera, FOV, zoom and perspective types, custom_model_render on every mob, ignore_fluid and modify_hearing_range fixed, cooldowns with actions, and cheaper phasing."
date: 2026-10-02
author: Overgrown
---

Apoli **1.107.0** and Origins **1.46.12**. Origins has no changes of its own this time; it is built against the new Apoli.

## The camera is yours

Four new types put the camera in a data pack's hands:

- [`apoli:modify_camera`](/docs/datapack/powers/modify_camera) moves, turns, rolls and zooms the camera, or puts it on another entity picked by an entity set or a selector. Offsets can follow the camera (`local`), the yaw only, or the world; the camera can follow its anchor or stay where it was when the power turned on; and it can look where its anchor looks, where you look, at a fixed angle, or track you or its anchor.
- [`apoli:modify_fov`](/docs/datapack/powers/modify_fov) changes the field of view the way speed effects do. Its fields match Apace's Apoli.
- [`apoli:zoom`](/docs/datapack/powers/zoom) is a spyglass-style zoom with slower mouse turning, optional cinematic smoothing and a hidden hand. Its `zoom` takes an Expression, so a resource changed by [`apoli:action_on_scroll_wheel`](/docs/datapack/powers/action_on_scroll_wheel) gives you a scroll-wheel zoom.
- [`apoli:set_perspective`](/docs/datapack/entity-actions/set_perspective) switches between first person and the two third-person views, and the [`apoli:perspective`](/docs/datapack/entity-conditions/perspective) condition reads which one a player is in.

`modify_camera` also takes `keyframes`. Each [Camera Keyframe](/docs/datapack/data-types/camera-keyframe) sets any of the position, angles, roll and field of view at a time, eased by any of the usual curves or along a smooth Catmull-Rom path. That is enough for a dolly zoom, an orbit, a fixed tracking camera or a slow push-in, and with a tick-rate power on the world, a timelapse.

These powers decide whether they are active on the server, so their conditions can use anything, and they apply on the holder's client.

## Mob variants

[`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) now works on every mob, in both modes.

- **Texture mode** paints onto the mob's own model through its own UV layout. Repaint the mob's vanilla texture, grant the power, and the zombie, spider, ghast or slime wears it — replacing its texture outright, or drawn over it as an overlay. A slime's translucent shell takes the new texture with it.
- **Geometry mode** draws a Blockbench model on the mob. Bones named after the mob's model parts — a spider's `head` and `right_front_leg`, a ghast's `tentacle0` — follow those parts, and by default your model replaces the mob's.
- `body_parts` on a mob takes its own part names.

Pair it with a [global power set](/docs/datapack/introduction/powers#global-powers) and every zombie in the world can be your variant. The page has a table of part names for common mobs.

## ignore_fluid

[`apoli:ignore_fluid`](/docs/datapack/powers/ignore_fluid) had two problems.

Sprinting while fully under ignored water made you drop into swimming for a tick and stand back up, over and over, until you stopped sprinting. Your own client still believed you were underwater from your eyes alone. You no longer swim in a fluid you ignore.

Ignoring lava did nothing on NeoForge, where every fluid is updated in one pass that the power never saw. Every fluid block you touch is now tested on its own, on every loader, so lava can be walked through untouched and brushing the edge of a pool counts too.

`fluid_condition` is now optional and defaults to water, so the plain `apoli:ignore_water` from Apace's Apoli loads as it always did.

## modify_hearing_range

[`apoli:modify_hearing_range`](/docs/datapack/powers/modify_hearing_range) sent distant sounds to the holder, but the holder's own game still faded every sound out at its usual distance, so nothing seemed to change. The holder's client now stretches the falloff too: a power that triples the range makes far sounds audible and near ones louder.

A reminder from that page, since the report used it: `multiply_total` multiplies by one **plus** the value, so `"value": 3` is four times as far.

## Cooldowns run actions

[`apoli:cooldown`](/docs/datapack/powers/cooldown) has always been a resource underneath; now it takes the resource's actions too. `min_action` runs when the cooldown becomes ready, `max_action` when it is triggered, `on_change` on any value you name, and `start_value` sets where it starts. A cooldown that triggers itself again from `min_action` is a loop.

A cooldown now counts down on the world clock. It no longer rewrites itself every tick, which used to send its holder's power data to everyone watching on every tick it ran. It also keeps counting while its condition fails or its holder is away.

## HUD bars on every cooldown

Every power type with a `hud_render` draws its bar now. `apoli:action_on_scroll_wheel` and `apoli:action_on_mouse_movement` accepted one before and never showed it. The [HUD Render](/docs/datapack/data-types/hud-render#which-powers-draw-a-bar) page lists them all. For addon authors, a power type gets its bar by implementing `HudRendered` on its config — see [Cooldowns and HUD bars](/docs/addon/api/registering-power-types#cooldowns-and-hud-bars).

## Lighter phasing

Phasing is checked against every block an entity collides with, for every entity, every tick. That check now costs one array read while no one holds a phasing power, instead of a power lookup and an allocation per block, so an Origins server where nobody picked Phantom pays almost nothing for it. Climbing, walking on fluids and ignore_fluid use the same gate.

## Fixed along the way

- `apoli:scale`, which accepts the legacy `scale_type` field, did not run its suppression hooks and never ticked on projectiles or other non-living entities. Suppressing a scale power now shrinks the holder back, and scale works on projectiles.
