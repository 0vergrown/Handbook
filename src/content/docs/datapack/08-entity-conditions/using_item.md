---
title: "Using Item (Entity Condition Type)"
description: "Checks whether the entity is using an item, such as eating, blocking with a shield or drawing a bow."
navigation_title: "Using Item"
---

Checks whether the entity is using an item, such as eating food, blocking with a shield or drawing a bow, optionally one that passes an item condition.

Type ID: `apoli:using_item`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | The item being used must pass this condition. |

## Examples

```json
"condition": {
    "type": "apoli:using_item",
    "item_condition": {
        "type": "apoli:food"
    }
}
```

This checks whether the entity is eating.
