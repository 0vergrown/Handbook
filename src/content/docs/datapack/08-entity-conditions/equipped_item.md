---
title: "Equipped Item (Entity Condition Type)"
description: "Checks whether the item in one of the entity's equipment slots passes an item condition."
navigation_title: "Equipped Item"
---

Checks whether the item in one of the entity's equipment slots passes an item condition.

Type ID: `apoli:equipped_item`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `equipment_slot` | [String](/docs/datapack/data-types/string) | _required_ | Which equipment slot to check: `"mainhand"`, `"offhand"`, `"head"`, `"chest"`, `"legs"` or `"feet"`. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _required_ | The condition the item in that slot must pass. |

## Examples

```json
"condition": {
    "type": "apoli:equipped_item",
    "equipment_slot": "mainhand",
    "item_condition": {
        "type": "apoli:harvest_level",
        "comparison": ">=",
        "compare_to": 2
    }
}
```

This checks whether the item in the entity's main hand has a harvest level of 2 or more.
