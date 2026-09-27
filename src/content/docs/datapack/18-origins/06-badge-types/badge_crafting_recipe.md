---
title: "Crafting Recipe (Badge Type)"
description: "Badge — an icon that hovers out a crafting grid for a recipe the origin unlocks."
navigation_title: "Crafting Recipe"
---

An icon in the origin-selection screen that hovers out a **rendered crafting grid**, so a player can see the recipe an origin unlocks before choosing it.

Type ID: `origins:crafting_recipe` — a badge type.

> **Needs the Origins mod.** Badges are an Origins concept; core Apoli has no equivalent.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `sprite` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | Full path to the texture to draw, e.g. `origins:textures/gui/badge/isaacfanta/recipe.png`. |
| `recipe` | [Identifier](/docs/datapack/data-types/identifier) or [Crafting Recipe](/docs/datapack/data-types/crafting-recipe) | _required_ | The recipe to display: the id of a loaded recipe (from a data pack, or one an [`apoli:recipe`](/docs/datapack/powers/recipe) power adds), or the recipe written out in full. The grid is drawn from the real recipe when badges are sent to players. A written-out recipe is only drawn, never made craftable. |
| `prefix` | [Text Component](/docs/datapack/data-types/text-component) | _optional_ | A line shown above the grid. |
| `suffix` | [Text Component](/docs/datapack/data-types/text-component) | _optional_ | A line shown below the grid. |

Only **crafting** recipes render — shaped and shapeless. An id that resolves to a smelting, smithing or other recipe type draws the icon and the prefix/suffix, but no grid. An id that resolves to nothing at all does the same, and so does a written-out recipe that fails to parse. Origins logs a warning for either, naming the recipe, so check the server log when a badge shows no grid.

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

## You often don't need to write one

An [`apoli:recipe`](/docs/datapack/powers/recipe) power with **no** `badges` array gets a crafting-recipe badge automatically, built from its own recipe and labelled "shaped"/"shapeless" for you. Write one by hand when you want your own sprite or wording, or to advertise a recipe some *other* power grants.
