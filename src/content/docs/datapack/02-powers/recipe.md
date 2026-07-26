---
title: "apoli:recipe"
description: "Allows a player with this power to craft the defined crafting recipe."
---

Allows a player with this power to craft the defined crafting recipe. The recipe is injected server-side and only players holding the power can use it.

Type ID: `apoli:recipe` (alias: `origins:recipe`)

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`recipe` | Crafting Recipe | | The recipe to craft, including an `id` field which can be any arbitrary (but unique) identifier. Any vanilla crafting recipe type works (`minecraft:crafting_shaped`, `minecraft:crafting_shapeless`, ...).

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
        	"item": "minecraft:cobweb"
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
            "item": "minecraft:iron_sword",
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

