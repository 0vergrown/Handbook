---
title: "apoli:modify_enchantment_level"
description: "Applies/modifies the level of the specified enchantment to/from the entity."
---

Applies/modifies the level of the specified enchantment to/from the entity.

Type ID: `apoli:modify_enchantment_level`


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`enchantment` | Identifier |  | ID of the enchantment to apply/modify the level of to the entity., e.g. `minecraft:protection`.
`item_condition` | Item Condition Type | _optional_ | If specified, only applies/modifies the level of the specified enchantment to/from the entity if the item condition is fulfilled by the item.
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will be applied to the current level of the specified enchantment from the entity.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will be applied to the current level of the specified enchantment from the entity.


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

This example will grant the player the ability to use Silk Touch, regardless of whether the player is holding any item or no item at all.

