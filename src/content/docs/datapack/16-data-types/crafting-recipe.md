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
`id` | Identifier | | An ID for this recipe. In [`apoli:recipe`](/docs/datapack/powers/recipe) it is optional (the power's id is used instead) and several powers may share one, see [Sharing an `id`](/docs/datapack/powers/recipe#sharing-an-id). A power's recipe replaces a data-pack recipe with the same id.
`result` | Object | | The crafted item: `id` (the item), an optional `count` (default `1`) and optional `components`. On 1.20.1 the item is written as `item` instead of `id`, and the result cannot carry NBT.

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
	    "id": "minecraft:fire_charge",
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
    	"id": "minecraft:birch_boat"
  	}
}
```

A crafting recipe for a birch boat, but with the planks rotated to the side in the crafting grid.
