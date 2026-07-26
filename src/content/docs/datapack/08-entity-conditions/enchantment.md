---
title: "origins:enchantment"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks the level of an enchantment on the entity's equipment.

Type ID: `origins:enchantment`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`enchantment` | Identifier | | The namespace and ID of the enchantment of interest.
`calculation` | String | `"sum"` | Which number to compare - either the `sum` of levels of this enchantment on all of the player's equipment, or the `max` level of this enchantment on any of the player's equipment.
`comparison` | Comparison | | Determines how the level of the specified enchantment should be compared to the specified value.
`compare_to` | Integer | | The value at which the level of the specified enchantment will be compared to.


## Examples

```json
"condition": {
    "type": "origins:enchantment",
    "enchantment": "minecraft:protection",
    "calculation": "sum",
    "comparison": ">=",
    "compare_to": 16
}
```

This condition will check whether the entity is wearing a full set of Protection IV armor (or better, which might be possible with mods).

