---
title: "Wings, ears and a Hallow screen"
description: "Apoli 1.97.0 and Origins 1.45.0: Icarus wings and Ears features as body parts, animated overlays straight from a .mcmeta, per-hand held item scales, apoli:projectile_owner, off-hand punches, turtle helmets that finally suit water breathers, and a Hallow theme for October."
date: 2026-09-25
author: Overgrown
---

Apoli **1.97.0** and Origins **1.45.0**.

## Wings and ears are body parts now

Icarus wings and the features Ears draws from a skin have [body part names](/docs/datapack/data-types/body-part#wings-and-ears-features) of their own: `right_wing`, `left_wing` and `wings`, and `ears`, `right_ear`, `left_ear`, `horns`, `snout`, `tail`, `claws` (plus one name per claw), `ears_chest` and `ears_cape`.

Name them in [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) and [`apoli:model_color`](/docs/datapack/powers/model_color). Icarus wings are real model parts, so they take every transformation — tilt a wing, shrink it, hide it, tint it. Ears draws its features itself, so those can be hidden and tinted one at a time but follow the limb they hang from for everything else.

## Animated overlays

[`apoli:overlay`](/docs/datapack/powers/overlay#animated-textures) textures animate the vanilla way: stack the frames in the PNG and put a `.png.mcmeta` with an `animation` section next to it. `frametime`, `frames` and `interpolate` all work, because it is Minecraft's own animation code doing the work.

## One hand at a time

Two new [scale types](/docs/datapack/data-types/scale-type), `apoli:held_item_mainhand` and `apoli:held_item_offhand`, size the item in one hand without touching the other. Both sit on top of `apoli:held_item`, and both keep working when Pehkui is installed.

## Projectiles and punches

[`apoli:projectile_owner`](/docs/datapack/bientity-conditions/projectile_owner) passes when the target is a projectile the actor owns — your own arrows, not a tamed wolf and not somebody else's snowball. [`apoli:punch`](/docs/datapack/bientity-actions/punch) gained `hand`, so a punch can be thrown with the off hand and hit with whatever is held there.

## Turtle helmets for water breathers

A turtle helmet gave anyone with [`apoli:water_breathing`](/docs/datapack/powers/water_breathing) and `suffocate_outside_water` endless air on land, because the helmet tops Water Breathing up whenever your head is out of the water. For them it now runs the other way: topped up at 10 seconds underwater, counting down on land. Surfacing buys a Merling ten seconds of air, and a potion of Water Breathing still works on top.

## Hallow

The Origins screen dresses up for October with a Hallow theme, the same way it goes Rainbow for June and Frigid over Christmas. Pick it all year round with the GUI Theme setting (`gui_theme` in the Origins config). Underlined power names also stay inside the window when you scroll — their underline no longer draws across the bottom of the frame.

## Compatibility

Origins 1.45.0 needs Apoli 1.97.0 or newer. Existing packs load and behave as before, apart from the turtle helmet change above. The [`apoli:body_part`](/docs/datapack/damage-conditions/body_part) damage condition still refuses wing and Ears names — there is nothing there for a hit to land on — and now says so by name.
