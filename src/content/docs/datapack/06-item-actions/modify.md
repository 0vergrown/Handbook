---
title: "apoli:modify"
description: "Applies an Item Modifier to the item stack."
---

Applies an Item Modifier to the item stack.

Type ID: `apoli:modify`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`modifier` | Identifier | | The ID of an item modifier.

## Examples

```json
"item_action": {
    "type": "apoli:modify",
    "modifier": "example:stuff"
}
```

This example will apply the `example:stuff` (`data/example/item_modifiers/stuff.json`) item modifier to the item stack.

```json
{
    "function": "minecraft:set_lore",
    "entity": "this",
    "lore": [
        {
            "text": "Hello, I'm a custom lore line for your item :]",
            "color": "light_purple",
            "italic": false
        }
    ]
}
```
This being the contents of the `example:stuff` (`data/example/item_modifiers/stuff.json`) item modifier.
