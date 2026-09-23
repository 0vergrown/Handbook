---
title: Water Protection
description: The armour enchantment that buys an Enderian or Blazeborn more time between hits of water damage.
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

It buys time, and nothing else. Each **combined level** across the four armour pieces adds 6 ticks — 0.3 seconds — to the gap between hits, up to 8 levels:

| Combined level | Gap between hits | Time to drop 20 hearts of health |
|---|---|---|
| 0 | 20 ticks (1s) | ~10s |
| 2 | 32 ticks (1.6s) | ~16s |
| 4 | 44 ticks (2.2s) | ~22s |
| 6 | 56 ticks (2.8s) | ~28s |
| 8 or more | 68 ticks (3.4s) | ~34s |

Every hit is a flat **2 damage (1 heart)** at every level. The enchantment does not soften it: `origins:hurt_by_water` sits in `#minecraft:bypasses_armor`, `#minecraft:bypasses_shield` and `#minecraft:bypasses_enchantments`, so armour points, a shield, plain Protection and Water Protection itself all leave the number alone.

The first hit lands the tick you touch water — the gap is the delay before the *next* one, not a grace period before the first. And the clock keeps running while you are dry, so two seconds on land really are two seconds off the next gap. Stepping in and out of a pool does not reset it.

The cap at 8 means two pieces of Water Protection IV already buy the whole 3.4 seconds, which leaves the other two slots free for Protection on everything that is not water. There is no level that makes you immune.

**Conduit Power does.** While `minecraft:conduit_power` is active, water and rain stop hurting entirely — a conduit is somewhere you build, not something you carry, so it makes a base safe without following you around.

## Where the numbers live

All of it is one `origins:water_vulnerability` power — an
[apoli:multiple](/docs/datapack/powers/multiple) holding three parts — and every number in it is
yours to change:

```json
{
  "type": "apoli:multiple",
  "damage": {
    "type": "apoli:action_over_time",
    "entity_action": {
      "type": "apoli:and",
      "actions": [
        {
          "type": "apoli:change_resource",
          "resource": "*:*_water_prot_level",
          "operation": "set",
          "change": "min(enchantment[origins:water_protection, armor, sum], 8) * 6 + 20"
        },
        {
          "type": "apoli:trigger_cooldown",
          "power": "*:*_interval"
        },
        {
          "type": "apoli:damage",
          "amount": 2,
          "damage_type": "origins:hurt_by_water"
        }
      ]
    },
    "interval": 1,
    "condition": {
      "type": "apoli:all_of",
      "conditions": [
        {
          "type": "apoli:resource",
          "resource": "*:*_interval",
          "comparison": "==",
          "compare_to": 0
        },
        {
          "inverted": true,
          "type": "apoli:status_effect",
          "effect": "minecraft:conduit_power"
        },
        {
          "type": "apoli:any_of",
          "conditions": [
            {
              "type": "apoli:fluid_height",
              "fluid": "minecraft:water",
              "comparison": ">",
              "compare_to": 0
            },
            {
              "type": "apoli:in_rain"
            }
          ]
        }
      ]
    }
  },
  "interval": {
    "type": "apoli:cooldown",
    "cooldown": "*:*_water_prot_level",
    "hud_render": {
      "should_render": false
    }
  },
  "water_prot_level": {
    "type": "apoli:resource",
    "enforce_limits": false,
    "retain_value": true,
    "hud_render": {
      "should_render": false
    }
  }
}
```

- `water_prot_level` is scratch space — an [apoli:resource](/docs/datapack/powers/resource) holding
  the length of the next gap, in ticks. Its [Expression](/docs/datapack/data-types/expression) is
  where the balance lives: `20` is the bare gap, `6` is what one combined level is worth, and `8` is
  where extra levels stop counting.
- `interval` is an [apoli:cooldown](/docs/datapack/powers/cooldown) that reads its length from that
  resource, so each hit sets the delay before the next one from the armour you were wearing when it
  landed. It keeps ticking down out of the water.
- `damage` is checked every tick and fires when the cooldown has run out, you are wet or rained on,
  and you do not have Conduit Power. A fresh cooldown starts at `0`, which is why the first hit is
  immediate. The order inside the `apoli:and` is load-bearing: the level is written first, the
  cooldown is started from it second, and the damage lands last.

Swap the `apoli:status_effect` condition for something else to move immunity somewhere else, or
delete it to take immunity away. Raise `8` to make high levels keep paying off, or put an
expression back in `amount` to trade the delay for a softer hit.

The enchantment itself has no effects of its own. It is a marker that the power reads, which is what
keeps the whole mechanic in one file.
