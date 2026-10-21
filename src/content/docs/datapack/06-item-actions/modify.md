---
title: "Modify (Item Action Type)"
description: "Applies an item modifier to the item stack."
navigation_title: "Modify"
---

Applies an item modifier to the item stack.

Type ID: `apoli:modify`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `modifier` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of an item modifier. |

## Examples

```json
"item_action": {
    "type": "apoli:modify",
    "modifier": "example:stuff"
}
```

This applies the `example:stuff` item modifier to the stack. The item modifier itself looks like this:

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

The loot context the modifier runs in supplies `origin` (the holder's position), `tool` (the stack being modified) and `this_entity` (the holder). Every other loot parameter is missing, so a function that reads one (`minecraft:copy_state`, or anything that needs `block_entity`) fails. Functions that swap the item outright, like `minecraft:furnace_smelt`, only work where Apoli can replace the whole stack, which is inside [`apoli:item_on_item`](/docs/datapack/powers/item_on_item). Everywhere else, the new item's components and count are copied onto the existing stack, so the item itself stays the same.

> [!WARNING]
> Nothing happens, and nothing is logged, if `modifier` names an item modifier that doesn't exist. The folder name differs between versions: it is `data/<namespace>/item_modifier/<name>.json` (singular) on 1.21.1 and `data/<namespace>/item_modifiers/<name>.json` (plural) on 1.20.1. A pack that keeps the 1.20 spelling on 1.21.1 loads with no error, and every `apoli:modify` does nothing.
