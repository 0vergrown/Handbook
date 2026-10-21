---
title: "Equipped Item Action (Entity Action Type)"
description: "Runs an item action on the item in one of the entity's equipment slots."
navigation_title: "Equipped Item Action"
---

Runs an item action on the item stack in one of the entity's equipment slots.

Type ID: `apoli:equipped_item_action`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `equipment_slot` | [String](/docs/datapack/data-types/string) | _required_ | The equipment slot to use: `"mainhand"`, `"offhand"`, `"head"`, `"chest"`, `"legs"` or `"feet"`. |
| `action` | [Item Action Type](/docs/datapack/item-actions) | _required_ | The item action to run on the stack in that slot. |

## Examples

```json
"entity_action": {
  	"type": "apoli:equipped_item_action",
  	"equipment_slot": "mainhand",
  	"action": {
	  	"type": "apoli:consume",
	  	"amount": 1
  	}
}
```

This consumes (removes) 1 item from the stack in the main hand.
