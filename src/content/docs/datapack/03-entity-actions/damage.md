---
title: "Damage (Entity Action Type)"
description: "Applies damage to an entity."
navigation_title: "Damage"
---

Applies damage to an entity.

Type ID: `apoli:damage`

> **`amount` is optional, and omitting it deals damage equal to the entity's max health.** That is intended — it is how the second example below works, supplying only `modifier`/`modifiers` to damage a fraction of max health. But it also means a **misspelled or unknown field name silently becomes a one-shot**, because unknown keys are ignored. If a power always deals exactly the entity's max health, check the spelling of `amount` first.

> See [Minecraft Wiki: Damage type](https://minecraft.wiki/w/Damage_type) and [Minecraft Wiki: Damage type tag (Java Edition)](https://minecraft.wiki/w/Damage_type_tag_(Java_Edition)) for more information about vanilla damage types and damage type tags.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`amount` | Float or [Expression](/docs/datapack/data-types/expression) | _optional_ | The amount of damage to deal. Also accepted under the legacy name `damage`. If omitted, the entity's max health is used as the base value for the modifier(s).
`damage_type` | Identifier | | Defines the properties of the damage source that will be dealt, such as part of its death message, and whether it can bypass armor, shield, etc. (via damage type tags.)
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will be applied to the damage taken by the entity.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will be applied to the damage taken by the entity.

## Examples

```json
"entity_action": {
    "type": "apoli:damage",
    "amount": 4,
    "damage_type": "minecraft:on_fire"
}
```

This example will deal 2 hearts of `on_fire` damage, which by its tags in vanilla is considered fire damage and bypasses armor.

```json
"entity_action": {
    "type": "apoli:damage",
    "damage_type": "minecraft:out_of_world",
    "modifiers": [
        {
            "operation": "set_base",
            "value": 2
        },
        {
            "operation": "multiply_total_multiplicative",
            "resource": "example:damage_multiplier",
            "value": 0
        }
    ]
}
```

This example will deal `2 * (1 + example:damage_multiplier)` amount of `out_of_world` damage to the entity, with `2` used for overriding the base value for the modifiers, and the value of the `example:damage_multiplier` (`data/example/powers/damage_multipler.json`) power as the "multiplier". If the value of the said power is `3`, the amount of damage that will be dealt will be `8` (`2 * (1 + 3) = 8`.)
