---
title: "Enchantment (Entity Condition Type)"
description: "Checks the level of an enchantment on the entity's equipment."
navigation_title: "Enchantment"
---

Checks the level of an enchantment on the entity's equipment.

Type ID: `apoli:enchantment`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`enchantment` | [Identifier](/docs/datapack/data-types/identifier) | | The namespace and ID of the enchantment of interest.
`use_modifications` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to count levels changed by [`apoli:modify_enchantment_level`](/docs/datapack/powers/modify_enchantment_level). With `true`, an empty slot the enchantment applies to (e.g. an empty main hand for Sharpness) can also count. With `false`, only the levels stored on the items are read.
`calculation` | [String](/docs/datapack/data-types/string) | `"sum"` | Which number to compare - either the `sum` of levels of this enchantment on all of the entity's equipment, or the `max` level of this enchantment on any of the entity's equipment.
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | | Determines how the level of the specified enchantment should be compared to the specified value.
`compare_to` | [Integer](/docs/datapack/data-types/integer) | | The value at which the level of the specified enchantment will be compared to.

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

This condition will check whether the entity is wearing a full set of Protection IV armor (or better, which might be possible with mods).

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

This condition checks for real Fortune on the entity's equipment, ignoring any levels granted by powers.
