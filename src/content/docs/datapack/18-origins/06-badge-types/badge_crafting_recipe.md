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
| `sprite` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | Full path to the texture to draw, e.g. `origins:textures/gui/badge/recipe.png`. |
| `recipe` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The id of the recipe to display. It is looked up at data-pack load and its grid is drawn from the real recipe. |
| `prefix` | [Text Component](/docs/datapack/data-types/text-component) | _optional_ | A line shown above the grid. |
| `suffix` | [Text Component](/docs/datapack/data-types/text-component) | _optional_ | A line shown below the grid. |

Only **crafting** recipes render — shaped and shapeless. An id that resolves to a smelting, smithing or other recipe type draws the icon and the prefix/suffix, but no grid. An id that resolves to nothing at all does the same.

## Examples

```json
{
  "type": "apoli:recipe",
  "recipe": {
    "type": "minecraft:crafting_shapeless",
    "id": "my_pack:sea_bread",
    "ingredients": [ "minecraft:kelp", "minecraft:wheat" ],
    "result": { "id": "minecraft:bread", "count": 1 }
  },
  "badges": [
    {
      "type": "origins:crafting_recipe",
      "sprite": "origins:textures/gui/badge/recipe.png",
      "recipe": "my_pack:sea_bread",
      "prefix": "Only you can make this:"
    }
  ]
}
```

## You often don't need to write one

An [`apoli:recipe`](/docs/datapack/powers/recipe) power with **no** `badges` array gets a crafting-recipe badge automatically, built from its own recipe and labelled "shaped"/"shapeless" for you. Write one by hand when you want your own sprite or wording, or to advertise a recipe some *other* power grants.
