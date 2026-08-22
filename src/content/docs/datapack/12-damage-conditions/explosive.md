---
title: "Explosive (Damage Condition Type)"
description: Passes when the damage came from an explosion.
navigation_title: "Explosive"
---

Passes when the damage came from an explosion — creepers, TNT, beds in the Nether, end crystals.

Type ID: `apoli:explosive`

## Fields

This type has no fields. Like every condition, it accepts `inverted` to flip the result.

## How it works

It is shorthand for [`apoli:in_tag`](/docs/datapack/damage-conditions/in_tag) against the `minecraft:is_explosion` damage type tag, so a data pack that adds its own damage type to that tag is matched too.

## Example

A blast-proof origin:

```json
{
  "type": "apoli:invulnerability",
  "damage_condition": { "type": "apoli:explosive" }
}
```

Or half damage rather than none, which usually plays better:

```json
{
  "type": "apoli:modify_damage_taken",
  "damage_condition": { "type": "apoli:explosive" },
  "modifier": { "operation": "multiply_base_multiplicative", "value": -0.5 }
}
```
