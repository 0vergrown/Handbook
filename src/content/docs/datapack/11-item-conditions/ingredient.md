---
title: "Ingredient (Item Condition Type)"
description: "Checks whether the item matches the specified Ingredient."
navigation_title: "Ingredient"
---

Checks whether the item matches the specified [Ingredient](/docs/datapack/data-types/ingredient). Essentially, checking either for the item ID or whether the item is in a specified tag.

Type ID: `apoli:ingredient`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`ingredient` | [Ingredient](/docs/datapack/data-types/ingredient) | |  The ingredient this item must match to pass the check.

## Examples

```json
"item_condition": {
    "type": "apoli:ingredient",
    "ingredient": {
        "item": "minecraft:egg"
    }
}
```

This example will check if the item is a `minecraft:egg` item.

```json
"item_condition": {
    "type": "apoli:ingredient",
    "ingredient": {
        "tag": "minecraft:flowers"
    }
}
```

This example will check if the item is included in the `#minecraft:flowers` (`data/minecraft/tags/items/flowers.json`) item tag.

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

This example will check if the item is included in the `#minecraft:planks` (`data/minecraft/tags/items/planks.json`) item tag or if the item is a `minecraft:oak_log` item.
