---
title: "From Falling (Damage Condition Type)"
description: Passes when the damage came from a fall.
navigation_title: "From Falling"
---

Passes when the damage came from falling.

Type ID: `apoli:from_falling`

## Fields

This type has no fields. Like every condition, it accepts `inverted` to flip the result.

## How it works

It is shorthand for [`apoli:in_tag`](/docs/datapack/damage-conditions/in_tag) against the `minecraft:is_fall` damage type tag, so a data pack that adds its own damage type to that tag is matched too.

## Example

A light origin that takes less from a drop:

```json
{
  "type": "apoli:modify_damage_taken",
  "damage_condition": { "type": "apoli:from_falling" },
  "modifier": { "operation": "multiply_base_multiplicative", "value": -0.6 }
}
```

Or use it to trigger something rather than to reduce damage:

```json
{
  "type": "apoli:action_when_hit",
  "damage_condition": { "type": "apoli:from_falling" },
  "entity_action": {
    "type": "apoli:area_of_effect",
    "radius": 4,
    "bientity_action": { "type": "apoli:damage", "amount": 3, "damage_type": "minecraft:generic" }
  }
}
```
