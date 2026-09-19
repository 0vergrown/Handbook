---
title: Water Protection
description: The armour enchantment that slows down water and rain damage for Enderians and Blazeborn.
---

**Water Protection** is an armour enchantment Origins adds for the origins that take damage in water — the Enderian and the Blazeborn. It goes on any enchantable armour piece, up to level IV, and it is mutually exclusive with Protection, Blast Protection, Fire Protection and Projectile Protection.

Enchantment id: `origins:water_protection`

| | |
|---|---|
| Slots | armour (helmet, chestplate, leggings, boots) |
| Max level | 4 per piece, and the four pieces are added together |
| Weight | 2 — as rare as Blast Protection |
| Obtainable from | the enchanting table, villager trades, enchanted books in loot |
| Exclusive with | `#minecraft:exclusive_set/armor` (the vanilla Protections) |

## What it does

It buys you **time**, not hit points. Each combined level adds 6 ticks — 0.3 seconds — to the gap between hits, up to 8 levels:

| Combined level | Gap between hits |
|---|---|
| 0 | 20 ticks (1s) |
| 2 | 32 ticks (1.6s) |
| 4 | 44 ticks (2.2s) |
| 6 | 56 ticks (2.8s) |
| 8 or more | 68 ticks (3.4s) |

Each hit is still a flat 2 damage. `origins:hurt_by_water` is in `#minecraft:bypasses_armor`, `#minecraft:bypasses_shield` and `#minecraft:bypasses_enchantments`, so nothing — armour points, Protection, a shield, or Water Protection itself — reduces the number. Armour only ever changes how often it lands.

There is no enchantment level that makes you immune. **Conduit Power does**: while `minecraft:conduit_power` is active, water and rain stop hurting entirely.

## Where the numbers live

All of it is one `origins:water_vulnerability` power, and every number in it is yours to change:

```json
{
  "type": "origins:action_over_time",
  "interval": "20 + min(enchantment[origins:water_protection, armor, sum], 8) * 6",
  "entity_action": {
    "type": "origins:damage",
    "amount": 2,
    "damage_type": "origins:hurt_by_water"
  },
  "condition": {
    "type": "origins:and",
    "conditions": [
      {
        "type": "origins:or",
        "conditions": [
          {
            "type": "origins:fluid_height",
            "fluid": "minecraft:water",
            "comparison": ">",
            "compare_to": 0.0
          },
          { "type": "origins:in_rain" }
        ]
      },
      {
        "type": "origins:status_effect",
        "effect": "minecraft:conduit_power",
        "inverted": true
      }
    ]
  }
}
```

`interval` is an [Expression](/docs/datapack/data-types/expression): `20` is the bare gap, `6` is what a level is worth, `8` is where it stops mattering. Because the interval is an expression, the power tests its condition every tick — so the first hit lands the moment you step into the rain, and putting armour on lengthens the gap before the next one.

Swap the `origins:status_effect` condition for something else to move immunity somewhere else, or delete it to take immunity away.

The enchantment itself has no effects of its own. It is a marker that the power reads, which is what makes the whole mechanic live in one file.
