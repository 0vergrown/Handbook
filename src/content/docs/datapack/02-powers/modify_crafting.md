---
title: "Modify Crafting (Power Type)"
description: "Changes the result of a recipe crafted in the player's inventory or at a crafting table."
navigation_title: "Modify Crafting"
---

Changes the result item of a recipe crafted in the player's inventory or at a crafting table.

Type ID: `apoli:modify_crafting`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `recipe` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If set, only the result of the recipe with this ID changes. |
| `item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the recipe's result item. |
| `item_action_after_crafting` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the result item after the recipe is crafted. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player when they craft the recipe. |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | If set, this action runs on the block used to craft the recipe. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, `result` and the actions only apply when the recipe's result item passes this condition. |
| `result` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If set, this item replaces the recipe's result. |

## When each field runs

| Field | When |
|---|---|
| `result`, `item_action` | While the result is shown in the crafting output slot. The changed stack is what the player sees and what they take. |
| `item_action_after_crafting`, `entity_action`, `block_action` | When the player takes the crafted item out of the result slot. |

`block_action` runs on the block the player is crafting at, so it only fires at a crafting table. The 2 by 2 grid in the player's own inventory has no block, so the action is skipped there.

`recipe` is matched against the recipe's ID, which includes recipes added by [apoli:recipe](/docs/datapack/powers/recipe). For those, use the `id` you gave inside that power's `recipe` object.

## Examples

```json
{
    "type": "apoli:modify_crafting",
    "recipe": "minecraft:wooden_sword",
    "result": {
        "item": "minecraft:diamond_sword"
    }
}
```

This replaces the result of the vanilla `minecraft:wooden_sword` recipe (`data/minecraft/recipe/wooden_sword.json` on 1.21.1, `recipes/` on 1.20.1) with a diamond sword, only for the player that has the power.

```json
{
    "type": "apoli:modify_crafting",
    "recipe": "example:fire_sword_crafting",
    "item_action": {
        "type": "apoli:modify",
        "modifier": "example:fire_sword_modifier"
    },
    "entity_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:block.anvil_use"
    }
}
```

This applies to a recipe added by an [apoli:recipe](/docs/datapack/powers/recipe) power, where `example:fire_sword_crafting` is the `id` inside that power's `recipe` object. The item modifier is applied to the result shown in the output slot, and the sound plays when the item is taken.
