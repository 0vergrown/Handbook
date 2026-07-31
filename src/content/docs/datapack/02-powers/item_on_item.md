---
title: "Item On Item (Power Type)"
description: "Executes an Entity Action Type or Item Action Types when the player uses an item on an item, similar to how you would put items in a bundle."
navigation_title: "Item On Item"
---

Executes an Entity Action Type or Item Action Types when the player uses an item on an item, similar to how you would put items in a bundle.

Type ID: `apoli:item_on_item`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`using_item_condition` | Item Condition Type | _optional_ | If specified, the specified actions will only execute if this condition is fulfilled by the item that is used to right-click an item.
`on_item_condition` | Item Condition Type | _optional_ | If specified, the specified actions will only execute if this condition is fulfilled by the item that has been right-clicked.
`result` | Item Stack | _optional_ | If specified, this item will be given to the player.
`result_from_on_stack` | Integer | `0` | Determines how many items based on the `on_item` stack will be given as a result for using an item on an item. Mostly to be used in conjunction with `result_item_action`.
`using_item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the item that is used to right-click an item.
`on_item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the item that has been right-clicked.
`result_item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the item that is given to the player.
`entity_action` | Entity Action Type | _optional_ | If specified, this action will be executed on the player after they used an item on an item.
`click_type` | String or Integer | `"secondary"` | Determines whether to execute the actions if the player does a right-click (`0` or `"primary"`) or left-click (`1` or `"secondary"`) action.

## Examples

```json
{
    "type": "apoli:item_on_item",
    "on_item_condition": {
        "type": "apoli:smeltable"
    },
    "using_item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:coal"
        }
    },
    "result_from_on_stack": 8,
    "result_item_action": {
        "type": "apoli:modify",
        "modifier": "example:furnace_smelt"
    },
    "using_item_action": {
        "type": "apoli:consume",
        "amount": 1
    }
}
```

This example will smelt smeltable items by using a Coal item on it.

```json
{
    "function": "minecraft:furnace_smelt"
}
```

This example being the contents of the `example:furnace_smelt` (`data/example/item_modifiers/furnace_smelt.json`) item modifier.

```json
{
    "type": "apoli:item_on_item",
    "using_item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "tag": "fabric:axes"
        }
    },
    "on_item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:oak_log"
        }
    },
    "result": {
        "item": "minecraft:oak_planks",
        "amount": 8
    },
    "using_item_action": {
        "type": "apoli:damage",
        "amount": 20,
        "ignore_unbreaking": false
    },
    "on_item_action": {
        "type": "apoli:consume",
        "amount": 1
    },
    "entity_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:entity.zombie.break_wooden_door",
        "volume": 0.45,
        "pitch": 2
    }
}
```

This example will give the player 8 Oak Planks if the player were to use any Axe tool item on an Oak Log item (have the Axe tool item in the cursor, and right-click on an Oak Log item).
