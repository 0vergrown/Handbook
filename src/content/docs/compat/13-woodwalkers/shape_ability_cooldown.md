---
title: "Shape Ability Cooldown (Entity Condition Type)"
description: Compares the shape ability cooldown, in ticks.
navigation_title: "Shape Ability Cooldown"
---

Compares how many ticks are left on the shape ability's cooldown. `0` means ready.

Type ID: `apoli:shape_ability_cooldown`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | **required** | `<`, `<=`, `>`, `>=`, `==`, `!=`.
`compare_to` | [Integer](/docs/datapack/data-types/integer) | **required** | Ticks to compare against — 20 ticks is a second.

## Example

Slow the player down for the three seconds after they use their ability:

```json
{
  "type": "apoli:attribute",
  "modifiers": [
    {
      "attribute": "minecraft:generic.movement_speed",
      "operation": "multiply_base_multiplicative",
      "value": -0.3
    }
  ],
  "condition": {
    "type": "apoli:shape_ability_cooldown",
    "comparison": ">",
    "compare_to": 60
  }
}
```

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
