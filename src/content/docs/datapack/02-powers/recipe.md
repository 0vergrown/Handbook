---
title: "Recipe (Power Type)"
description: "Lets a player with this power craft the recipe it defines."
navigation_title: "Recipe"
---

Lets a player with this power craft the recipe it defines. The recipe is added on the server, and only players with the power can use it. When several recipes fit the same grid, each player gets one they are allowed to craft, so a power recipe they don't have never blocks one they can make.

Type ID: `apoli:recipe` (alias: `origins:recipe`)

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `recipe` | [Crafting Recipe](/docs/datapack/data-types/crafting-recipe) | | The recipe to craft. Any vanilla crafting recipe type works, such as `minecraft:crafting_shaped` and `minecraft:crafting_shapeless`. Its `id` names the recipe, and without one the power's own ID is used. |

## Sharing an ID

Several powers can use the same recipe `id`:

- Identical recipes, where the whole `recipe` object matches, are registered once, and having any one of those powers unlocks it.
- Different recipes all still work, each for the players who have its own power. The first power by ID (namespace, then path) keeps the `id`, and every other one is registered under its own power ID, with a warning in the log naming it. [`apoli:modify_crafting`](/docs/datapack/powers/modify_crafting) matches all of them by the `id` you wrote.

Give different recipes different IDs anyway, because vanilla features that name a recipe, such as `/recipe` and the `recipe_unlocked` advancement trigger, only know the registered ID.

## Granting powers with the crafted item

The recipe's `result` can also carry a `power` field with one entry, a `powers` field with an array of entries, or both. The crafted item then grants those powers through the item powers system while it sits in a matching equipment slot, using the same data the "Add Power" item modifier writes. On 1.21.1 the entries go into the result's `minecraft:custom_data` component, and on 1.20.1 into the item's NBT `tag`. The JSON you write is the same either way.

Each entry is either a plain power ID string, which grants the power in every equipment slot, or an object:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the power to grant. |
| `slot` | [String](/docs/datapack/data-types/string) or [Array](/docs/datapack/data-types/array) of Strings | all slots | The equipment slots the item has to be in for the power to apply: `mainhand`, `offhand`, `head`, `chest`, `legs` or `feet`. |
| `hidden` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Kept for compatibility with the original Apoli item power format. It has no effect. |
| `negative` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Kept for compatibility with the original Apoli item power format. It has no effect. |

## Examples

```json
{
    "type": "apoli:recipe",
    "recipe": {
      	"id": "origins:master_of_webs/web_crafting",
      	"type": "minecraft:crafting_shapeless",
      	"ingredients": [
        	{
          		"item": "minecraft:string"
        	},
        	{
          		"item": "minecraft:string"
        	}
      	],
      	"result": {
        	"id": "minecraft:cobweb"
      	}
    }
}
```

This lets the player craft a cobweb from two pieces of string in any order.

```json
{
    "type": "apoli:recipe",
    "recipe": {
        "id": "example:fire_sword_crafting",
        "type": "minecraft:crafting_shaped",
        "pattern": [
            " B ",
            " S "
        ],
        "key": {
            "B": { "item": "minecraft:blaze_rod" },
            "S": { "item": "minecraft:iron_sword" }
        },
        "result": {
            "id": "minecraft:iron_sword",
            "powers": [
                {
                    "power": "example:fire_touch",
                    "slot": "mainhand"
                },
                "example:warm_glow"
            ]
        }
    }
}
```

This crafts an iron sword that grants `example:fire_touch` while held in the main hand, and `example:warm_glow` in any equipment slot.
