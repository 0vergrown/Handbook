---
title: "Glowing blocks, and resources with decimals"
description: "Apoli 1.126.0 and Origins 1.51.0: blocks that glow through walls for the players you pick, resources that hold decimals, a random_chance condition that takes expressions, and edible items that finally use their own sound."
date: 2026-11-06
author: Overgrown
---

This is Apoli 1.126.0 and Origins 1.51.0, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Update the client, the server and Origins together. Resources travel to clients in a new format, so a mismatched pair is turned away at login with a message asking for the same Apoli build on both sides.

## Glowing blocks

There are two new ways to make blocks glow. [`apoli:glow`](/docs/datapack/block-actions/glow) is a block action, so it runs wherever block actions run, and an [`apoli:area_of_effect`](/docs/datapack/block-actions/area_of_effect) around it covers every matching block nearby. [`apoli:block_glow`](/docs/datapack/powers/block_glow) is a power that highlights the blocks around its holder, and only the holder sees them.

Both have two looks. `"outline"` draws the Glowing effect's colored outline around the block, and it shows through walls. `"glow"` draws the block itself in front of everything else at full brightness, so you see the actual diamond ore through the stone, tinted by the color you pick. Chests, signs and other block entities are drawn too, facing the way they really face.

![A stone wall with two diamond ores outlined in cyan through it, a gold ore and a chest drawn through the wall, and a torch in front with a yellow outline that follows its shape.](/assets/blog/glowing-blocks-and-resources-with-decimals/block-glow.png "Outlined diamond ore, a gold ore and a chest drawn through the wall, and an outlined torch")

`respect_bounding` decides the shape. Left on, the outline fits the block, so the torch above gets a thin box. Turned off, every block gets a full cube.

The action has an `entity_condition`. The server checks it against every player a few times a second, so a glow can be for one team, or only for players who are sneaking. A `duration` of `0` keeps a glow until the block changes, and glows are saved with the world, so they're still there after a restart. Any glow ends the moment its block is mined or replaced.

## Resources with decimals

I asked Xridge, who made Origins: Math, what should change about resources to make them more useful. The answer was to store them as decimals instead of whole numbers, which is what this release does, without adding any new resource types.

A [resource](/docs/datapack/powers/resource) can hold `0.25` or `12.5` now, and everything that touches resources goes along with it:

- [`apoli:modify_resource`](/docs/datapack/entity-actions/modify_resource) writes the decimal its modifier works out. It used to round the result to a whole number, so a step of `0.25` never moved the value at all.
- `min`, `max`, `start_value` and the values in `on_change` take decimals, and so does `compare_to` on the [resource condition](/docs/datapack/entity-conditions/resource).
- `/resource set` and `change` take decimals, `get` takes a scale for `/execute store`, and `operation` keeps the fractions.
- Expressions read the exact value, and macros print `2.5` where there's a decimal and `2` where there isn't.
- The [`apoli:resource`](/docs/datapack/advancement-triggers/resource) advancement trigger takes decimal bounds.

Values keep six decimal places and every change is rounded to that, so adding `0.1` ten times lands exactly on `1`, `max_action` fires, and an `on_change` entry at `0.3` matches when the value gets there. Whole numbers behave the way they always did, old worlds load fine, and a resource that only ever held whole numbers saves exactly as before.

[HUD bars](/docs/datapack/data-types/hud-render) fill in proportion to the value. While checking that, I found that the bar art has a dark pixel at each end, so a value just above the minimum looked empty and one just below the maximum looked full. The fill now spreads over the space between those borders, so a bar only looks full at the maximum and only looks empty at the minimum.

Cooldowns still count whole ticks, and a decimal written to one is rounded to the nearest tick.

## Expressions in random_chance

The [`apoli:random_chance`](/docs/datapack/meta-conditions/random_chance) condition takes an [expression](/docs/datapack/data-types/expression) for `chance`, the same as the action always has. `"chance": "mypack:luck / 10"` passes more often the more luck you have. The block version of both reads the entity behind the block action when there is one, so a block condition's odds can follow that entity's resources.

## Edible items and their sound

`consume_sound` on [`apoli:edible_item`](/docs/datapack/powers/edible_item) only played once, after the item was already eaten. The whole time you were eating, you heard the normal eating or drinking sound, which made it sound as if the field did nothing. It now replaces that sound from the first bite. Leaving it out keeps the sound that fits the animation, so a drink sounds like a drink.

## Origins

Origins 1.51.0 is built for this Apoli and copies decimal resources when [`origins:copy_origin`](/docs/datapack/origins/copy_origin) moves an origin from one entity to another.
