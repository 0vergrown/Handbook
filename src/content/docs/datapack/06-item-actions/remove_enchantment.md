---
title: "Remove Enchantment (Item Action Type)"
description: "Removes certain enchantments from the item."
navigation_title: "Remove Enchantment"
---

Removes certain enchantments from the item.

Type ID: `apoli:remove_enchantment`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`enchantment` | Identifier | _optional_ | If specified, this enchantment will be removed from the item.
`enchantments` | Array of Identifiers | _optional_ | If specified, these enchantments will be removed from the item.
`levels` | Integer | _optional_ | If specified, only the enchantments that has the specified level will be removed from the item.
`reset_repair_cost` | Boolean | `false` | Determines whether the 'repair cost' of the item should be reset.

## Examples

```json
"item_action": {
    "type": "apoli:remove_enchantment",
    "enchantment": "minecraft:mending",
    "reset_repair_cost": true
}
```

This example will remove the Mending enchantment from the item whilst resetting its 'repair cost'.
