---
title: "Prevent Item Use (Power Type)"
description: "Prevents the player from using items (right-click action such as eating food or using a shield, placing them as blocks will still work)."
navigation_title: "Prevent Item Use"
---

Prevents the player from using items (right-click action such as eating food or using a shield, placing them as blocks will still work).

Type ID: `apoli:prevent_item_use`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`item_condition` | Item Condition Type | _optional_ | If specified, only items that fulfills this condition will be prevented from being used.

## Examples

```json
{
    "type": "apoli:prevent_item_use",
    "item_condition": {
		"type": "apoli:food"
	}
}
```

This example will prevent the player from eating any food items.
