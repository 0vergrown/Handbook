---
title: "Ingredient (Item Condition Type)"
description: "Checks whether the item matches an ingredient: an item ID, an item tag or a custom ingredient."
navigation_title: "Ingredient"
---

Checks whether the item matches an [Ingredient](/docs/datapack/data-types/ingredient): an item ID, an item tag, or a [custom ingredient](/docs/datapack/data-types/ingredient#custom-ingredients) that also checks the item's data components, such as a potion's contents or whether a crossbow is loaded.

Type ID: `apoli:ingredient`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `ingredient` | [Ingredient](/docs/datapack/data-types/ingredient) | _required_ | The ingredient the item must match. |

## Examples

```json
"item_condition": {
    "type": "apoli:ingredient",
    "ingredient": {
        "item": "minecraft:egg"
    }
}
```

This checks whether the item is an egg.

```json
"item_condition": {
    "type": "apoli:ingredient",
    "ingredient": {
        "tag": "minecraft:flowers"
    }
}
```

This checks whether the item is in the `#minecraft:flowers` item tag (`data/minecraft/tags/items/flowers.json`).

```json
"item_condition": {
    "type": "apoli:ingredient",
    "ingredient": [
        {
            "tag": "minecraft:planks"
        },
        {
            "item": "minecraft:oak_log"
        }
    ]
}
```

This checks whether the item is in the `#minecraft:planks` item tag (`data/minecraft/tags/items/planks.json`) or is an oak log.

```json
"item_condition": {
    "type": "apoli:ingredient",
    "ingredient": {
        "fabric:type": "fabric:components",
        "base": "minecraft:potion",
        "components": {
            "minecraft:potion_contents": {
                "potion": "minecraft:strong_swiftness"
            }
        }
    }
}
```

This checks whether the item is a Potion of Swiftness II. It works on Fabric and NeoForge alike.
