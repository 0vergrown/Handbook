---
title: "Prevent Item Use (Power Type)"
description: "Stops the player from using items, such as eating food or raising a shield."
navigation_title: "Prevent Item Use"
---

Stops the player from using items with a right-click, such as eating food or raising a shield. Placing an item as a block still works.

Type ID: `apoli:prevent_item_use`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, only items that pass this condition are blocked. |

## Examples

```json
{
    "type": "apoli:prevent_item_use",
    "item_condition": {
		"type": "apoli:food"
	}
}
```

This stops the player from eating any food.
