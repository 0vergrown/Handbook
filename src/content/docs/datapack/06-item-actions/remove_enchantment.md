---
title: "Remove Enchantment (Item Action Type)"
description: "Removes some or all of the item's enchantments."
navigation_title: "Remove Enchantment"
---

Removes some or all of the item's enchantments.

Type ID: `apoli:remove_enchantment`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enchantment` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | An enchantment to remove from the item. |
| `enchantments` | [Array](/docs/datapack/data-types/array) of Identifiers | _optional_ | Several enchantments to remove from the item. |
| `levels` | [Integer](/docs/datapack/data-types/integer) | _optional_ | Only removes enchantments at this level. |
| `reset_repair_cost` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the item's repair cost is reset. |

## Examples

```json
"item_action": {
    "type": "apoli:remove_enchantment",
    "enchantment": "minecraft:mending",
    "reset_repair_cost": true
}
```

This removes Mending from the item and resets its repair cost.
