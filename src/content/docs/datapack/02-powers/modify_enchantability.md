---
title: "Modify Enchantability (Power Type)"
description: "Changes the enchantability of items the player enchants at an enchanting table, which decides how good the enchantments are."
navigation_title: "Modify Enchantability"
---

Changes the enchantability of items the player enchants at an enchanting table. An item's enchantability is part of how the table picks enchantments: the higher it is, the more likely the result is to have high levels and several enchantments at once. The level cost of each option stays the same.

Type ID: `apoli:modify_enchantability`

Vanilla items range from `1` for books to `25` for golden armour. A diamond sword has `10`.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the modifiers only apply to items that pass this condition. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the item's enchantability. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the item's enchantability. |

The power only applies at the enchanting table, to the enchantment hints it shows and to the enchantments the player actually gets. Loot, villager trades and `/enchant` are not affected. Items that can't be enchanted at a table stay that way. The result is rounded to a whole number, and an enchantability of `0` or lower means the table offers no enchantments.

## Examples

```json
{
    "type": "apoli:modify_enchantability",
    "modifier": {
        "operation": "add_base_early",
        "value": 10
    }
}
```

Every item the player enchants counts as 10 points more enchantable, so a diamond sword rolls like a sword with 20.

```json
{
    "type": "apoli:modify_enchantability",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:book"
        }
    },
    "modifier": {
        "operation": "multiply_base_multiplicative",
        "value": 9
    }
}
```

Books the player enchants have an enchantability of 10 instead of 1, so enchanted books come out with better enchantments.
