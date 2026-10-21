---
title: "Conjure Equipment (Entity Action Type)"
description: "Puts a temporary item straight into an equipment or accessory slot of the entity."
navigation_title: "Conjure Equipment"
---

Conjures an item straight into an equipment or accessory slot of the entity. Conjured items are temporary. They can't be put in a chest, an ender chest, a crafting grid, an [apoli:inventory](/docs/datapack/powers/inventory) power or any other container, and the moment one reaches the ground (dropped, or dropped on death) it is deleted. With `lock` on, it can't even be taken out of its slot in the inventory screen.

Type ID: `apoli:conjure_equipment`

> [!WARNING]
> The action replaces whatever was in the slot, and the previous item is deleted instead of dropped. Pair it with [equipped item conditions](/docs/datapack/entity-conditions/equipped_item) if you need to guard against that. It works on any living entity, not only players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` | [String](/docs/datapack/data-types/string) | _optional_ | The vanilla equipment slot: `mainhand`, `offhand`, `head`, `chest`, `legs` or `feet`. The command-style `slot.` prefix is accepted too, as in `slot.mainhand`. |
| `accessory_slot` | [Accessory slot](/docs/compat/accessories/overview#slots), or an array of them | _optional_ | An accessory slot to conjure into. Needs Trinkets, Accessories or Curios, and does nothing without one of them. |
| `item` | [Item Stack](/docs/datapack/data-types/item-stack) | _required_ | The item to conjure: item ID, amount and components or NBT. |
| `lock` | [Boolean](/docs/datapack/data-types/boolean) | `false` | While `true`, the item can't be moved out of its slot by clicking in the inventory (shift-click included), can't be dropped with the drop key, and can't be unequipped from an accessory slot. |

At least one of `slot` and `accessory_slot` must be present, or the power fails to load. With both, the item is conjured into both.

When `accessory_slot` matches more than one slot, the item goes into the first empty match, or into the first match overall if none are empty, so a filter like `"ring"` behaves like equipping instead of overwriting.

## Examples

```json
{
    "type": "apoli:conjure_equipment",
    "slot": "mainhand",
    "lock": true,
    "item": {
        "item": "minecraft:iron_sword"
    }
}
```

This conjures an iron sword into the main hand that can't be unequipped. If it somehow leaves the inventory, it deletes itself.

```json
{
    "type": "apoli:conjure_equipment",
    "accessory_slot": "charm",
    "lock": true,
    "item": {
        "item": "minecraft:nether_star"
    }
}
```

This conjures a locked nether star into the first free `charm` accessory slot.

```json
{
    "type": "apoli:conjure_equipment",
    "slot": "offhand",
    "item": {
        "item": "minecraft:diamond_sword",
        "components": {
            "minecraft:enchantments": { "levels": { "minecraft:sharpness": 5 } }
        }
    }
}
```

This conjures a Sharpness V diamond sword into the offhand. It can be moved around the owner's inventory freely, but every other container refuses it and it deletes itself the moment it is dropped.
