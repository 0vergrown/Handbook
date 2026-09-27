---
title: "Recipe powers that share, overlap and show their grid"
description: "Apoli 1.100.2 and Origins 1.46.4: recipe powers sharing an id no longer crash the server, overlapping power recipes reach every holder, crafting-recipe badges draw their grid in order, and Arachnids craft cobwebs on 1.20.1."
date: 2026-09-26
author: Overgrown
---

Apoli **1.100.2** and Origins **1.46.4**.

## Recipe powers can share an id

Two [`apoli:recipe`](/docs/datapack/powers/recipe) powers that wrote the same recipe `id` crashed the server the moment it finished starting, with `Duplicate recipe ignored with ID …` on 1.20.1 or `Multiple entries with same key` on 1.21.1. Every power recipe is added to the game's recipe list, and the game refuses two recipes under one id. Packs made for the original Origins run into this often, because there the id never had to be unique.

Identical recipes are now registered once, and any of their powers unlocks them. Different recipes under one id all work, each for the holders of its own power: the extra ones are registered under their power's id, a warning names them, and [`apoli:modify_crafting`](/docs/datapack/powers/modify_crafting) still matches them by the id you wrote. The details are in [Sharing an `id`](/docs/datapack/powers/recipe#sharing-an-id).

## Overlapping recipes reach every holder

When two recipe powers used the same ingredients, holders of the second one got an empty result slot: the game picks the first recipe that fits the grid, and if that recipe belonged to a power the player lacked, crafting stopped there. A player now gets the first fitting recipe they are allowed to craft. On 1.20.1 the powers stamped onto the crafted item come from that same recipe.

## Recipe badges draw their grid

The [`origins:crafting_recipe`](/docs/datapack/origins/badge_crafting_recipe) badge draws its grid between the `prefix` and the `suffix`. A badge with only a `suffix` showed it above the grid, and on 1.20.1 hovering a badge with neither crashed the game. The badge also accepts the recipe written out in full, the way the original Origins wrote it; packs using that form used to lose the badge with a `Not a string` error.

A badge that shows no grid now logs a warning naming its recipe. The usual cause is a recipe that never loaded: ingredients have to be `{ "item": … }` or `{ "tag": … }` objects, not plain strings, and on 1.21.1 the result names its item with `id`. The examples on the [badge](/docs/datapack/origins/badge_crafting_recipe), [recipe power](/docs/datapack/powers/recipe) and [crafting recipe](/docs/datapack/data-types/crafting-recipe) pages follow the 1.21.1 format.

## Arachnids craft cobwebs on 1.20.1

The Arachnid's cobweb recipe was written in the 1.21 format, so on 1.20.1 it never loaded and its badge was missing.

## Compatibility

Origins 1.46.4 needs Apoli 1.100.2 or newer. No data changes are needed, apart from fixing any recipe that the new warnings point at.
