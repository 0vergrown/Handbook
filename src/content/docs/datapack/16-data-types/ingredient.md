---
title: "Ingredient (Data Type)"
description: "An item ID, an item tag, a custom ingredient that checks item components, or a list of these."
navigation_title: "Ingredient"
---

An ingredient matches items. It can be written in four ways:

- a [String](/docs/datapack/data-types/string) holding an item ID, or an item tag written with a leading `#`;
- an [Object](/docs/datapack/data-types/object) naming a registered item or an item tag;
- an [Object](/docs/datapack/data-types/object) describing a [custom ingredient](#custom-ingredients), which can also check the item's data components;
- an [Array](/docs/datapack/data-types/array) mixing any of those forms, which matches when any entry matches.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `item` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The ID of a registered item. |
| `tag` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The ID of an item tag. The leading `#` is optional here. Ignored if `item` is set. |

One of `item` and `tag` must be present, unless the object is a custom ingredient.

### The string form

Anywhere the object form is accepted, you can write the ID directly instead. These pairs are the same:

```json
"ingredient": "minecraft:diamond"
"ingredient": { "item": "minecraft:diamond" }
```

```json
"ingredient": "#minecraft:wool"
"ingredient": { "tag": "minecraft:wool" }
```

## Custom ingredients

An object with a `fabric:type`, `neoforge:ingredient_type` or `type` key is a custom ingredient. These check more than the item: its data components, several ingredients at once, or one ingredient minus another. Apoli reads both the Fabric and the NeoForge formats on both loaders, so a pack written for one works on the other.

| Type | Key | Fields | Matches |
| --- | --- | --- | --- |
| `fabric:components` | `fabric:type` | `base` (Ingredient), `components` (an object mapping component IDs to values) | Items matching `base` whose listed components have exactly those values. `"!minecraft:<id>": {}` requires the component to be absent. |
| `fabric:custom_data` | `fabric:type` | `base` (Ingredient), `nbt` (SNBT string or object) | Items matching `base` whose `minecraft:custom_data` contains everything in `nbt`. Extra keys on the item are fine. |
| `fabric:any` | `fabric:type` | `ingredients` (array of Ingredient) | Items matching any of the ingredients. |
| `fabric:all` | `fabric:type` | `ingredients` (array of Ingredient) | Items matching all of them. |
| `fabric:difference` | `fabric:type` | `base`, `subtracted` (Ingredient) | Items matching `base` but not `subtracted`. |
| `neoforge:components` | `type` | `items` (an ID, a `#tag` or an array of IDs), `components`, `strict` (default `false`) | Listed items whose listed components have exactly those values. With `strict: true`, the item can't carry any other changed component. |
| `neoforge:compound` | `type` | `children` (or `ingredients`) | Items matching any child. |
| `neoforge:intersection` | `type` | `children` | Items matching every child. |
| `neoforge:difference` | `type` | `base`, `subtracted` | Items matching `base` but not `subtracted`. |
| `fabric:nbt` | `fabric:type` | `base`, `nbt`, `strict` (default `false`) | 1.20.1 only. Items matching `base` whose NBT contains `nbt`, or equals it with `strict`. |

`neoforge:ingredient_type` is accepted wherever `type` is. Custom ingredient types that other mods register work too: Fabric's under `fabric:type` and NeoForge's under `type`.

- Component values are compared exactly, after the component's own codec has read them. `minecraft:custom_data` (and the other components that hold NBT) compares numbers by value, so `{"golden_egg": true}` matches an item with `{golden_egg:1b}` and `5` matches `5b`. It still needs the same keys, so to check only part of the custom data, use `fabric:custom_data`.
- 1.20.1 has no item components, so `fabric:components`, `fabric:custom_data` and `neoforge:components` don't exist there. `fabric:nbt` does the job instead.
- Inside an ingredient, `type` is only read as a custom ingredient when it names one. An object such as `{"type": "apoli:ingredient", "item": "minecraft:slime_ball"}` is still a plain item.

> [!NOTE]
> Custom ingredients are checked without building or copying anything, and tags are looked up directly on the item. Testing one costs about as much as testing its `base`, plus one comparison per listed component.

## Examples

```json
"ingredient": {
    "item": "minecraft:diamond"
}
```

An ingredient that matches a diamond.

```json
"ingredient": ["minecraft:cod", "minecraft:cooked_cod", "#minecraft:planks"]
```

This matches raw or cooked cod, or any wooden planks.

```json
"ingredient": {
    "fabric:type": "fabric:components",
    "base": {
        "item": "minecraft:egg"
    },
    "components": {
        "minecraft:custom_data": {
            "golden_egg": true
        }
    }
}
```

This matches an egg whose custom data is exactly `{golden_egg: 1b}`.

```json
"ingredient": {
    "fabric:type": "fabric:any",
    "ingredients": [
        {
            "tag": "minecraft:meat"
        },
        {
            "fabric:type": "fabric:components",
            "base": {
                "tag": "example:valid_items"
            },
            "components": {
                "minecraft:custom_data": {
                    "example:meat": true
                }
            }
        }
    ]
}
```

This matches anything in `#minecraft:meat`, or anything in `#example:valid_items` whose custom data is `{"example:meat": 1b}`.

```json
"ingredient": {
    "fabric:type": "fabric:components",
    "base": "minecraft:potion",
    "components": {
        "minecraft:potion_contents": {
            "potion": "minecraft:swiftness"
        }
    }
}
```

This matches a Potion of Swiftness. The same check with `"type": "neoforge:components"`, `"items": "minecraft:potion"` and the same `components` works on either loader.

```json
"ingredient": {
    "fabric:type": "fabric:difference",
    "base": "minecraft:crossbow",
    "subtracted": {
        "fabric:type": "fabric:components",
        "base": "minecraft:crossbow",
        "components": {
            "minecraft:charged_projectiles": []
        }
    }
}
```

This matches a loaded crossbow: any crossbow, minus the ones whose charged projectiles are empty.

```json
"ingredient": {
    "fabric:type": "fabric:custom_data",
    "base": "#minecraft:swords",
    "nbt": "{bound:1b}"
}
```

This matches any sword whose custom data contains `bound: 1b`, whatever else it holds.
