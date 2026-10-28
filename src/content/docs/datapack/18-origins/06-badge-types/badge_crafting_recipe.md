---
title: "Crafting Recipe (Badge Type)"
description: "An icon that shows a crafting grid for a recipe the origin unlocks."
navigation_title: "Crafting Recipe"
---

An icon in the origin selection screen that shows a rendered crafting grid when hovered, so a player can see the recipe an origin unlocks before choosing it.

Type ID: `origins:crafting_recipe`

> [!NOTE]
> Badges come from the Origins mod, and core Apoli has nothing like them.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `sprite` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The full path of the texture to draw, such as `origins:textures/gui/badge/isaacfanta/recipe.png`. |
| `fallback` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of identifiers | _optional_ | Textures to draw when `sprite` isn't in any loaded resource pack. The first one that exists is used. |
| `recipe` | [Identifier](/docs/datapack/data-types/identifier) or [Crafting Recipe](/docs/datapack/data-types/crafting-recipe) | _required_ | The recipe to show: the ID of a loaded recipe (from a data pack, or one an [`apoli:recipe`](/docs/datapack/powers/recipe) power adds), or the recipe written out in full. The grid is drawn from the real recipe when badges are sent to players. A written-out recipe is only drawn, never made craftable. |
| `prefix` | [Text Component](/docs/datapack/data-types/text-component) | _optional_ | A line shown above the grid. |
| `suffix` | [Text Component](/docs/datapack/data-types/text-component) | _optional_ | A line shown below the grid. |

Only crafting recipes render, shaped and shapeless. An ID that resolves to a smelting, smithing or other recipe type draws the icon and the prefix and suffix, but no grid. An ID that resolves to nothing does the same, and so does a written-out recipe that fails to parse.

> [!TIP]
> Origins logs a warning naming the recipe in either case, so check the server log when a badge shows no grid.

## Examples

```json
{
  "type": "apoli:recipe",
  "recipe": {
    "type": "minecraft:crafting_shapeless",
    "id": "my_pack:sea_bread",
    "ingredients": [ { "item": "minecraft:kelp" }, { "item": "minecraft:wheat" } ],
    "result": { "id": "minecraft:bread", "count": 1 }
  },
  "badges": [
    {
      "type": "origins:crafting_recipe",
      "sprite": "origins:textures/gui/badge/isaacfanta/recipe.png",
      "recipe": "my_pack:sea_bread",
      "prefix": "Only you can make this:"
    }
  ]
}
```

This recipe power adds a shapeless recipe for bread made from kelp and wheat, and its badge shows that recipe with a line above the grid.

The recipe can also be written out in place, in the same format as the `recipe` of an `apoli:recipe` power:

```json
{
  "type": "apoli:simple",
  "badges": [
    {
      "type": "origins:crafting_recipe",
      "sprite": "origins:textures/gui/badge/isaacfanta/recipe.png",
      "recipe": {
        "type": "minecraft:crafting_shapeless",
        "ingredients": [ { "item": "minecraft:kelp" }, { "item": "minecraft:wheat" } ],
        "result": { "id": "minecraft:bread", "count": 1 }
      },
      "suffix": "Another power of this origin lets you craft it."
    }
  ]
}
```

This badge sits on a simple power and only draws the recipe, so another power has to make it craftable.

## You often don't need to write one

An [`apoli:recipe`](/docs/datapack/powers/recipe) power with no `badges` array gets a crafting recipe badge automatically, built from its own recipe and labelled shaped or shapeless for you. Write one by hand when you want your own sprite or wording, or to show a recipe that another power grants.
