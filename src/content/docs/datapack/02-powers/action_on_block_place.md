---
title: "Action On Block Place (Power Type)"
description: "Runs actions when the player places a block."
navigation_title: "Action On Block Place"
---

Runs actions when the player that has the power places a block.

Type ID: `apoli:action_on_block_place`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player when they place a block. |
| `held_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item the player placed the block with. |
| `place_to_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | If set, this action runs at the position of the placed block. |
| `place_on_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | If set, this action runs on the block the player placed the block against. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item the player placed the block with passes this condition. |
| `place_to_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the actions only run when the block at the placed position passes this condition. |
| `place_on_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the actions only run when the block placed against passes this condition. |
| `directions` | [Array](/docs/datapack/data-types/array) of [String](/docs/datapack/data-types/string) | `["up", "down", "north", "south", "east", "west"]` | The sides of a block the player has to place against for the actions to run. |
| `hands` | [Array](/docs/datapack/data-types/array) of [Hand](/docs/datapack/data-types/hand) | `["main_hand", "off_hand"]` | The hands the player has to use for the actions to run. |
| `result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If set, this item stack is given to the player when they place a block. It goes into the hand that was used if that hand is now empty, otherwise into the inventory, and it is dropped at their feet if the inventory is full. |
| `result_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on `result_stack` before the player gets it. Without `result_stack` it does nothing. |

> [!NOTE]
> The power fires after the block goes down, so `place_to_condition` matches the block that was just placed. Use [apoli:prevent_block_place](/docs/datapack/powers/prevent_block_place) to inspect the space before it is filled.

## Examples

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

This heals the player when they plant wheat seeds on top of farmland.

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

When the player places netherrack into lava, the lava within a star-shaped area with a radius of 4 is removed, and the placed netherrack becomes a magma block.
