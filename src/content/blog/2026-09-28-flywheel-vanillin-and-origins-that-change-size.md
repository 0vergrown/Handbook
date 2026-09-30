---
title: "Flywheel, Vanillin and origins that change size"
description: "Apoli 1.103.0 and Origins 1.46.8: no more crash on /give with Vanillin on NeoForge, Apoli's render powers work on entities Flywheel draws, switching origins resizes you properly, and eye height follows scale on 1.20.1."
date: 2026-09-28
author: Overgrown
---

Apoli **1.103.0** and Origins **1.46.8**.

## The `/give` crash with Vanillin

A crash report came in from a NeoForge pack: `/give @s origins:orb_of_origin`, and the game closed with exit code 255. The orb had nothing to do with it. [Vanillin](https://modrinth.com/mod/flw-vanillin) 1.1.3 for NeoForge ships the mixin that lets it read item colours but never registers it, so once its dropped-item visuals are switched on in its config, the first item entity that comes into view crashes the game. `/give` spawns one for its pickup animation, so the orb was simply the first item in view.

Apoli now registers the missing mixin itself whenever Vanillin's own is absent, so Vanillin's item visuals work. A Vanillin build that registers its own is left alone.

If you can't update Apoli straight away, set `"minecraft:item"` back to `"DEFAULT"` in `config/vanillin-client.toml`, along with `item_frame`, `glow_item_frame` and `item_display` if they are forced on too.

## Render powers and Flywheel

Flywheel draws some entities with GPU instancing and skips the vanilla renderer for them, and the vanilla renderer is where Apoli's render powers work. With Vanillin installed, [`apoli:prevent_entity_render`](/docs/datapack/powers/prevent_entity_render) couldn't hide a minecart, [`apoli:entity_glow`](/docs/datapack/powers/entity_glow) couldn't outline one, and [`apoli:scale`](/docs/datapack/powers/scale) couldn't resize it.

Now, while one of those applies to an entity Flywheel is drawing, Apoli hands that entity back to the vanilla renderer, and returns it to Flywheel once nothing applies. The same goes for disguises, tick-rate changes, riders on players and emissive light. The [performance mods page](/docs/compat/performance-mods/overview#flywheel-and-vanillin) has the full list.

Apoli's own layers, [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) and its energy swirls, stay on the vanilla renderer. They're posed from the live player model every frame, and that pose only exists there. Flywheel mods leave players and mobs to the vanilla renderer too, so nothing changes for them.

## Switching origins resizes you

Moving from an origin with [`apoli:scale`](/docs/datapack/powers/scale) to one without kept the old size, both the hitbox and the camera. Moving back gave you the default size instead. Each switch landed one step behind the last, and your client and the server could disagree about how big you were. Granting, revoking or suppressing a scale power now resizes you straight away on both sides, however many times you switch.

## Eye height follows your size on 1.20.1

On 1.20.1, `base` and `height` grew the hitbox but left the camera where it was for players and for any mob whose eye height is a fixed number: villagers, zombies, skeletons and more. Eye height now follows [`apoli:eye_height`](/docs/datapack/data-types/scale-type), and with it `base` and `height`, on 1.20.1 as it already did on 1.21.1.

On every version, changing `eye_height` on its own now moves the camera even when the hitbox stays the same size.
