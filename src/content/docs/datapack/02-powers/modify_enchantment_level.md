---
title: "Modify Enchantment Level (Power Type)"
description: "Changes the level of an enchantment on the items the entity is wearing or holding."
navigation_title: "Modify Enchantment Level"
---

Changes the level of an enchantment on the items the entity is wearing or holding, as far as gameplay is concerned. The item itself is never changed: tooltips, anvils, grindstones and crafting still see the real stored enchantments.

Type ID: `apoli:modify_enchantment_level`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`enchantment` | [Identifier](/docs/datapack/data-types/identifier) |  | ID of the enchantment to modify, e.g. `minecraft:fortune`.
`item_condition` | Item Condition Type | _optional_ | If specified, only items that fulfill this condition are affected. Without it, every slot is affected, **including empty slots** (a bare hand, an empty boot slot).
`modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If specified, this modifier is applied to the item's current level of the enchantment.
`modifiers` | Array of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If specified, these modifiers are applied to the item's current level of the enchantment.

The result is rounded to a whole number and kept between 0 and 255. Several powers that target the same enchantment are combined in modifier-operation order, and a result of 0 removes the enchantment.

The modified level is what the game uses for:

- the entity's equipment (main hand, off hand, armor), for every enchantment effect: damage, protection, knockback, Fire Aspect, Looting, Mending, Unbreaking, Riptide and so on;
- the tool the entity breaks a block with, so Fortune, Silk Touch and block experience apply to block drops;
- attribute-based enchantments (Efficiency, Depth Strider, Respiration, Aqua Affinity, Swift Sneak, Sweeping Edge). These update as soon as the modified level changes, including when the power's `condition` turns on or off;
- the [`apoli:enchantment` entity condition](/docs/datapack/entity-conditions/enchantment) and [`apoli:enchantment` item condition](/docs/datapack/item-conditions/enchantment), unless they set `use_modifications` to `false`.

> Items elsewhere in the inventory are only affected where they are checked together with their holder, for example by an [`apoli:enchantment`](/docs/datapack/item-conditions/enchantment) item condition inside an [`apoli:inventory`](/docs/datapack/entity-conditions/inventory) check.

> The power's own `condition` and `item_condition` see the unmodified levels, so a power can check enchantments without affecting itself.

## Examples

```json
{
    "type": "apoli:modify_enchantment_level",
    "enchantment": "minecraft:silk_touch",
    "modifier": {
        "operation": "set_total",
        "value": 1
    }
}
```

This example gives everything the entity mines Silk Touch, whether it is holding a tool or breaking blocks with its bare hand.

```json
{
    "type": "apoli:modify_enchantment_level",
    "enchantment": "minecraft:fortune",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "tag": "minecraft:pickaxes"
        }
    },
    "modifier": {
        "operation": "add_base_early",
        "value": 2
    }
}
```

This example adds two levels of Fortune to any pickaxe the entity uses.
