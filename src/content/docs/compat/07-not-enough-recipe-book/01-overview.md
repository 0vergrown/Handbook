---
title: Not Enough Recipe Book
description: How power-gated recipes and crafting modifications behave when NERB has removed the vanilla recipe book.
---

[Not Enough Recipe Book](https://modrinth.com/mod/notenoughrecipebook) (NERB) is an optimization mod that strips out the vanilla recipe book: it stops the book being saved to and loaded from player data, stops the server sending recipe-unlock packets, and makes `awardRecipes` a no-op. On a busy server that removes a meaningful amount of per-player save data and network traffic.

Apoli registers **no types** for NERB. This compat is **behaviour-gated**: everything below happens automatically when NERB is installed, and nothing changes when it is not.

## What Apoli does when NERB is installed

| Area | Behaviour |
| --- | --- |
| [`apoli:recipe`](/docs/datapack/powers/recipe) | Power-gated recipes stay craftable even with the `doLimitedCrafting` gamerule on. |
| [`apoli:modify_crafting`](/docs/datapack/powers/modify_crafting) | Follows `apoli:recipe`, so crafting modifications still apply to those recipes. |
| [`apoli:nbt`](/docs/datapack/entity-conditions/nbt) | Skips Apoli's own recipe-book work when snapshotting entity NBT. |

### Why `apoli:recipe` needs this

With `doLimitedCrafting` on, vanilla refuses to assemble a recipe the player has not unlocked in their recipe book. NERB never unlocks anything, so on a server running both, *every* recipe would become uncraftable — including the ones your `apoli:recipe` powers add.

That gate is redundant for Apoli's recipes anyway: **the power is the gate**. A player who holds the power may craft the recipe; a player who does not never sees a result in the output slot. So when NERB is present, Apoli lets its own power-gated recipes through the limited-crafting check. Vanilla and other mods' recipes are untouched — Apoli does not re-enable them, because that is NERB's decision to make.

Without NERB, nothing is bypassed and `doLimitedCrafting` behaves exactly as vanilla does.

### Why `apoli:nbt` gets faster

An `apoli:nbt` entity condition has to serialize the entity to compare against the tag you wrote, and for a player the recipe book is by far the largest part of that. Apoli normally works around this by suppressing recipe-book serialization and caching the snapshot for the rest of the tick, except when your condition explicitly mentions `recipeBook`.

Under NERB the recipe book always serializes as empty, so that special case is pointless: Apoli drops the suppression bookkeeping and lets conditions that mention `recipeBook` use the cached snapshot like every other condition. A condition matching on `recipeBook` contents will therefore never match anything on a NERB server — there is nothing in the book to match.

## Recipe book UI

NERB's own config (`buttonMode`) decides what happens to the recipe book button — removed, inert, or repurposed to toggle JEI/REI/EMI. Apoli does not interact with that setting. If you set NERB to `DISCOVERED` mode (which unlocks every recipe and applies no optimizations), the limited-crafting bypass above is never needed and never kicks in, because vanilla's own check already passes.
