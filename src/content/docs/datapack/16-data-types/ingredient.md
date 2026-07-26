---
title: "Ingredient"
description: "Either: an Object specifying a registered item or item tag."
---

_Either_: an [Object](/docs/datapack/data-types/object) specifying a registered item or item tag.

_Or_: an [Array](/docs/datapack/data-types/array) of Objects specifying a registered item or item tag.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`item` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | ID of a registered item.
`tag` | [Identifier](/docs/datapack/data-types/identifier) | _optional_  | ID of an item tag. Will be ignored if `item` is set.

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
