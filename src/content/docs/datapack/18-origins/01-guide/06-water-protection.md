---
title: Water Protection
description: The armour enchantment that shields Enderians and Blazeborn from water and rain.
---

**Water Protection** is an armour enchantment Origins adds for the origins that take damage in water — the Enderian and the Blazeborn. It behaves like the vanilla Protection family: it goes on any enchantable armour piece, up to level IV, and it is mutually exclusive with Protection, Blast Protection, Fire Protection and Projectile Protection.

Enchantment id: `origins:water_protection`

| | |
|---|---|
| Slots | armour (helmet, chestplate, leggings, boots) |
| Max level | 4 |
| Weight | 2 — as rare as Blast Protection |
| Obtainable from | the enchanting table, villager trades, enchanted books in loot |
| Exclusive with | `#minecraft:exclusive_set/armor` (the vanilla Protections) |

## What it does

Two things, and the second is the one players ask for:

1. **It reduces water and rain damage**, 2 protection points per level per piece, through the same armour-enchantment maths as Fire Protection. Everything in the `#origins:water_protection` damage-type tag is covered — that is `origins:hurt_by_water` out of the box.
2. **At a combined level of 8 or more across the four armour slots, the damage stops entirely.** Four pieces of Water Protection II, two of Water Protection IV, or any mix that adds up.

The cut-off lives in the origin's power, not in the enchantment, so a pack can move it:

```json
{
  "type": "apoli:enchantment",
  "enchantment": "origins:water_protection",
  "calculation": "sum",
  "comparison": "<",
  "compare_to": 8
}
```

That is an [`apoli:enchantment`](/docs/datapack/entity-conditions/enchantment) condition ANDed onto `origins:water_vulnerability`'s existing water-or-rain check. Raise `compare_to` to make immunity cost more armour, lower it to make it cheaper, or drop the condition to leave only the graded reduction.

## Using it on your own damage

The enchantment protects against any damage type in `#origins:water_protection`, so a pack that adds its own water damage only has to tag it:

`data/origins/tags/damage_type/water_protection.json`, in your own pack:

```json
{
  "replace": false,
  "values": [
    "mypack:soaked"
  ]
}
```

Tags merge, so this adds to the tag rather than replacing what Origins put in it.
