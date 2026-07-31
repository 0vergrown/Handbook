---
title: "Equipped Item (Entity Condition Type)"
description: "Checks whether the entity has an item equipped in the specified equipment slot that fulfills the specified Item Condition Type."
navigation_title: "Equipped Item"
---

Checks whether the entity has an item equipped in the specified equipment slot that fulfills the specified Item Condition Type.

Type ID: `apoli:equipped_item`

## Fields

| Field            | Type                | Default | Description                                                                                                                        |
|------------------|---------------------|---------|------------------------------------------------------------------------------------------------------------------------------------|
| `equipment_slot` | [String](/docs/datapack/data-types/string)  |         | Determines which equipment slot to check for the item. Accepts `"mainhand"`, `"offhand"`, `"head"`, `"chest"`, `"legs"`, `"feet"`. |
| `item_condition` | Item Condition Type |         | The item condition type to check for on the item in the specified equipment slot.                                                  |

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

This example will check if the item in the entity's mainhand has a harvest level of 2 or more.
