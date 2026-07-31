---
title: "Action On Block Place (Power Type)"
description: "Executes an action upon placing a block."
navigation_title: "Action On Block Place"
---

Executes an action upon placing a block.

Type ID: `apoli:action_on_block_place`

##	Fields

Field | Type | Default | Description
------|------|---------|------------
`entity_action` | Entity Action Type | *optional* | If specified, this entity action will be executed on the player upon placing a block.
`held_item_action` | Item Action Type | *optional* | If specified, this item action will be executed on the item the player has used to place a block.
`place_to_action` | Block Action Type | *optional* | If specified, this block action will be executed at the position of the block the player has placed.
`place_on_action` | Block Action Type | *optional* | If specified, this block action will be executed on the block the player placed a block on.
`item_condition` | Item Condition Type | *optional* | If specified, the specified actions will only be executed if the item the player has used to place a block fulfills this item condition.
`place_to_condition` | Block Condition Type | *optional* | If specified, the specified actions will only be executed if the block at the position of the block the player is about to place fulfills this block condition.
`place_on_condition` | Block Condition Type | *optional* | If specified, the specified actions will only be executed if the block the player is about to place a block on fulfills this block condition.
`directions` | [Array](/docs/datapack/data-types/array) of [String](/docs/datapack/data-types/string) | `["up", "down", "north", "south", "east", "west"]` | Determines whether the specified actions should be executed if the player is about to place a block at the specified side(s) of a block.
`hands` | [Array](/docs/datapack/data-types/array) of [Hand](/docs/datapack/data-types/hand) | `["main_hand", "off_hand"]` | Determines whether the specified actions should be executed if the player used the specified hand(s) when trying to place a block.
`result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | *optional* | If specified, this item stack will be given to the player upon placing a block.
`result_item_action` | Item Action Type | *optional* | If specified, this item action will be executed on the item that will be given to the player upon placing a block.

##	Examples

```json
{
	"type": "apoli:action_on_block_place",
	"entity_action": {
		"type": "apoli:heal",
		"amount": 2
	},
	"item_condition": {
		"type": "apoli:ingredient",
		"ingredient": {
			"item": "minecraft:wheat_seeds"
		}
	},
	"place_on_condition": {
		"type": "apoli:block",
		"block": "minecraft:farmland"
	},
	"directions": [
		"up"
	]
}
```
This example will heal the player upon the player placing Wheat Seeds on top of Farmland blocks.

```json
{
	"type": "apoli:action_on_block_place",
	"place_to_action": {
		"type": "apoli:and",
		"actions": [
			{
				"type": "apoli:area_of_effect",
				"radius": 4.00,
				"shape": "star",
				"block_action": {
					"type": "apoli:set_block",
					"block": "minecraft:air"
				}
			},
			{
				"type": "apoli:set_block",
				"block": "minecraft:magma_block"
			}
		]
	},
	"place_to_condition": {
		"type": "apoli:fluid",
		"fluid_condition": {
			"type": "apoli:in_tag",
			"tag": "minecraft:lava"
		}
	},
	"item_condition": {
		"type": "apoli:ingredient",
		"ingredient": {
			"item": "minecraft:netherrack"
		}
	}
}
```
This example will make Netherrack blocks placed by the player will absorb Lava fluid with a 4 radius star-shaped area, and replace the placed Netherrack with a Magma block.
