---
title: "Enchantment (Item Condition Type)"
description: "Compares the level of an enchantment on the item, or the number of enchantments it has, with a number."
navigation_title: "Enchantment"
---

Compares the level of an enchantment on the item, or the number of enchantments it has, with a number.

Type ID: `apoli:enchantment`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enchantment` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The enchantment whose level is compared. Without it, the number of enchantments on the stack is compared instead. |
| `use_modifications` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to count levels changed by [`apoli:modify_enchantment_level`](/docs/datapack/powers/modify_enchantment_level). They apply when the item is worn or held by an entity with that power, or when the check runs for an entity with that power, for example inside [`apoli:equipped_item`](/docs/datapack/entity-conditions/equipped_item) or [`apoli:inventory`](/docs/datapack/entity-conditions/inventory). With `false`, only the enchantments stored on the item are read. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">"` | How the level, or the number of enchantments, is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | `0` | The number it is compared with. |

## Examples

```json
"item_condition": {
    "type": "apoli:enchantment",
    "enchantment": "minecraft:fortune",
    "comparison": "==",
    "compare_to": 3
}
```

This checks whether the item has Fortune III.

```json
"item_condition": {
    "type": "apoli:enchantment",
    "comparison": ">=",
    "compare_to": 3
}
```

This checks whether the item has 3 or more enchantments.

```json
"item_condition": {
    "type": "apoli:enchantment"
}
```

This checks whether the item has any enchantment at all.
