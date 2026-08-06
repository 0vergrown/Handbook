---
title: "Prevent Block Place (Power Type)"
description: "Prevents the player from placing a block."
navigation_title: "Prevent Block Place"
---

Prevents the player from placing a block.

Type ID: `apoli:prevent_block_place`

##	Fields

Field | Type | Default | Description
------|------|---------|------------
`entity_action` | Entity Action Type | *optional* | If specified, this entity action will be executed on the player upon being prevented from placing a block.
`held_item_action` | Item Action Type | *optional* | If specified, this item action will be executed on the item the player has used to try to place a block.
`place_to_action` | Block Action Type | *optional* | If specified, this block action will be executed at the position of the block the player tried to place.
`place_on_action` | Block Action Type | *optional* | If specified, this block action will be executed on the block the player tried to place a block on.
`item_condition` | Item Condition Type | *optional* | If specified, the specified actions will only be executed if the item the player has used to try to place a block fulfills this item condition.
`place_to_condition` | Block Condition Type | *optional* | If specified, the specified actions will only be executed if the block at the position of the block the player tried to place fulfills this block condition.
`place_on_condition` | Block Condition Type | *optional* | If specified, the specified actions will only be executed if the block the player tried to place a block on fulfills this block condition.
`directions` | Array of Strings | `["up", "down", "north", "south", "east", "west"]` | Determines whether the specified actions should be executed if the player tried to place a block at the specified side(s) of a block.
`hands` | Array of Hands | `["main_hand", "off_hand"]` | Determines whether the specified actions should be executed if the player used the specified hand(s) when trying to place a block.
`result_stack` | Item Stack | *optional* | If specified, this item stack will be given to the player upon trying to place a block.
`result_item_action` | Item Action Type | *optional* | If specified, this item action will be executed on the item that will be given to the player upon trying to place a block.

> This runs **before** the block is placed, so `place_to_condition` matches whatever is currently in that space — air, or the replaceable block being overwritten — not the block being placed.

##	Examples

```json
{
	"type": "apoli:prevent_block_place",
	"entity_action": {
		"type": "apoli:execute_command",
		"command": "tellraw @s {\"text\": \"Cannot place a block here!\", \"color\": \"red\"}"
	},
	"place_to_condition": {
		"type": "apoli:fluid",
		"fluid_condition": {
			"type": "apoli:still",
			"inverted": true
		}
	}
}
```

This example will prevent the player from placing blocks in spaces occupied by source fluids.
