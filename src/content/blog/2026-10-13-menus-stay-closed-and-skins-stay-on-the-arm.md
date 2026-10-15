---
title: "Menus stay closed, and custom skins stay on the arm"
description: "Apoli 1.115.4: less garbage in crowded scenes, full BadOptimizations support, cheaper invisibility and glow checks, the key that closes an inventory or radial menu no longer reopens it, hat edits hold under Fresh Animations, and overlays stay attached through EMF Compat poses."
date: 2026-10-13
author: Overgrown
---

Apoli **1.115.4**, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Origins needs no update.

## Less garbage in crowded scenes

Apoli checks its powers inside vanilla code that runs constantly: collision checks between every pair of nearby entities, every entity drawn every frame, every movement tick. Several of those checks created short-lived objects on every call, whether or not anyone had a power. In a test scene with about 400 entities, Apoli was producing roughly 85 MB of garbage per second. Most of it came from collision checks, from positioning each entity for rendering, and from looking up client-side powers by entity id. It now produces almost none (about 0.1 MB/s), and the game's total allocation rate in that scene fell from 575 to 473 MB/s. That means fewer garbage-collection pauses on busy servers and on clients looking at crowds. Nothing about how powers behave has changed.

## Working with BadOptimizations

With [BadOptimizations](https://modrinth.com/mod/badoptimizations) installed, the game crashed while starting, naming Apoli's `apoli$disguiseModel`. BadOptimizations replaces the lookup that picks an entity's renderer with a cache, and Apoli's disguise hook sat inside the code it replaces. The hook now works on whatever renderer the lookup returns, so the two load together and a player disguise still gets the right arm width from the cache. Turning off `enable_entity_renderer_caching` is no longer needed.

BadOptimizations also skips lightmap redraws until something it watches changes, and an [`apoli:night_vision`](/docs/datapack/powers/night_vision) power wasn't one of those things: the power could take seconds to show, or never show with the daylight cycle stopped. Apoli now tells BadOptimizations to redraw when the power's strength changes.

With the FOV Effects slider at 0%, BadOptimizations skips the field-of-view modifier that [`apoli:modify_fov`](/docs/datapack/powers/modify_fov) works through, so a power with `affected_by_fov_effect_scale: false` — and any change to the spyglass zoom — did nothing. Apoli now turns that single BadOptimizations option off, and leaves the rest on.

On 1.20.1, BadOptimizations keeps entity flags such as invisibility and glowing in plain fields, so reading them is almost free. Apoli's [`apoli:invisibility`](/docs/datapack/powers/invisibility) and [`apoli:entity_glow`](/docs/datapack/powers/entity_glow) checks on those getters used to allocate on every call, enough to become the most expensive part of them. They are now allocation-free everywhere, with or without BadOptimizations, and skip themselves entirely while no loaded power uses those types. `isInvisible` on an entity without the power went from 11 ns and 64 bytes per call to 7.7 ns and none, and `isInvisibleTo` from 25 ns and 112 bytes to 12 ns and none. See [Performance Mods](/docs/compat/performance-mods).

## Closing a menu with its key

Pressing an [`apoli:inventory`](/docs/datapack/powers/inventory) power's key a second time closed the inventory and then, a tick later, opened it again: once the screen was gone, the same press was read as a new one. A press made while any screen is open no longer counts after the screen closes, so the key closes the inventory, or a [radial menu](/docs/datapack/entity-actions/radial_menu), and does nothing else. Let go and press again to reopen it.

## Hiding the hat under Fresh Animations

With [Entity Model Features](/docs/compat/custom-entity-models) and the Fresh Animations Player Extension, a [`modify_model_parts`](/docs/datapack/powers/modify_model_parts) power that hid the `hat` could still show it. The pack draws the hat from boxes of its own, which `hidden` never reached, and the EMF Compat addons copy the head's visibility onto the hat while they hold a pose, which undid `visible` for the length of a Better Combat swing. `visible` and `hidden` now hide the boxes the pack gives a part as well, so the hat stays hidden through both.

## Custom skins stay on the arm

After a Better Combat swing, an Iron's Spells cast or an Immersive Melodies song, with the EMF Compat addons that keep those poses under Fresh Animations, a [`custom_model_render`](/docs/datapack/powers/custom_model_render) skin on the first-person arm could drift off the hand until you cycled the camera with F5. Apoli holds the pack's animation while it draws its own layers, and the addons were lifting that hold. It now uses EMF's per-entity pause, which they respect, so the overlay stays on the arm.
