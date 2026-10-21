---
title: "Damage (Entity Action Type)"
description: "Deals damage of a given damage type to the entity."
navigation_title: "Damage"
---

Deals damage of a given damage type to the entity.

Type ID: `apoli:damage`

> [!WARNING]
> `amount` is optional, and leaving it out deals damage equal to the entity's max health. That is deliberate: an action can leave `amount` out and set the damage entirely with `modifier` or `modifiers`, as the second example below does. It also means a misspelled or unknown field name silently becomes a one-shot, because unknown keys are ignored. If a power always deals exactly the entity's max health, check the spelling of `amount` first.

> [!TIP]
> [Minecraft Wiki: Damage type](https://minecraft.wiki/w/Damage_type) and [Minecraft Wiki: Damage type tag (Java Edition)](https://minecraft.wiki/w/Damage_type_tag_(Java_Edition)) explain the vanilla damage types and damage type tags.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | How much damage to deal. `damage` is accepted as a legacy name. Left out, the entity's max health is the base value for the modifiers. |
| `damage_type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The damage type, which decides part of the death message and, through damage type tags, whether the damage bypasses armor, shields and so on. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A modifier applied to the damage. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers applied to the damage. |

## Examples

```json
"entity_action": {
    "type": "apoli:damage",
    "amount": 4,
    "damage_type": "minecraft:on_fire"
}
```

This deals 2 hearts of `on_fire` damage, which vanilla tags as fire damage that bypasses armor.

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

This deals `2 * (1 + example:damage_multiplier)` `out_of_world` damage. `set_base` replaces the base value with `2`, and the value of the `example:damage_multiplier` power (`data/example/powers/damage_multiplier.json`) is the multiplier. If that power's value is `3`, the damage is `8` (`2 * (1 + 3) = 8`).

## Which entity the expression reads

`amount` is an [expression](/docs/datapack/data-types/expression) evaluated against the entity being damaged, which in this entity action is also the entity in scope. The `target_` and `actor_` prefixes both resolve to that same entity here. They only differ in a bi-entity context (see [apoli:damage (Bi-entity Action Type)](/docs/datapack/bientity-actions/damage)).
