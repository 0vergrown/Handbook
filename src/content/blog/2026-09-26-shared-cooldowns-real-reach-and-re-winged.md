---
title: "Shared cooldowns, real reach and Re-Winged"
description: "Apoli 1.99.0 and Origins 1.46.1: trigger_cooldown works on every cooldown, raycasts without a distance stop at your reach, a condition for being in someone's entity set, and Icarus: Re-Winged wings take part edits and tints."
date: 2026-09-26
author: Overgrown
---

Apoli **1.99.0** and Origins **1.46.1**.

## Two abilities, one cooldown

[`apoli:trigger_cooldown`](/docs/datapack/entity-actions/trigger_cooldown) starts the cooldown of any power that has one — `apoli:active_self`, key sequences, `fire_projectile`, the hit and kill powers — and not only `apoli:cooldown`. Pointed at an `active_self`, it used to do nothing at all, so two abilities could not share a cooldown. A cooldown that is already running is still left alone.

## Raycasts reach as far as you do

An [`apoli:raycast`](/docs/datapack/entity-actions/raycast) with no `distance` now stops where your hand does: 4.5 blocks for blocks and 3 for entities, plus any reach bonuses you have, creative's included. It used to be 20 blocks for both, so a "what am I looking at" check could see things you could not touch. The [raycast condition](/docs/datapack/entity-conditions/raycast) works the same way.

## Am I in a set?

[`apoli:in_entity_set`](/docs/datapack/entity-conditions/in_entity_set) is now an entity condition too. It counts the entity sets the entity belongs to — optionally only the sets of one power — and compares that number, so a party member can check its own membership without knowing who the leader is.

## Icarus: Re-Winged

Wings drawn by [Icarus: Re-Winged](https://modrinth.com/mod/icarus-rewinged) follow `apoli:modify_model_parts` and `apoli:model_color` the same way Icarus's own wings do. Re-Winged draws wings with its own models — every wing on 1.21.1, its own wing items on 1.20.1 — and those models skipped Apoli's part edits and tints until now.

## Compatibility

Origins 1.46.1 needs Apoli 1.99.0 or newer. Raycasts that leave out `distance` are shorter now; add `"distance": 20` to one that relied on the old range. Re-Winged support is drawn on each player's own game, so viewers need Apoli 1.99.0 too.
