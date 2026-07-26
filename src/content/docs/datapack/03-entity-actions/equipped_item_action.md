---
title: "origins:equipped_item_action"
description: "[Entity Action Type](../entityactiontypes.md)"
---

Entity Action Type

Executes an Item Action Type on an item stack in a specified equipment slot.

Type ID: `origins:equipped_item_action`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`equipment_slot` | String | |  Which equipped item to execute the action on. One of: `"mainhand"`, `"offhand"`, `"head"`, `"chest"`, `"legs"`, `"feet"`.
`action` | Item Action Type | | The item action type to execute on the item stack in the specified equipment slot.


## Examples

```json
"entity_action": {
  	"type": "origins:equipped_item_action",
  	"equipment_slot": "mainhand",
  	"action": {
	  	"type": "origins:consume",
	  	"amount": 1
  	}
}
```

This example will "consume" (remove) 1 item from the item stack in the mainhand equipment slot.

