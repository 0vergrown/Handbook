---
title: "Accessory (Item Condition Type)"
description: "Checks whether the item can be worn as an accessory."
navigation_title: "Accessory"
aliases: ["trinket"]
---

Checks whether the stack is something an accessory mod recognises as equippable in an accessory slot.

Type ID: `apoli:accessory` (alias `apoli:trinket`)

> [!NOTE]
> This type only exists when an accessory mod is installed: [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. A pack that uses it must depend on one.

## Fields

This condition has no fields.

## Examples

```json
{
  "type": "apoli:prevent_item_use",
  "item_condition": { "type": "apoli:accessory" }
}
```

This origin can't use accessories at all.

```json
{
  "type": "apoli:modify_inventory",
  "item_condition": { "type": "apoli:accessory" },
  "item_action": { "type": "apoli:damage", "amount": 1 }
}
```

This action only damages the accessories in the inventory.
