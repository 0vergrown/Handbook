---
title: Accessories
description: Accessory-slot types that work across Trinkets, Accessories and Curios.
---

Apoli speaks to three accessory frameworks — [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) and [Curios](https://modrinth.com/mod/curios) — through one bridge. The types below are the same whichever of them you have installed.

These types are **registration-gated**: they only exist when at least one accessory framework is loaded. A data pack that uses them on a server without one will fail to load that power.

Legacy `trinket` ids are aliased, so packs written for the older Apace types keep working.

## Types

| Type | Kind | Alias | What it does |
| --- | --- | --- | --- |
| [`apoli:modify_accessory_slots`](/docs/compat/accessories/modify_accessory_slots) | Power | `modify_trinket_slot(s)` | Add or remove accessory slots. |
| [`apoli:action_on_accessory_change`](/docs/compat/accessories/action_on_accessory_change) | Power | `action_on_trinket_change` | React to equip / unequip. |
| [`apoli:prevent_accessory_equip`](/docs/compat/accessories/prevent_accessory_equip) | Power | `prevent_trinket_equip` | Stop items going in. |
| [`apoli:prevent_accessory_unequip`](/docs/compat/accessories/prevent_accessory_unequip) | Power | `prevent_trinket_unequip` | Stop items coming out. |
| [`apoli:modify_accessory`](/docs/compat/accessories/modify_accessory) | Entity action | `modify_trinket` | Act on equipped accessories. |
| [`apoli:accessory_equipped_count`](/docs/compat/accessories/accessory_equipped_count) | Entity condition | `equipped_trinket_count` | Count what's worn. |
| [`apoli:accessory_slot_count`](/docs/compat/accessories/accessory_slot_count) | Entity condition | `trinket_slot_count` | Count available slots. |
| [`apoli:accessory`](/docs/compat/accessories/accessory) | Item condition | `trinket` | Is this item an accessory? |

## Slots

Anywhere a `slots` field appears it takes a list of accessory slots. Leaving it out (or empty) means "every slot".
