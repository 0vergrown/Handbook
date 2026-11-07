---
title: Accessories
description: "Accessory slot types that work the same across Trinkets, Accessories and Curios."
---

Apoli talks to three accessory frameworks, [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) and [Curios](https://modrinth.com/mod/curios), through one bridge. The types below are the same whichever of them you have installed.

These types are registration-gated: they only exist when at least one accessory framework is loaded. On a server without one, a power that uses them fails to load.

The older `trinket` IDs are aliases, so packs written for the Apace types keep working.

## Types

| Type | Kind | Alias | What it does |
| --- | --- | --- | --- |
| [`apoli:modify_accessory_slots`](/docs/compat/accessories/modify_accessory_slots) | Power | `modify_trinket_slot`, `modify_trinket_slots` | Adds or removes accessory slots. |
| [`apoli:action_on_accessory_change`](/docs/compat/accessories/action_on_accessory_change) | Power | `action_on_trinket_change` | Reacts to equipping and unequipping. |
| [`apoli:prevent_accessory_equip`](/docs/compat/accessories/prevent_accessory_equip) | Power | `prevent_trinket_equip` | Stops items going in. |
| [`apoli:prevent_accessory_unequip`](/docs/compat/accessories/prevent_accessory_unequip) | Power | `prevent_trinket_unequip` | Stops items coming out. |
| [`apoli:modify_accessory`](/docs/compat/accessories/modify_accessory) | Entity action | `modify_trinket` | Acts on equipped accessories. |
| [`apoli:equipped_accessory`](/docs/compat/accessories/equipped_accessory) | Entity condition | | Checks whether a matching item is worn. |
| [`apoli:accessory_equipped_count`](/docs/compat/accessories/accessory_equipped_count) | Entity condition | `equipped_trinket_count` | Counts what is worn. |
| [`apoli:accessory_slot_count`](/docs/compat/accessories/accessory_slot_count) | Entity condition | `trinket_slot_count` | Counts the available slots. |
| [`apoli:accessory`](/docs/compat/accessories/accessory) | Item condition | `trinket` | Checks whether an item is an accessory. |

## Slots

Wherever a `slots` field appears, it takes a list of accessory slots. Leaving it out, or leaving it empty, means every slot.

A slot is written either as a string or as an object, and a single slot can be given on its own instead of in an array:

```json
"slots": "charm"
"slots": "hand/ring"
"slots": "hand/ring/1"
"slots":[
   {
      "group":"hand",
      "slot":"ring",
      "index":1,
      "provider":"trinkets"
   }
]
```

The string form is `slot`, `group/slot` or `group/slot/index`. Every part is a filter, and anything you leave out matches everything. A part written as `*` matches everything too, so `"*"` on its own means any slot. `provider` (`trinkets`, `accessories` or `curios`) limits a slot to one framework, which only matters when two are installed at once.

Only Trinkets puts slots in groups. Accessories and Curios slots have no group, so a filter like `"hand/ring"` only finds Trinkets slots, while `"ring"` finds a ring slot in any of the three.

When the Accessories compatibility layer is installed, it serves Curios and Trinkets items out of Accessories' own slots. Apoli then reads those slots once, through Accessories, so an item is never counted twice and `apoli:action_on_accessory_change` fires once per change.

[`apoli:conjure_equipment`](/docs/datapack/entity-actions/conjure_equipment) and the [`apoli:equipped_item`](/docs/datapack/entity-conditions/equipped_item) condition use the same format in their `accessory_slot` field. Both are core Apoli and aren't gated, and the field does nothing when no accessory framework is installed.
