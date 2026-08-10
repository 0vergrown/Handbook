---
title: "Modify Crafting (Power Type)"
description: "Modifies the result item of a recipe that can be crafted via the player's inventory or the crafting table."
navigation_title: "Modify Crafting"
---

Modifies the result item of a recipe that can be crafted via the player's inventory or the crafting table.

Type ID: `apoli:modify_crafting`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`recipe` | Identifier | _optional_ | If specified, modifies the result item of the recipe that matches the specified namespace and ID.
`item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the result item of a recipe.
`item_action_after_crafting` | Item Action Type | _optional_ | If specified, this action will be executed on the result item of a recipe after crafting the said recipe.
`entity_action` | Entity Action Type | _optional_ | If specified, this action will be executed on the player upon crafting a recipe.
`block_action` | Block Action Type | _optional_ | If specified, this action will be executed on the block used for crafting a recipe.
`item_condition` | Item Condition Type | _optional_ | If specified, the item from the `result` field and the specified actions will only be applied if this condition is fulfilled by the result item of a recipe.
`result` | Item Stack | _optional_ | If specified, this item will replace the item of a recipe.

## When each field runs

| Field | When |
|---|---|
| `result`, `item_action` | While the recipe result is being previewed in the crafting output slot — the modified stack is what the player sees and what they take. |
| `item_action_after_crafting`, `entity_action`, `block_action` | When the player actually takes the crafted item out of the result slot. |

`block_action` runs on the block the player is crafting at, so it only fires when crafting at a **crafting table** — the 2×2 grid in the player's own inventory has no block, and the action is skipped there.

`recipe` is matched against the recipe's id, which includes recipes added by [apoli:recipe](/docs/datapack/powers/recipe): use the `id` you gave inside that power's `recipe` object.

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

This example will replace the result item stack from the `minecraft:wooden_sword` (`data/minecraft/recipe/wooden_sword.json` on 1.21.1, `recipes/` on 1.20.1) vanilla recipe with a Diamond Sword only for the player that has the power.

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

Applies to a recipe added by an [apoli:recipe](/docs/datapack/powers/recipe) power — `example:fire_sword_crafting` is the `id` written inside that power's `recipe` object. The item modifier is applied to the output preview; the sound plays when the item is taken.
