---
title: "Enchantment (Entity Condition Type)"
description: "Compares the level of an enchantment on the entity's equipment with a number."
navigation_title: "Enchantment"
---

Compares the level of an enchantment on the entity's equipment with a number.

Type ID: `apoli:enchantment`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enchantment` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the enchantment. |
| `use_modifications` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to count levels changed by [`apoli:modify_enchantment_level`](/docs/datapack/powers/modify_enchantment_level). With `true`, an empty slot the enchantment applies to, such as an empty main hand for Sharpness, can count too. With `false`, only the levels stored on the items are read. |
| `calculation` | [String](/docs/datapack/data-types/string) | `"sum"` | Which number to compare: the `sum` of this enchantment's levels across all of the entity's equipment, or the `max` level on any single piece. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the enchantment level is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the level is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:enchantment",
    "enchantment": "minecraft:protection",
    "calculation": "sum",
    "comparison": ">=",
    "compare_to": 16
}
```

This checks whether the entity is wearing a full set of Protection IV armor, or better where mods allow it.

```json
"condition": {
    "type": "apoli:enchantment",
    "enchantment": "minecraft:fortune",
    "use_modifications": false,
    "calculation": "max",
    "comparison": ">=",
    "compare_to": 1
}
```

This checks for real Fortune on the entity's equipment, ignoring any levels that powers grant.
