---
title: "Four fewer power types: why apoli:burn is now apoli:action_over_time"
description: "Damage Over Time, Burn, Exhaust and Modify Attribute could all be built from other types, so they are aliases now, and the generalisations that made that possible are useful on their own."
date: 2026-08-21
author: Overgrown
---

Apoli 1.39.0 removes four power types, and your data packs won't notice.

`apoli:damage_over_time`, `apoli:burn`, `apoli:exhaust` and `apoli:modify_attribute` were each doing something the engine could already do by combining other types. They are aliases now. The IDs still load, the JSON you already wrote still parses, and there is one less implementation behind each of them.

## The test

Before adding a power type, I ask one question: can a data pack already do this by combining what exists? If it can, the new type is a second way to say the same thing, and every second way is something to document, test, port across three loaders and keep working forever.

Run that test over the four:

| Type | What it actually was |
| --- | --- |
| `apoli:burn` | `apoli:action_over_time` with an `apoli:set_on_fire` action |
| `apoli:exhaust` | `apoli:action_over_time` with an `apoli:exhaust` action |
| `apoli:damage_over_time` | `apoli:action_over_time` with an `apoli:damage` action |
| `apoli:modify_attribute` | `apoli:attribute`, with the attribute written once instead of on every modifier |

Nothing in that column needed its own tick loop, its own state map or its own page.

`apoli:fire_immunity` had already gone the same way. It's `apoli:invulnerability` with a damage type tag, exactly as Origins writes it for the Blazeborn:

```json
{
  "type": "apoli:invulnerability",
  "damage_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:is_fire"
  }
}
```

## Aliases, not deletions

An alias in Apoli isn't a redirect that runs later. The ID resolves to the canonical type when the power is read, and if the legacy shape differs, Apoli rewrites the JSON at that moment, once, when the data pack loads, and never at runtime. `apoli:burn` becomes `apoli:action_over_time` before the power is ever ticked, so it is indexed, suppressed, synced and profiled as `apoli:action_over_time`.

This is what you write today:

```json
{
  "type": "apoli:burn",
  "burn_duration": 2,
  "interval": 20
}
```

This is what Apoli hands to the engine:

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "entity_action": {
    "type": "apoli:set_on_fire",
    "duration": 2
  }
}
```

Both are valid. Write the second one in new packs, because the moment you want the fire to also play a sound, you add a second action instead of asking for a new power type.

## What had to be generalised first

`apoli:damage_over_time` was the one that didn't collapse cleanly, and that turned out to be the useful part. It was carrying two features that belonged on the general type all along.

`onset_delay` is now a field on `apoli:action_over_time`. It waits that many ticks after the condition first becomes true before the action starts running. `rising_action` still fires straight away, so you can flash a message the moment the condition trips and only start hurting later:

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "onset_delay": 100,
  "rising_action": { "type": "apoli:play_sound", "sound": "minecraft:block.fire.ambient" },
  "entity_action": { "type": "apoli:damage", "amount": 2, "damage_type": "minecraft:on_fire" },
  "condition": { "type": "apoli:exposed_to_sun" }
}
```

It takes an [Expression](/docs/datapack/data-types/expression), so a resource can drive the delay: `"onset_delay": "20 + mypack:insulation * 26"`.

`apoli:difficulty` is a new entity condition. `damage_over_time` had a `damage_easy` field that nothing else in Apoli could express, and now anything can:

```json
{
  "type": "apoli:if_else",
  "condition": { "type": "apoli:difficulty", "difficulty": "easy" },
  "if_action": { "type": "apoli:damage", "amount": 1, "damage_type": "moremobs:melt" },
  "else_action": { "type": "apoli:damage", "amount": 2, "damage_type": "moremobs:melt" }
}
```

It takes one difficulty or a list, and there is a matching `difficulty` variable in expressions, from `0` for peaceful to `3` for hard.

That's the trade the whole change rests on: two general features in, four one-off types out. Any power can use `onset_delay` now, including the ones that never hurt you.

## The one thing that didn't survive

`apoli:damage_over_time` had `protection_enchantment` and `protection_effectiveness`, which stretched the onset delay along a `(protection * 2) ^ 1.3` curve based on how much of a given enchantment you were wearing. That's a very specific answer to a general question, and it only ever worked for enchantments.

It's gone. The replacement is the expression form of `onset_delay`. Track whatever you want to count as protection in an [`apoli:resource`](/docs/datapack/powers/resource), whether that's an enchantment level, a worn armour piece, a potion or a skill, and write the curve yourself:

```json
"onset_delay": "20 + mypack:protection * 26"
```

If a pack still sets the old fields, Apoli logs a warning naming the replacement once at load and carries on with the plain delay.

## Also in 1.39.0

`apoli:script` shrank the same way. It shipped with `tick` and `is_active` fields, and both were duplicates the day they were written: `tick` is `apoli:action_over_time` with an `apoli:script` action, and `is_active` is the `condition` every power already has, holding an `apoli:script` condition. The power type now only does the thing you can't build from other types, which is running a script when the power is granted or revoked.

## What this means for you

Nothing, if you have an existing pack. Every ID still loads, and the two data packs I used to test this release resolve all 268 of their type IDs between them.

For new packs, reach for `apoli:action_over_time` and `apoli:attribute` directly. And if you find yourself wanting a power type that is "X but on a timer" or "Y but only on Hard", that's a combination, and Apoli can already do it.
