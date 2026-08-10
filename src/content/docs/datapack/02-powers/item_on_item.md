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
`click_type` | String or Integer | `"secondary"` | Which click runs the actions: `"primary"` (or `0`) is a left-click, `"secondary"` (or `1`) is a right-click.

The "using" item is the stack on your cursor; the "on" item is the stack in the slot you click. A matching power replaces the normal pick-up/swap for that click — but items with their own stack-click behaviour still go first, so a Bundle on the cursor wins over the power.

`result` and `result_item_action` deliver the result stack into the clicked slot if `on_item_action` (or `result_from_on_stack`) emptied it; otherwise it goes into the player's inventory, and drops at their feet if there is no room.

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

This example being the contents of the `example:furnace_smelt` item modifier — `data/example/item_modifier/furnace_smelt.json` on 1.21.1, `data/example/item_modifiers/…` (plural) on 1.20.1.

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
