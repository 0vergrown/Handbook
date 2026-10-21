---
title: "Item On Item (Power Type)"
description: "Runs actions when the player uses one item on another in an inventory, the way you put items into a bundle."
navigation_title: "Item On Item"
---

Runs an entity action and item actions when the player uses one item on another in an inventory, the way you put items into a bundle.

Type ID: `apoli:item_on_item`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `using_item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item doing the clicking passes this condition. |
| `on_item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item being clicked passes this condition. |
| `result` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If set, this item is given to the player. |
| `result_from_on_stack` | [Integer](/docs/datapack/data-types/integer) | `0` | How many items from the clicked stack are given as the result. It is mostly used together with `result_item_action`. |
| `using_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item doing the clicking. |
| `on_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item being clicked. |
| `result_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item given to the player. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player after they use one item on another. |
| `click_type` | [String](/docs/datapack/data-types/string) or [Integer](/docs/datapack/data-types/integer) | `"secondary"` | Which click runs the actions: `"primary"` (or `0`) is a left-click, and `"secondary"` (or `1`) is a right-click. |

The using item is the stack on your cursor, and the on item is the stack in the slot you click. A matching power replaces the normal pick up or swap for that click, but items with their own click behaviour still go first, so a bundle on the cursor wins over the power.

`result` and `result_item_action` put the result stack into the clicked slot if `on_item_action` (or `result_from_on_stack`) emptied it. Otherwise it goes into the player's inventory, and it drops at their feet if there is no room.

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

This smelts a smeltable item when the player uses coal on it.

The `example:furnace_smelt` item modifier it uses is this file, at `data/example/item_modifier/furnace_smelt.json` on 1.21.1 or `data/example/item_modifiers/furnace_smelt.json` on 1.20.1:

```json
{
    "function": "minecraft:furnace_smelt"
}
```

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

This gives the player 8 oak planks when they use any axe on an oak log, by holding the axe on the cursor and right-clicking the log.
