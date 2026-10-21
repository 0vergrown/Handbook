---
title: Not Enough Recipe Book
description: "How power-gated recipes and crafting changes behave when NERB has removed the vanilla recipe book."
---

[Not Enough Recipe Book](https://modrinth.com/mod/notenoughrecipebook) (NERB) is an optimisation mod that strips out the vanilla recipe book. It stops the book being saved to and loaded from player data, stops the server sending recipe unlock packets, and makes `awardRecipes` do nothing. On a busy server that removes a fair amount of save data and network traffic for each player.

Apoli registers no types for NERB. This compat is behaviour-gated: everything below happens automatically when NERB is installed, and nothing changes when it isn't.

## What Apoli does when NERB is installed

| Area | Behaviour |
| --- | --- |
| [`apoli:recipe`](/docs/datapack/powers/recipe) | Power-gated recipes stay craftable even with the `doLimitedCrafting` game rule on. |
| [`apoli:modify_crafting`](/docs/datapack/powers/modify_crafting) | Follows `apoli:recipe`, so crafting changes still apply to those recipes. |
| [`apoli:nbt`](/docs/datapack/entity-conditions/nbt) | Skips Apoli's own recipe book handling when it takes a snapshot of entity NBT. |

### Why `apoli:recipe` needs this

With `doLimitedCrafting` on, vanilla refuses to make a recipe the player hasn't unlocked in their recipe book. NERB never unlocks anything, so on a server running both, every recipe would become uncraftable, including the ones your `apoli:recipe` powers add.

For Apoli's recipes that check adds nothing, because the power already decides who can craft. A player who holds the power can craft the recipe, and a player who doesn't never sees a result in the output slot. So when NERB is present, Apoli lets its own power-gated recipes through the limited crafting check. Vanilla recipes and other mods' recipes are untouched, and Apoli doesn't re-enable them, because that is NERB's decision to make.

Without NERB, nothing is bypassed and `doLimitedCrafting` behaves exactly as it does in vanilla.

### Why `apoli:nbt` gets faster

An `apoli:nbt` entity condition has to serialise the entity to compare it against the tag you wrote, and for a player the recipe book is by far the largest part of that. Apoli normally works around this by leaving the recipe book out of the snapshot and caching the snapshot for the rest of the tick, except when your condition explicitly mentions `recipeBook`.

Under NERB the recipe book always serialises as empty, so that special case is pointless. Apoli drops the extra bookkeeping and lets conditions that mention `recipeBook` use the cached snapshot like every other condition. A condition matching on `recipeBook` contents therefore never matches anything on a NERB server, because there is nothing in the book to match.

## Recipe book screen

NERB's own config (`buttonMode`) decides what happens to the recipe book button: removed, inert, or used to toggle JEI, REI or EMI. Apoli doesn't touch that setting. If you set NERB to `DISCOVERED` mode, which unlocks every recipe and applies no optimisations, the limited crafting bypass above is never needed and never runs, because vanilla's own check already passes.
