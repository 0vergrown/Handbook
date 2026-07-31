---
title: "Keep Inventory (Power Type)"
description: "Makes certain items persist in the entity's inventory."
navigation_title: "Keep Inventory"
---

Makes certain items persist in the entity's inventory.

Type ID: `apoli:keep_inventory`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`item_condition` | Item Condition Type | _optional_ | If specified, only make the items that fulfill the specified item condition type persist in the entity's inventory.
`slots` | Array of Integers | _optional_ | If specified, only make the items that are in the listed inventory slots persist in the entity's inventory.

## Examples

```json
{
    "type": "apoli:keep_inventory",
    "slots": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
    ]
}
```

This example will make items in the hotbar slots persist.
