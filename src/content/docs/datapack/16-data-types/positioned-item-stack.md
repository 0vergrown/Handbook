---
title: "Positioned Item Stack (Data Type)"
description: "An object that describes an item stack and the inventory slot it goes in."
navigation_title: "Positioned Item Stack"
---

An [Object](/docs/datapack/data-types/object) that describes a new item stack along with a position in an inventory. It is an [Item Stack](/docs/datapack/data-types/item-stack) with a `slot` field.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `item` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of a registered item. |
| `amount` | [Integer](/docs/datapack/data-types/integer) | `1` | The size of the stack. |
| `tag` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | NBT data of the item. |
| `slot` | [Integer](/docs/datapack/data-types/integer) | _optional_ | The inventory slot the stack goes in. Without it, the stack goes in the first free slot. |

## Examples

```json
"stack": {
    "item": "minecraft:shield",
    "slot": 40
}
```

A shield placed in the offhand slot of a player's inventory.
