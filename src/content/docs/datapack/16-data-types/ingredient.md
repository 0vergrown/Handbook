---
title: "Ingredient (Data Type)"
description: "Either: an Object specifying a registered item or item tag."
navigation_title: "Ingredient"
---

_Either_: a [String](/docs/datapack/data-types/string) — an item id, or an item tag written with a leading `#`.

_Or_: an [Object](/docs/datapack/data-types/object) specifying a registered item or item tag.

_Or_: an [Array](/docs/datapack/data-types/array) mixing either of those forms.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`item` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | ID of a registered item.
`tag` | [Identifier](/docs/datapack/data-types/identifier) | _optional_  | ID of an item tag. The leading `#` is optional here. Will be ignored if `item` is set.

One of `item` or `tag` must be present.

### The string form

Anywhere the object form is accepted you may write the id directly instead. These pairs are identical:

```json
"ingredient": "minecraft:diamond"
"ingredient": { "item": "minecraft:diamond" }
```
```json
"ingredient": "#minecraft:wool"
"ingredient": { "tag": "minecraft:wool" }
```

## Examples

```json
"ingredient": {
    "item": "minecraft:diamond"
}
```

An ingredient which matches a diamond.

```json
"ingredient": {
    "tag": "minecraft:wool"
}
```

An ingredient which matches any wool block.

```json
"ingredient": [
    {
        "item": "minecraft:cod"
    },
    {
        "item": "minecraft:cooked_cod"
    },
    {
        "tag": "minecraft:planks"
    }
]
```

An ingredient which matches cod in its raw or cooked form, or any of the wooden planks.

```json
"ingredient": ["minecraft:cod", "minecraft:cooked_cod", "#minecraft:planks"]
```

The same ingredient, in the string form.
