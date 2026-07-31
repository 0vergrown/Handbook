---
title: "Using Item (Entity Condition Type)"
description: "Checks whether the entity is currently using an item (eating a food item, using a shield, drawing a bow, etc.) that fulfills the specified Item Condition Type."
navigation_title: "Using Item"
---

Checks whether the entity is currently using an item (eating a food item, using a shield, drawing a bow, etc.) that fulfills the specified Item Condition Type.

Type ID: `apoli:using_item`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`item_condition` | Item Condition Type | _optional_ | If specified, the condition will only evaluate to true if the item that is being used fulfills the specified item condition type.

## Examples

```json
"condition": {
    "type": "apoli:using_item",
    "item_condition": {
        "type": "apoli:food"
    }
}
```

This example will check if the entity is currently eating a food item.
