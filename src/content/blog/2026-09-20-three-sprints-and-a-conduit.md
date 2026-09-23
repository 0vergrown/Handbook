---
title: "Three sprints and a conduit"
description: "Apoli 1.92.0 and Origins 1.42.1: prevent_sprinting actually prevents sprinting, walk_on_fluid stops drowning you under Sable, creative flight no longer feeds a sprint, and conduits now work for the origins that hate water."
date: 2026-09-20
author: Overgrown
---

Apoli **1.92.0** and Origins **1.42.1**. Three sprint-and-water bugs, and a conduit that finally
earns its place in an Origins world.

## An anchor, not a water-walker

The report was vivid: with [Sable](https://modrinth.com/mod/sable) installed, a `walk_on_fluid`
origin does not walk on water — it sinks to the seabed and cannot swim back up. You become an
anchor, only capable of moving deeper into the ocean.

`apoli:walk_on_fluid` never adds a shape. It answers a question the fluid block asks during
collision — *can the entity colliding with me stand on this fluid?* — and a source block that hears
"yes" hands back a solid top surface. Vanilla asks that question with two fluids: the one above the
block, and the block's own. It tests the entity against the block's own fluid and uses the one above
only to check that it is not more of the same fluid, which is what stops you standing on the middle
of a lake.

Sable swaps in its own collision context for every entity in the world, and its version tests the
entity against the fluid **above**. Above an ocean surface is air, an entity cannot stand on air, and
the surface stops existing.

That alone would just drop you in the water. What makes it an anchor is the other half of
`walk_on_fluid`: the same "can you stand on this?" answer also decides whether you swim or walk.
Standing on water means walking, and a walker in the ocean has no swim stroke, no water drag and
full gravity. Down you go.

Apoli now re-asks the question the vanilla way whenever a source fluid block would otherwise return
nothing, but only when Sable is installed — a world without it keeps the stock collision path
untouched. Striders on lava were broken the same way and are fixed by the same hook.

## prevent_sprinting now prevents sprinting

`apoli:prevent_sprinting` parsed, loaded, showed up in the power list and did nothing at all. It had
a codec and no implementation. It has one now, in two places: any `setSprinting(true)` on a living
entity is turned into a stop, so a sprint in progress ends rather than merely failing to restart,
and the client's own "can I sprint?" gate answers no, so the sprint never starts and no packet is
sent. A sprint packet that arrives anyway is refused server-side.

It works on any living entity now, not only players.

## Flying is not a meal

A smaller thing, found while testing something else: a player with `apoli:creative_flight` could
sprint at zero hunger, and an ordinary origin could not.

That is vanilla. The client's sprint gate reads *"more than 6 food points, **or** you may fly"*, so
any source of flight is also a source of infinite sprinting. That shortcut exists for creative mode,
where hunger is frozen anyway; it was never meant as a perk you could hand out in survival.

Apoli now keeps the shortcut for actual creative and spectator mode and takes it away from flight
granted by a power. A survival origin that flies still eats.

## Conduits, for the origins that hate water

Origins 1.42.1 rebalances Hydrophobia and gives the conduit two jobs.

For the **Enderian** and the **Blazeborn**, Water Protection now behaves like the enchantment it
looks like: it slows the damage down *and* softens it, and it never negates it. Each combined level
across the four armour slots adds 0.3 seconds to the gap between hits up to 8 levels — 2.4 seconds
on top of the base second — and takes 4% off each hit up to 16, so a full set of Water Protection IV
turns a 1-heart hit every second into a 0.36-heart hit every 3.4 seconds. The delay stops improving
halfway up; the reduction does not, which is what makes the second half of the set worth wearing.

The 4% is vanilla's own curve, `damage × (1 − points / 25)`. Sixteen points of a possible
twenty-five is as far as it goes, so zero is out of reach by construction rather than by a clamp.

What it does *not* do any more is grant immunity. Standing in an active conduit's field does — while
`minecraft:conduit_power` is on you, water and rain stop hurting entirely. Rain and water are
exactly the conditions vanilla applies conduit power in, so the two line up without any extra
plumbing.

The reduction is applied by the power rather than by a `minecraft:damage_protection` effect on the
enchantment, which is worth a sentence because it looks like the long way round. Water damage sits in
`#minecraft:bypasses_enchantments`. Taking it out of that tag is what an enchantment effect would
need — and it would also hand the same 4% per level to plain `minecraft:protection`, at which point
there is not much reason to go looking for the dedicated one.

For the **Merling** the same block does the opposite favour. An active conduit now treats any entity
that suffocates outside water as if it were in the water, and hands it Conduit Power on dry land
anywhere in range — 32 blocks for the smallest activating frame, 96 for a full one. Conduit Power
already stops the suffocation, so a Merling with a conduit at their base can walk out of the sea and
stay out, for as long as they stay inside the field. It is a build worth making, and a reason for a
Merling to be on the shore with everyone else.

The whole Hydrophobia mechanic is still one power file per origin, documented field by field on the
[Water Protection page](/docs/datapack/origins/water-protection). Every number in it — the base
second, the 0.3, the 4%, both caps, and which effect grants immunity — is a line you can edit.
