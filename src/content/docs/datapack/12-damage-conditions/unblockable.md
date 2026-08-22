---
title: "Unblockable (Damage Condition Type)"
description: Passes when the damage ignores shields.
navigation_title: "Unblockable"
---

Passes when the damage cannot be blocked with a shield.

Type ID: `apoli:unblockable`

## Fields

This type has no fields. Like every condition, it accepts `inverted` to flip the result.

## How it works

It is shorthand for [`apoli:in_tag`](/docs/datapack/damage-conditions/in_tag) against the `minecraft:bypasses_shield` damage type tag, so a data pack that adds its own damage type to that tag is matched too.

## Example

Give an origin partial protection against exactly the damage a shield would not have helped with:

```json
{
  "type": "apoli:modify_damage_taken",
  "damage_condition": { "type": "apoli:unblockable" },
  "modifier": { "operation": "multiply_base_multiplicative", "value": -0.25 }
}
```
