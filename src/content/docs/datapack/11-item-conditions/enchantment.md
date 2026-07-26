---
title: "apoli:enchantment"
description: "Checks the level of a certain enchantment, or the amount of individual enchantments on the item."
---

Checks the level of a certain enchantment, or the amount of individual enchantments on the item.

Type ID: `apoli:enchantment`

## Fields

| Field               | Type                   | Default    | Description                                                                                                                                                                        |
|---------------------|------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enchantment`       | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If specified, the level of the enchantment that corresponds to this identifier will be compared. Otherwise, the amount of enchantments in the item stack will be compared instead. |
| `use_modifications` | [Boolean](/docs/datapack/data-types/boolean)    | `true`     | Determines whether to account for enchantments that were added/modified by unnatural means (e.g: via the [apoli:modify_enchantment_level](/docs/datapack/powers/modify_enchantment_level))                                    |
| `comparison`        | [Comparison](/docs/datapack/data-types/comparison) |            | Determines how the level of the specified enchantment, or the amount of enchantments in the item stack, should be compared to the specified value.                                 |
| `compare_to`        | [Integer](/docs/datapack/data-types/integer)    |            | The value at which the level of the specified enchantment, or the amount of the enchantments in the item stack, will be compared to.                                               |

## Examples

```json
"item_condition": {
    "type": "apoli:enchantment",
    "enchantment": "minecraft:fortune",
    "comparison": "==",
    "compare_to": 3
}
```
This example will check if the item has the Fortune III enchantment.

```json
"item_condition": {
    "type": "apoli:enchantment",
    "comparison": ">=",
    "compare_to": 3
}
```
This example will check if the item has 3 or more enchantments.
