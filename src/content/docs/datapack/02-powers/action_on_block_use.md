---
title: "Action On Block Use (Power Type)"
description: "Executes a Block Action Type and/or Item Action Types when the player that has the power 'uses' (right-clicks) a block."
navigation_title: "Action On Block Use"
---

Executes a Block Action Type and/or Item Action Types when the player that has the power "uses" (right-clicks) a block.

Type ID: `apoli:action_on_block_use`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_action` | Entity Action Type | _optional_ | If specified, this entity action type will be executed if all conditions are met.
`block_action` | Block Action Type | _optional_ | If specified, the used block will run this action if all conditions are met.
`block_condition` | Block Condition Type | _optional_ | If specified, only execute the specified actions if this condition is fulfilled by the used block.
`item_condition` | Item Condition Type | _optional_ | If specified, only execute the specified actions if this condition is fulfilled by the item in the 'actor' (the player that has the power) entity's specified hand(s) determined by the `hands` string field.
`directions` | [Array](/docs/datapack/data-types/array) of [String](/docs/datapack/data-types/string) | `["north", "east", "south", "west", "up", "down"]` | If specified, only execute the specified actions if you used the specified face of the block.
`hands` | [Array](/docs/datapack/data-types/array) of [Hand](/docs/datapack/data-types/hand) | `["off_hand", "main_hand"]` | Determines if the power should be activated if the player used the specified hand(s). Accepts `"off_hand"`, `"main_hand"` or both.
`result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If specified, gives the item to the 'actor' (the player that has the power) entity.
`held_item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the item used for right-clicking the 'target' entity in the specified hand(s) determined by the `hands` string field.
`result_item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the item that is given to the 'actor' (the player that has the power) entity.
`action_result` | [Action Result](/docs/datapack/data-types/action-result) | `"success"` | Determines the result of the 'use' action.

## Examples

```json
{
	"type": "apoli:action_on_block_use",
	"block_action": {
		"type": "apoli:set_block",
		"block": "minecraft:gold_block"
	},
	"block_condition": {
		"type": "apoli:block",
		"block": "minecraft:iron_block"
	},
	"directions": [
		"up",
		"down"
	],
	"condition": {
		"type": "apoli:sprinting"
	}
}
```

This example will replace any iron blocks with gold blocks if you right click the top or bottom of the block while sprinting.
