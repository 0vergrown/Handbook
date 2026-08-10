---
title: "Modify (Item Action Type)"
description: "Applies an Item Modifier to the item stack."
navigation_title: "Modify"
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

This example will apply the `example:stuff` item modifier to the item stack.

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
This being the contents of the `example:stuff` item modifier.

The loot context the modifier runs in supplies `origin` (the holder's position), `tool` (the stack being modified) and `this_entity` (the holder) — every other loot parameter is absent, so a function that reads one (`minecraft:copy_state`, anything needing `block_entity`) will fail. Functions that swap the item outright, like `minecraft:furnace_smelt`, only work where Apoli can replace the whole stack: inside [`apoli:item_on_item`](/docs/datapack/powers/item_on_item). Everywhere else the new item's components and count are copied onto the existing stack, so the item itself stays as it was.

> Nothing happens, silently, if `modifier` names an item modifier that does not exist — and the folder was **renamed in 1.21**. It is `data/<namespace>/item_modifier/<name>.json` (singular) on 1.21.1 and `data/<namespace>/item_modifiers/<name>.json` (plural) on 1.20.1. A pack that keeps the 1.20 spelling on 1.21.1 loads with no error and every `apoli:modify` quietly does nothing.
