---
title: "apoli:modify_crafting"
description: "Modifies the result item of a recipe that can be crafted via the player's inventory or the crafting table."
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

This example will replace the result item stack from the `minecraft:wooden_sword` (`data/minecraft/recipes/wooden_sword.json`) vanilla recipe with a Diamond Sword only for the player that has the power.

