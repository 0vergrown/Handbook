---
title: "Crafting Recipe (Data Type)"
description: "An Object specifying a shapeless or shaped crafting recipe."
navigation_title: "Crafting Recipe"
---

An [Object](/docs/datapack/data-types/object) specifying a shapeless or shaped crafting recipe.

## Fields (both types)

Field  | Type | Default | Description
-------|------|---------|-------------
`type` | Identifier | | The type of recipe. Either `minecraft:crafting_shaped` or `minecraft:crafting_shapeless`. Other recipe types are not supported.
`id` | Identifier | | An ID for this recipe. Has to be unique among all recipes, otherwise there will be a conflict.
`result` | Object with an `item` ID and `count` Integer | | The result of the crafting. **Note that vanilla does _not_ support NBT tags in the result.**

## Fields (shapeless)

Field  | Type | Default | Description
-------|------|---------|-------------
`ingredients` | Array of Ingredient | | The items that need to be put in the crafting grid for the recipe.

## Examples (shapeless)

```json
"recipe": {
	"type": "minecraft:crafting_shapeless",
	"id": "apoli:fire_charge_without_blaze_powder",
	"ingredients": [
	    {
	      	"item": "minecraft:gunpowder"
	    },
	    [
		    {
		        "item": "minecraft:coal"
		    },
		    {
		        "item": "minecraft:charcoal"
		    }
	    ]
	],
	"result": {
	    "item": "minecraft:fire_charge",
	    "count": 3
	}
}
```

A crafting recipe to craft fire charges, but without the blaze powder required by the vanilla recipe.

## Fields (shaped)

Field  | Type | Default | Description
-------|------|---------|-------------
`pattern` | Array of Strings | | Specifies the pattern, with each element representing one row. Use a single character to describe one item. A space means that position is empty.
`key` | Object of "character": Ingredient fields | | Specifies which character in the pattern corresponds to which Ingredient.

## Examples (shaped)

```json
"recipe": {
	"type": "minecraft:crafting_shaped",
	"id": "apoli:sideways_birch_boat",
	"pattern": [
	    "##",
	    " #",
	    "##"
	],
	"key": {
	    "#": {
	    	"item": "minecraft:birch_planks"
	    }
  	},
  	"result": {
    	"item": "minecraft:birch_boat"
  	}
}
```

A crafting recipe for a birch boat, but with the planks rotated to the side in the crafting grid.
