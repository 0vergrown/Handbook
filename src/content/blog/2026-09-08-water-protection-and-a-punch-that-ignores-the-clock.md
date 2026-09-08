---
title: "Water Protection, and a punch that ignores the clock"
description: "Origins 1.33.0 adds the Water Protection enchantment; Apoli 1.73.0 wires up apoli:prevent_use, adds apoli:both, gives apoli:punch cooldown control, and makes item components with enchantments and banner patterns parse."
date: 2026-09-08
author: Overgrown
---

Apoli **1.73.0** and Origins **1.33.0**. Two new toys, one long-requested enchantment, and a handful
of things that turned out never to have worked at all.

## Water Protection

Enderians and Blazeborn take damage from water and from rain, and the question people keep asking is
whether they can armour their way out of it. Now they can: **Water Protection** is an armour
enchantment up to level IV, as rare as Blast Protection, obtainable from the enchanting table,
villager trades and enchanted books, and mutually exclusive with the vanilla Protection family.

It reduces water and rain damage through exactly the same maths as Fire Protection — 2 protection
points per level per piece — and at a **combined level of 8 across your four armour slots the damage
stops entirely**. Four pieces of Water Protection II will do it, so will two pieces of IV.

The immunity cut-off is not baked into the enchantment. It is an
[`apoli:enchantment`](/docs/datapack/entity-conditions/enchantment) condition on the origin's power,
so a pack can raise it, lower it, or drop it and keep only the graded reduction. Everything in the
`#origins:water_protection` damage-type tag is covered, so a pack that adds its own drowning-style
damage only has to tag it. There is a [page on all of it](/docs/datapack/origins/water-protection).

## `apoli:prevent_use` now prevents use

`apoli:prevent_entity_use` and `apoli:prevent_being_used` parsed fine and did nothing — the power
type was registered without a runtime hook, so every field in it was decoration. Both now block the
right-click interaction on the server *and* on the client, so there is no half-played animation
before the server takes it back, and `bientity_action`, `held_item_action`, `result_stack` and
`result_item_action` all fire once per blocked interaction.

While we were in there: an item that is both food and a block — sweet berries, glow berries, nether
wart — took a route through `BlockItem` that skipped `apoli:prevent_item_use` entirely whenever you
were looking at a block. Pair `prevent_item_use` with
[`apoli:prevent_block_place`](/docs/datapack/powers/prevent_block_place) on sweet berries and the
berries went down your throat anyway. They no longer do.

## `apoli:both`, the action

There has always been an [`apoli:both`](/docs/datapack/bientity-conditions/both) *condition* that
tests an entity condition on the actor and the target. There is now a matching
[bi-entity action](/docs/datapack/bientity-actions/both) that runs an entity action on both of them,
which is what most people were reaching for when they nested an `apoli:actor_action` and an
`apoli:target_action` inside an `apoli:and`.

## Punching a crowd

[`apoli:punch`](/docs/datapack/bientity-actions/punch) runs a real melee swing, which means it
respects — and resets — the attack-strength cooldown. That is right for a single hit and badly wrong
for an area attack: the first mob takes a fully charged hit and everything after it takes the
minimum. Two new fields fix that.

```json
{
    "type": "apoli:area_of_effect",
    "radius": 5,
    "bientity_action": {
        "type": "apoli:punch",
        "ignore_cooldown": true,
        "reset_cooldown": false
    }
}
```

`ignore_cooldown` lands every punch at full strength; `reset_cooldown: false` leaves the player's own
swing timing where it was. You keep weapon scaling, enchantments and knockback — the things
`apoli:damage` cannot give you.

## `/disguise <targets> <disguise>`

The disguise command needed a `entity` or `player` literal before it would do anything. It no longer
does: `/disguise @s creeper`, `/disguise @s notch`, `/disguise @e[type=zombie] minecraft:villager
{Profession:"minecraft:librarian"}`. The argument is read as an entity type first and as a player
name second. The old sub-commands are all still there.

## Components in an item stack

On 1.21.1, an item stack written inside a power — a skill icon, `apoli:modify_harvest`'s `stack`,
`result_stack`, anything — was decoded without access to the game's dynamic registries. Anything that
referenced one failed:

```
Can't access registry ResourceKey[minecraft:root / minecraft:enchantment]
```

and banner patterns went one worse, asking for a full pattern definition (`asset_id`,
`translation_key`) where the id belonged. Enchantments, banner patterns, trim materials, jukebox
songs — everything datapack-driven — now parse the way they do everywhere else in the game:

```json
"stack": {
    "item": "minecraft:diamond_axe",
    "components": {
        "minecraft:enchantments": {
            "levels": { "minecraft:silk_touch": 1 }
        }
    }
}
```

## Waking up

`apoli:action_on_wake_up` fired whenever a player left a bed, including climbing straight back out of
one, which is how the Avian ended up laying an egg every time they touched a mattress. It now runs
only when the sleep actually finished. `"require_full_sleep": false` restores the old behaviour for
packs that want it.
