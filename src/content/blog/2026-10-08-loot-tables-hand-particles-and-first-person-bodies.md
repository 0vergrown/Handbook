---
title: "Loot tables, particles that stay on the hand, and first-person bodies"
description: "Apoli 1.111.0 and Origins 1.47.3: apoli:replace_loot_table works, particles anchored to a hand land on the hand in every view, first-person arm pitch animates, and Better Combat and Iron's Spells no longer draw your whole body in front of your face."
date: 2026-10-08
author: Overgrown
---

Apoli **1.111.0** and Origins **1.47.3**, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Both sides of a NeoForge server need the same Apoli version.

## apoli:replace_loot_table works

[`apoli:replace_loot_table`](/docs/datapack/powers/replace_loot_table) loaded without complaint and then never replaced anything. It now does, on all three loaders: killed mobs, broken blocks, opened chests, fishing and piglin bartering all roll the replacement, `apoli:replaced_loot_table` inside a replacement rolls the table it replaced, and `priority` decides which of several replacements wins. An invalid regular expression in `replace` is reported when the power loads, and a replacement table that doesn't exist is skipped with a warning.

The page's double-drops example used `name` for its nested `minecraft:loot_table` entry, which 1.21.1 rejects. It uses `value` now, the 1.21.1 field.

## Particles on the hand

[`apoli:spawn_particles`](/docs/datapack/entity-actions/spawn_particles) and [`apoli:particle`](/docs/datapack/powers/particle) with a `model_part` used to guess where the part was on the server, and the guess drifted away from a [`modify_model_parts`](/docs/datapack/powers/modify_model_parts) animation: the first particles of a reload landed by your side, later ones ahead of the hand, and in first person you saw none of them. Each player's game now places the particles on the part as it draws it — in step with the animation, on poses from Better Combat, Iron's Spells and other playerAnimator mods too, and at your own hand on screen when you are in first person.

## First-person arm animations

A `modify_model_parts` pitch with `"perspectives": "first_person"` never showed: Minecraft levels the arm right before drawing it in first person. It now animates like every other first-person edit.

## Better Combat and Iron's Spells in first person

Hiding a single part with `modify_model_parts` — the hat layer, say — made Better Combat attacks and Iron's Spells casts draw your whole body in first person, head and all, right in front of the camera. Those mods hide everything but the arms for that view, and Apoli was switching the rest back on. It leaves other parts alone now. The same mistake could give a spectator a full ghostly body instead of a floating head, and ignore skin-layer toggles, whenever any `modify_model_parts` power was active.

## Origins

Built against Apoli 1.111.0; no other changes.
