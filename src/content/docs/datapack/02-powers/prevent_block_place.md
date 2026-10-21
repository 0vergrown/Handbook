---
title: "Prevent Block Place (Power Type)"
description: "Stops the player from placing blocks."
navigation_title: "Prevent Block Place"
---

Stops the player from placing blocks.

Type ID: `apoli:prevent_block_place`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player when they are stopped from placing a block. |
| `held_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item the player tried to place a block with. |
| `place_to_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | If set, this action runs at the position where the player tried to place the block. |
| `place_on_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | If set, this action runs on the block the player tried to place the block against. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item the player used passes this condition. |
| `place_to_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the actions only run when the block at the target position passes this condition. |
| `place_on_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the actions only run when the block placed against passes this condition. |
| `directions` | [Array](/docs/datapack/data-types/array) of [Strings](/docs/datapack/data-types/string) | `["up", "down", "north", "south", "east", "west"]` | The sides of a block the player has to place against for the actions to run. |
| `hands` | [Array](/docs/datapack/data-types/array) of [Hands](/docs/datapack/data-types/hand) | `["main_hand", "off_hand"]` | The hands the player has to use for the actions to run. |
| `result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If set, this item stack is given to the player when they try to place a block. |
| `result_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item given to the player. |

> [!NOTE]
> The power runs before the block is placed, so `place_to_condition` matches whatever is in that space now, either air or the replaceable block being overwritten, not the block being placed.

## Examples

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
			"type": "apoli:still"
		}
	}
}
```

This stops the player from placing blocks into spaces filled with a source fluid, such as a water source, and tells them why.
