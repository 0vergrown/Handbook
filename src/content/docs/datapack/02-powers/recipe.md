---
title: "Recipe (Power Type)"
description: "Allows a player with this power to craft the defined crafting recipe."
navigation_title: "Recipe"
---

Allows a player with this power to craft the defined crafting recipe. The recipe is injected server-side and only players holding the power can use it. When several recipes fit the same grid, each player gets one they are allowed to craft, so a power recipe they lack never blocks one they can make.

Type ID: `apoli:recipe` (alias: `origins:recipe`)

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`recipe` | [Crafting Recipe](/docs/datapack/data-types/crafting-recipe) | | The recipe to craft. Any vanilla crafting recipe type works (`minecraft:crafting_shaped`, `minecraft:crafting_shapeless`, ...). Its `id` names the recipe; without one, the power's own id is used.

## Sharing an `id`

Several powers can write the same recipe `id`:

- **Identical recipes** (the whole `recipe` object matches) are registered once, and holding any one of those powers unlocks it.
- **Different recipes** all still work, each for the holders of its own power. The first power by id (namespace, then path) keeps the `id`; every other one is registered under its own power id, and Apoli logs a warning naming it. [`apoli:modify_crafting`](/docs/datapack/powers/modify_crafting) matches all of them by the `id` you wrote.

Give different recipes different ids anyway: vanilla features that name a recipe, such as `/recipe` and the `recipe_unlocked` advancement trigger, only know the registered id.

## Granting powers with the crafted item

The recipe's `result` can additionally carry a `power` field (one entry) and/or a `powers` field (an array of entries). The crafted item then grants those powers through the item-powers system — the same data written by the "Add Power (Item Modifier)" while the item sits in a matching equipment slot. On 1.21.1 the entries are embedded into the result's `minecraft:custom_data` component; on 1.20.1 they land in the item's NBT `tag`, the JSON you write is identical either way.

Each entry is either a plain power id **string** (granted in **every** equipment slot) or an **object**:

Field  | Type | Default | Description
-------|------|---------|-------------
`power` | Identifier | **required** | The id of the power to grant.
`slot` | String or Array of Strings | all slots | Equipment slot(s) the item must be in for the power to apply: `mainhand`, `offhand`, `head`, `chest`, `legs`, `feet`.
`hidden` | Boolean | `false` | Stored with the entry (original-Apoli item-power format compatibility). Currently has no effect in this re-implementation.
`negative` | Boolean | `false` | Stored with the entry (original-Apoli item-power format compatibility). Currently has no effect in this re-implementation.

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

This example will allow the player that has the power to craft Cobwebs by combining two strings in a crafting grid with no specific order.

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

This example crafts an iron sword that grants `example:fire_touch` while held in the main hand, and `example:warm_glow` in any equipment slot.
