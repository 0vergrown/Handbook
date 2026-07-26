---
title: "origins:prevent_item_use"
description: "[Power Type](../powertypes.md)"
---

Power Type

Prevents the player from using items (right-click action such as eating food or using a shield, placing them as blocks will still work).

Type ID: `origins:prevent_item_use`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`item_condition` | Item Condition Type | _optional_ | If specified, only items that fulfills this condition will be prevented from being used.


## Examples

```json
{
    "type": "origins:prevent_item_use",
    "item_condition": {
		"type": "origins:food"
	}
}
```

This example will prevent the player from eating any food items.

