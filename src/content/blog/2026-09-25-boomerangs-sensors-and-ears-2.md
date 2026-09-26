---
title: "Boomerangs, sensors and Ears 2"
description: "Apoli 1.98.0 and Origins 1.46.0: projectiles that come back, biome temperature and light as expression values, voice chat audiences, Ears 2 support, a centaur that keeps your skin, and a per-world Origins config that actually applies."
date: 2026-09-25
author: Overgrown
---

Apoli **1.98.0** and Origins **1.46.0**.

## Things that come back

[`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile#coming-back) has a `return` object. Give a shot one and it turns around — after hitting something, at `max_distance`, or after a set time in the air — and curves back to whoever threw it, through walls, the way a trident with Loyalty does. `speed` uses the same scale as Loyalty levels, `hit_while_returning` lets it strike on the way home, and `bientity_action_on_catch` runs when you catch it, which is where a boomerang refunds its own cooldown. The details are on [Projectile Return](/docs/datapack/data-types/projectile-return).

## Reading the world

Six new [expression variables](/docs/datapack/data-types/expression#reading-the-surroundings) turn the surroundings into numbers: `biome_temperature`, `brightness`, `light`, `block_light`, `sky_light` and `night_vision`. An origin that grows stronger in the cold no longer needs a ladder of biome conditions — feed the temperature into a resource a step at a time and the power ramps smoothly across biome borders.

[`apoli:night_vision`](/docs/datapack/powers/night_vision) takes an expression for its `strength`, so darkvision can rise exactly as the light falls instead of stepping through ten conditioned copies.

`attack_charge`, as a variable and as the [entity condition](/docs/datapack/entity-conditions/attack_charge), now reads the charge of the swing that is landing when used inside a hit, not the meter the game has already reset.

## Voice chat audiences

[`apoli:action_on_speak`](/docs/compat/simple-voice-chat/action_on_speak) gained `bientity_action`, `bientity_action_stop` and `bientity_condition`, which run on everyone close enough to hear you. [`apoli:modify_speaking_range`](/docs/compat/simple-voice-chat/modify_speaking_range) takes a `bientity_condition` too, deciding per listener — mute yourself, then let an entity set of people you pointed at hear you at full range. Both range powers are now listed with the rest of the [Simple Voice Chat](/docs/compat/simple-voice-chat/overview) integration.

## Ears 2, and wings

Tinting and hiding single Ears features works with Ears 2 as well as Ears 1.4, and Ears 2's `halo` and digitigrade legs have [body part names](/docs/datapack/data-types/body-part#wings-and-ears-features) of their own. Icarus wings also answer to `icarus_right_wing`, `icarus_left_wing` and `icarus_wings`, the names Figura uses.

## Centaurs keep their skin

`texture_location` on [`apoli:modify_player_model`](/docs/datapack/powers/modify_player_model#textures) now paints only the parts a model adds on top of the player — the horse half of `apoli:centaur` — and the player half always wears the player's own skin. Before, it replaced the player's skin as well, so a texture made for the horse wrecked the rider.

This changes packs that used `texture_location` to re-skin the player with a model such as `apoli:four_arms`. Move that texture to an [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) in `texture` mode next to the model power; it paints the swapped model, extra limbs included.

## Per-world Origins config

Each world has an [Origins config](/docs/datapack/origins/world-config) at `<world>/origins/config.json` that switches layers, origins and single powers off for that world alone. It now takes effect as soon as the world starts rather than only after a `/reload`, a switched-off origin also takes its powers away from players who already had it, and a file with a mistake in it is left alone instead of being overwritten.

## Compatibility

Origins 1.46.0 needs Apoli 1.98.0 or newer. Existing packs load and behave as before, apart from the `modify_player_model` texture change above.
