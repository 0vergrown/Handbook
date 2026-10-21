---
title: "Fire (Damage Condition Type)"
description: Passes when the damage is fire damage.
navigation_title: "Fire"
---

Passes when the damage is fire damage, such as burning, lava, fire blocks, magma blocks and blaze fireballs.

Type ID: `apoli:fire`

## Fields

This condition has no fields. Like every condition, it accepts `inverted` to flip the result.

## How it works

It is shorthand for [`apoli:in_tag`](/docs/datapack/damage-conditions/in_tag) with the `minecraft:is_fire` damage type tag, so a data pack that adds its own damage type to that tag is matched too.

## Example

[`apoli:fire_immunity`](/docs/datapack/powers/invulnerability) is built from exactly this, and writing it out yourself is how you get partial protection instead of full immunity:

```json
{
  "type": "apoli:modify_damage_taken",
  "damage_condition": { "type": "apoli:fire" },
  "modifier": { "operation": "multiply_base_multiplicative", "value": -0.75 }
}
```

Full immunity written the long way, which is the same as using the `apoli:fire_immunity` alias:

```json
{
  "type": "apoli:invulnerability",
  "damage_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:is_fire"
  }
}
```
