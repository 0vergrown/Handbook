---
title: "Action On Block Use (Power Type)"
description: "Runs actions when the player that has the power right-clicks a block."
navigation_title: "Action On Block Use"
---

Runs an entity action, a block action and item actions when the player that has the power uses (right-clicks) a block.

Type ID: `apoli:action_on_block_use`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player when every condition passes. |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | If set, this action runs on the block that was used when every condition passes. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the actions only run when the block that was used passes this condition. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item in the player's hand, as chosen by `hands`, passes this condition. |
| `directions` | [Array](/docs/datapack/data-types/array) of [String](/docs/datapack/data-types/string) | `["north", "east", "south", "west", "up", "down"]` | The faces of the block the player has to use for the actions to run. |
| `hands` | [Array](/docs/datapack/data-types/array) of [Hand](/docs/datapack/data-types/hand) | `["off_hand", "main_hand"]` | The hands the player has to use for the power to trigger: `"off_hand"`, `"main_hand"` or both. |
| `result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If set, this item is given to the player. It goes into the hand that was used if that hand is now empty, otherwise into the inventory, and it is dropped at their feet if the inventory is full. |
| `held_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item the player right-clicked the block with. |
| `result_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on `result_stack` before the player gets it. Without `result_stack` it does nothing. |
| `action_result` | [Action Result](/docs/datapack/data-types/action-result) | `"success"` | The result of the use action. |

> [!NOTE]
> `entity_action`, `block_action` and the item actions run on the server only. `action_result` is returned on both sides so the client's prediction matches. `hands` and `directions` are checked before the conditions, so limiting them is the cheap way to narrow a power down.

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

While sprinting, right-clicking the top or bottom of an iron block turns it into a gold block.
