---
title: "Crafting Recipe (Data Type)"
description: "An object that describes a shaped or shapeless crafting recipe."
navigation_title: "Crafting Recipe"
---

An [Object](/docs/datapack/data-types/object) that describes a shapeless or shaped crafting recipe.

## Fields (both types)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The type of recipe, either `minecraft:crafting_shaped` or `minecraft:crafting_shapeless`. Other recipe types aren't supported. |
| `id` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | An ID for this recipe. In [`apoli:recipe`](/docs/datapack/powers/recipe) it is optional (the power's ID is used instead), and several powers can share one, see [Sharing an `id`](/docs/datapack/powers/recipe#sharing-an-id). A power's recipe replaces a data pack recipe with the same ID. |
| `result` | [Object](/docs/datapack/data-types/object) | _required_ | The crafted item: `id` (the item), an optional `count` (default `1`) and optional `components`. On 1.20.1 the item is written as `item` instead of `id`, and the result can't carry NBT. |

## Fields (shapeless)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `ingredients` | Array of [Ingredient](/docs/datapack/data-types/ingredient) | _required_ | The items that go in the crafting grid for the recipe. |

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

A recipe for fire charges that doesn't need the blaze powder of the vanilla recipe.

## Fields (shaped)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `pattern` | Array of Strings | _required_ | The pattern, with each element as one row. Use one character for each item, and a space for an empty position. |
| `key` | Object of "character": Ingredient fields | _required_ | Which [Ingredient](/docs/datapack/data-types/ingredient) each character in the pattern stands for. |

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

A recipe for a birch boat, with the planks turned sideways in the crafting grid.
