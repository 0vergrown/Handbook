---
title: "Bypasses Armor (Damage Condition Type)"
description: Passes when the damage ignores armour.
navigation_title: "Bypasses Armor"
---

Passes when the damage ignores armour, such as starvation, drowning, suffocation, magic and the void.

Type ID: `apoli:bypasses_armor`

## Fields

This condition has no fields. Like every condition, it accepts `inverted` to flip the result.

## How it works

It is shorthand for [`apoli:in_tag`](/docs/datapack/damage-conditions/in_tag) with the `minecraft:bypasses_armor` damage type tag, so a data pack that adds its own damage type to that tag is matched too.

## Example

A tough skin power that only helps against damage armour would have stopped anyway:

```json
{
  "type": "apoli:modify_damage_taken",
  "damage_condition": {
    "type": "apoli:bypasses_armor",
    "inverted": true
  },
  "modifier": { "operation": "multiply_base_multiplicative", "value": -0.2 }
}
```
