---
title: "Conjure Equipment (Entity Action Type)"
description: "Conjures an item directly into an equipment slot of the entity."
navigation_title: "Conjure Equipment"
---

Conjures an item directly into an equipment slot of the entity. Conjured items are ephemeral: the moment one leaves its owner's inventory — dropped on the ground, put into a chest or any other container, dropped on death — it is deleted instantly. With `lock` enabled it cannot even be picked out of its slot in the inventory screen.

Type ID: `apoli:conjure_equipment`

> The action replaces whatever was in the slot (the previous item is overwritten, not dropped) — pair it with [equipped-item conditions](/docs/datapack/entity-conditions/equipped_item) if you need to guard against that. Works on any living entity, not just players. Accessory (Trinkets/Accessories/Curios) slots are not supported yet.

## Fields

| Field  | Type                                    | Default      | Description                                                                                                          |
| ------ | --------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------- |
| `slot` | String  | **required** | The equipment slot: `mainhand`, `offhand`, `head`, `chest`, `legs` or `feet` (the command-style `slot.` prefix is also accepted, e.g. `slot.mainhand`). |
| `item` | Item Stack | **required** | The item to conjure — item id, amount and components/NBT.                                                       |
| `lock` | Boolean | `false`     | While `true`, the item cannot be moved out of its slot via inventory clicking (shift-click included).                |

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
    "slot": "offhand",
    "item": {
        "item": "minecraft:diamond_sword",
        "components": {
            "minecraft:enchantments": { "levels": { "minecraft:sharpness": 5 } }
        }
    }
}
```

Conjures a Sharpness V diamond sword into the offhand. It can be moved around the owner's inventory freely, but deletes itself the moment it is dropped or stashed in a container.
