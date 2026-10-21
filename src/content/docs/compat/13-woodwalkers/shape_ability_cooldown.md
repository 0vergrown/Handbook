---
title: "Shape Ability Cooldown (Entity Condition Type)"
description: "Compares the shape ability cooldown, in ticks."
navigation_title: "Shape Ability Cooldown"
---

Compares how many ticks are left on the shape ability's cooldown, where `0` means ready.

Type ID: `apoli:shape_ability_cooldown`

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the cooldown is compared: `<`, `<=`, `>`, `>=`, `==` or `!=`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The ticks to compare against, where 20 ticks is a second. |

## Example

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

This slows the player down while more than three seconds are left on the cooldown, which covers the time just after they use the ability.
