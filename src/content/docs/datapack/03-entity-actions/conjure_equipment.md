---
title: "Conjure Equipment (Entity Action Type)"
description: "Conjures an item directly into an equipment or accessory slot of the entity."
navigation_title: "Conjure Equipment"
---

Conjures an item directly into an equipment or accessory slot of the entity. Conjured items are ephemeral: they cannot be placed into a chest, an ender chest, a crafting grid, an [apoli:inventory](/docs/datapack/powers/inventory) power or any other container, and the moment one reaches the ground — dropped, or dropped on death — it is deleted instantly. With `lock` enabled it cannot even be picked out of its slot in the inventory screen.

Type ID: `apoli:conjure_equipment`

> The action replaces whatever was in the slot (the previous item is overwritten, not dropped) — pair it with [equipped-item conditions](/docs/datapack/entity-conditions/equipped_item) if you need to guard against that. Works on any living entity, not just players.

## Fields

| Field  | Type                                    | Default      | Description                                                                                                          |
| ------ | --------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------- |
| `slot` | String  | *optional* | The vanilla equipment slot: `mainhand`, `offhand`, `head`, `chest`, `legs` or `feet` (the command-style `slot.` prefix is also accepted, e.g. `slot.mainhand`). |
| `accessory_slot` | [Accessory slot](/docs/compat/accessories/overview#slots), or an array of them | *optional* | An accessory slot to conjure into. Requires Trinkets, Accessories or Curios; without one of those installed this does nothing. |
| `item` | Item Stack | **required** | The item to conjure — item id, amount and components/NBT.                                                       |
| `lock` | Boolean | `false`     | While `true`, the item cannot be moved out of its slot via inventory clicking (shift-click included), cannot be dropped with the drop key, and cannot be unequipped from an accessory slot.                |

At least one of `slot` and `accessory_slot` must be present; the power fails to load otherwise. Giving both conjures the item into both.

When `accessory_slot` matches more than one slot, the item goes into the first **empty** match, and into the first match overall if none are empty — so a filter like `"ring"` behaves like equipping rather than overwriting.

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

Conjures an iron sword into the main hand that cannot be unequipped; if it somehow leaves the inventory it deletes itself.

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

Conjures a locked nether star into the first free `charm` accessory slot.

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

Conjures a Sharpness V diamond sword into the offhand. It can be moved around the owner's inventory freely, but is refused by every other container and deletes itself the moment it is dropped.
