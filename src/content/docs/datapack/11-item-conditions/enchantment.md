---
title: "Enchantment (Item Condition Type)"
description: "Checks the level of a certain enchantment, or the amount of individual enchantments on the item."
navigation_title: "Enchantment"
---

Checks the level of a certain enchantment, or the amount of individual enchantments on the item.

Type ID: `apoli:enchantment`

## Fields

| Field               | Type                   | Default    | Description                                                                                                                                                                        |
|---------------------|------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enchantment`       | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If specified, the level of the enchantment that corresponds to this identifier will be compared. Otherwise, the amount of enchantments in the item stack will be compared instead. |
| `use_modifications` | [Boolean](/docs/datapack/data-types/boolean)    | `true`     | Whether to count levels changed by [`apoli:modify_enchantment_level`](/docs/datapack/powers/modify_enchantment_level). They apply when the item is worn or held by an entity with that power, or when the check runs for an entity with that power (e.g. inside [`apoli:equipped_item`](/docs/datapack/entity-conditions/equipped_item) or [`apoli:inventory`](/docs/datapack/entity-conditions/inventory)). With `false`, only the enchantments stored on the item are read. |
| `comparison`        | [Comparison](/docs/datapack/data-types/comparison) | `">"`      | Determines how the level of the specified enchantment, or the amount of enchantments in the item stack, should be compared to the specified value.                                 |
| `compare_to`        | [Integer](/docs/datapack/data-types/integer)    | `0`        | The value at which the level of the specified enchantment, or the amount of the enchantments in the item stack, will be compared to.                                               |

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

```json
"item_condition": {
    "type": "apoli:enchantment"
}
```
This example will check if the item has any enchantment at all.
