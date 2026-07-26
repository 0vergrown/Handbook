---
title: "apoli:action_on_item_pickup"
description: "Execute actions upon picking up an item."
---

Execute actions upon picking up an item.

Type ID: `apoli:action_on_item_pickup`

> In the context of this power type, the '**actor**' entity is the entity that may have thrown the item while the '**target**' entity is the entity that picked up the item.

##	Fields

Field | Type | Default | Description
------|------|---------|------------
`bientity_action` | Bi-entity Action Type | *optional* | If specified, this bi-entity action will be executed on either or both the '**actor**' and '**target**' entities.
`item_action` | Item Action Type | *optional* | If specified, this item action will be executed on the item that was picked up.
`bientity_condition` | Bi-entity Condition Type | *optional* | If specified, the actions will only be executed if this bi-entity condition is fulfilled by either or both the '**actor**' and '**target**' entities.
`item_condition` | Item Condition Type | *optional* | If specified, the actions will only be executed if this item condition is fulfilled by the item about to be picked up.

##	Examples

```json
{
	"type": "apoli:action_on_item_pickup",
	"bientity_action": {
		"type": "apoli:target_action",
		"action": {
			"type": "origins:heal",
			"amount": 2
		}
	},
	"item_condition": {
		"type": "apoli:ingredient",
		"ingredient": {
			"tag": "minecraft:flowers"
		}
	}
}
```

This example will recover 1 heart to the entity upon the entity picking up an item included in the `#minecraft:flowers` (`data/minecraft/tags/items/flowers.json`) item tag.

```json
{
	"type": "apoli:action_on_item_pickup",
	"bientity_action": {
		"type": "apoli:if_else",
		"condition": {
			"type": "apoli:actor_condition",
			"condition": {
				"type": "apoli:exists"
			}
		},
		"if_action": {
			"type": "apoli:and",
			"actions": [
				{
					"type": "apoli:actor_action",
					"action": {
						"type": "apoli:execute_command",
						"command": "tag @s add item_thrower"
					}
				},
				{
					"type": "apoli:target_action",
					"action": {
						"type": "apoli:execute_command",
						"command": "tellraw @a [{\"selector\": \"@s\", \"color\": \"yellow\"}, {\"text\": \"has picked up an item thrown by \", \"color\": \"green\"}, {\"selector\": \"@e[tag = item_thrower]\"}]"
					}
				},
				{
					"type": "apoli:actor_action",
					"action": {
						"type": "apoli:execute_command",
						"command": "tag @s remove item_thrower"
					}
				}
			]
		}
	}
}
```

This example will notify all players that the entity that has the power has picked up an item thrown by another entity.

