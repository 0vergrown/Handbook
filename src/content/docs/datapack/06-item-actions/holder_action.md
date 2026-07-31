---
title: "Holder Action (Item Action Type)"
description: "Executes an entity action on the holder of the item stack."
navigation_title: "Holder Action"
aliases: ["holder"]
---

Executes an entity action on the holder of the item stack.

Type ID: `apoli:holder_action`

Aliases: `apoli:holder`

##	Fields

Field | Type | Default | Description
------|------|---------|------------
`action` | Entity Action Type | *optional* | The entity action to execute on the holder of the item stack.
`entity_action` | Entity Action Type | *optional* | The same as the `action` field, but with a different name.

##	Examples

```json
"item_action": {
	"type": "apoli:holder_action",
	"action": {
		"type": "apoli:heal",
		"amount": 4.0
	}
}
```

This example will recover 2 hearts (4 health points) of the holder of the item stack.
