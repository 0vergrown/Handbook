---
title: "Action On Item Pickup (Power Type)"
description: "Runs actions when the entity picks up an item."
navigation_title: "Action On Item Pickup"
---

Runs actions when the entity that has the power picks up an item. The actor is the entity that threw the item, if any, and the target is the entity that picked it up. Items that nobody threw, such as mob drops, broken blocks and items made with `/summon`, have no actor, so use `apoli:target_action` to act on the entity picking up.

Type ID: `apoli:action_on_item_pickup`

It works for players and for mobs that pick up loot, such as zombies, piglins, foxes, villagers and allays.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | If set, this action runs on the actor, the target or both once the item has been picked up. |
| `item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item just before it enters the inventory, so the item arrives already changed. For a player it only runs when the inventory has room for the item. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the actions only run when the actor and target pass this condition. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item about to be picked up passes this condition. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | When the entity has several of these powers, the ones with a higher priority run their actions first. |

## Examples

```json
{
	"type": "apoli:action_on_item_pickup",
	"bientity_action": {
		"type": "apoli:target_action",
		"action": {
			"type": "apoli:heal",
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

This heals the entity 1 heart whenever it picks up an item in the `#minecraft:flowers` item tag.

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

This tells every player when the entity with the power picks up an item that another entity threw, and who threw it.
