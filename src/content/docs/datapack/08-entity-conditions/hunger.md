---
title: "Hunger (Entity Condition Type)"
description: Compares the entity's hunger or saturation.
navigation_title: "Hunger"
---

Compares the player's hunger or saturation with a number. Entities that aren't players always fail, since only players have a hunger bar.

Type ID: `apoli:hunger` (alias `apoli:food_level`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | `<`, `<=`, `>`, `>=`, `==` or `!=`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The value to compare against. Hunger runs from 0 to 20, and each shank is 2. |
| `kind` | [String](/docs/datapack/data-types/string) | `food` | `food` for the hunger bar, or `saturation` for the hidden saturation value underneath it. |

## Examples

Below three shanks:

```json
{
  "type": "apoli:hunger",
  "comparison": "<",
  "compare_to": 6
}
```

Full hunger and some saturation left, which is when vanilla regeneration is fastest:

```json
{
  "type": "apoli:all_of",
  "conditions": [
    { "type": "apoli:hunger", "comparison": ">=", "compare_to": 20 },
    { "type": "apoli:hunger", "kind": "saturation", "comparison": ">", "compare_to": 0 }
  ]
}
```

As a drawback, losing speed when hungry:

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
    "type": "apoli:hunger",
    "comparison": "<=",
    "compare_to": 6
  }
}
```
