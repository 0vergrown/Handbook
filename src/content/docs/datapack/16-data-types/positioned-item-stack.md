---
title: "Positioned Item Stack"
description: "An Object which defines a new item stack alongside a position in an inventory."
---

An [Object](/docs/datapack/data-types/object) which defines a new item stack alongside a position in an inventory. Basically an [Item Stack](/docs/datapack/data-types/item-stack) with a `slot` field.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`item` | Identifier | | ID of a registered item.
`amount` | Integer | `1` | Size of the stack.
`tag` | NBT | _optional_ | NBT data of the item.
`slot` | Integer | _optional_ | Inventory slot position of the stack. If not specified, will be the first free slot in the inventory. See Positioned Item Stack Slots for possible values.


## Examples

```json
"stack": {
    "item": "minecraft:shield",
    "slot": 40
}
```

An item stack of a shield positioned in the off-hand slot of the player inventory.
