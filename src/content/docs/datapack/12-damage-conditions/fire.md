---
title: "Fire (Damage Condition Type)"
description: Passes when the damage is fire damage.
navigation_title: "Fire"
---

Passes when the damage is fire damage — burning, lava, fire blocks, magma blocks, blaze fireballs.

Type ID: `apoli:fire`

## Fields

This type has no fields. Like every condition, it accepts `inverted` to flip the result.

## How it works

It is shorthand for [`apoli:in_tag`](/docs/datapack/damage-conditions/in_tag) against the `minecraft:is_fire` damage type tag, so a data pack that adds its own damage type to that tag is matched too.

## Example

This is exactly what [`apoli:fire_immunity`](/docs/datapack/powers/invulnerability) is built from, and writing it out yourself is how you get a partial version instead of an absolute one:

```json
{
  "type": "apoli:modify_damage_taken",
  "damage_condition": { "type": "apoli:fire" },
  "modifier": { "operation": "multiply_base_multiplicative", "value": -0.75 }
}
```

Full immunity, written the long way — identical to using the `apoli:fire_immunity` alias:

```json
{
  "type": "apoli:invulnerability",
  "damage_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:is_fire"
  }
}
```
