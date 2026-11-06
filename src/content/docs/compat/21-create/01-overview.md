---
title: Create
description: "What the breathing and swimming powers do with Create's diving gear, and a power that shows Create's goggle overlay."
---

[Create](https://modrinth.com/mod/create) adds a diving set, made of a diving helmet, a backtank and diving boots, and Engineer's Goggles, which show stress, speed and other details when you look at a Create block. With Create installed, Apoli's breathing and swimming powers react to the diving set, and [`apoli:create_goggles`](/docs/compat/create/create_goggles) shows the goggle overlay without the goggles.

Create runs on NeoForge 1.21.1 and on Fabric 1.20.1, and this integration covers both. Create has no Fabric build for 1.21.1, so on that version none of it ever turns on.

Everything here is behaviour-gated. `apoli:create_goggles` is always registered and loads without Create, where it does nothing, and the other powers only change when Create is loaded.

## Diving helmets on land

[`apoli:water_breathing`](/docs/datapack/powers/water_breathing) with `suffocate_outside_water` makes an entity lose air out of water. A Create diving helmet worn with a backtank that still holds air stops that: the air bar stays full on land, and refills if it had started to drain.

The air comes out of the backtank at 1 unit a second, the rate Create uses for a diver underwater. Create's low-air and empty-tank warnings show up as usual, and once the backtank is empty the entity starts to suffocate again. A helmet with no backtank does nothing.

Apoli asks Create for the entity's backtanks, so a backtank in an accessory slot that Create supports counts too.

## Diving boots and swim speed

[`apoli:modify_swim_speed`](/docs/datapack/powers/modify_swim_speed) doesn't apply while the entity wears Create diving boots, so a fast swimmer in diving boots moves through water at the normal speed. That includes swim speed passed on by [`apoli:attribute_modify_transfer`](/docs/datapack/powers/attribute_modify_transfer).

The boots themselves work as Create made them, pulling the wearer down to walk along the bottom.

## Item tags

Three item tags decide what counts as diving gear, so a data pack can add another mod's gear to them.

| Tag | Holds | Read by |
| --- | --- | --- |
| `apoli:create/diving_helmets` | `create:copper_diving_helmet` and `create:netherite_diving_helmet` | Breathing on land |
| `apoli:create/backtanks` | Create's own `#create:pressurized_air_sources`, the copper and netherite backtanks | Data packs, such as the Origins water vulnerability |
| `apoli:create/diving_boots` | `create:copper_diving_boots` and `create:netherite_diving_boots` | Swim speed |

Every entry is optional, so without Create the tags load empty and nothing breaks.

> [!NOTE]
> The air for breathing on land always comes from Create's backtanks. A helmet added to `apoli:create/diving_helmets` draws from a Create backtank like Create's own helmets do, but an item added to `apoli:create/backtanks` doesn't hold any air.

## Checking for the diving set in a power

The tags work in any condition that tests an item. This condition passes while the entity wears the whole set:

```json
{
  "type": "apoli:all_of",
  "conditions": [
    {
      "type": "apoli:mod_loaded",
      "mod": "create"
    },
    {
      "type": "apoli:equipped_item",
      "equipment_slot": "head",
      "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
          "tag": "apoli:create/diving_helmets"
        }
      }
    },
    {
      "type": "apoli:equipped_item",
      "equipment_slot": "chest",
      "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
          "tag": "apoli:create/backtanks"
        }
      }
    },
    {
      "type": "apoli:equipped_item",
      "equipment_slot": "feet",
      "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
          "tag": "apoli:create/diving_boots"
        }
      }
    }
  ]
}
```

[`apoli:mod_loaded`](/docs/datapack/meta-conditions/mod_loaded) is decided once when the pack loads, and [`apoli:all_of`](/docs/datapack/meta-conditions/all_of) stops at the first condition that fails, so on a server without Create the equipment is never looked at.

Origins uses this check to keep water and rain off the Enderian and the Blazeborn while they wear the set, as the [Water Protection](/docs/datapack/origins/water-protection#diving-gear) guide explains.
