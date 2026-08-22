---
title: "Accessory (Item Condition Type)"
description: Passes when the item can be worn as an accessory.
navigation_title: "Accessory"
aliases: ["trinket"]
---

Passes when the stack is something an accessory mod recognises as equippable in an accessory slot.

Type ID: `apoli:accessory` (alias `apoli:trinket`)

## Fields

_None._

## Examples

An origin that cannot use accessories at all:

```json
{
  "type": "apoli:prevent_item_use",
  "item_condition": { "type": "apoli:accessory" }
}
```

Only act on accessories inside a broader item action:

```json
{
  "type": "apoli:modify_inventory",
  "item_condition": { "type": "apoli:accessory" },
  "item_action": { "type": "apoli:damage", "amount": 1 }
}
```

> Needs an accessory mod — [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. These types do not exist without one, so a pack using them must depend on it.
