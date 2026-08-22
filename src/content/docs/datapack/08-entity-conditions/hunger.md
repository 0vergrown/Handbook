---
title: "Hunger (Entity Condition Type)"
description: Compares the entity's hunger or saturation.
navigation_title: "Hunger"
---

Compares the player's hunger or saturation. Non-players always fail, since only players have a hunger bar.

Type ID: `apoli:hunger` (alias `apoli:food_level`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | **required** | `<`, `<=`, `>`, `>=`, `==`, `!=`.
`compare_to` | [Float](/docs/datapack/data-types/float) | **required** | The value to compare against. Hunger runs 0–20, where each shank is 2.
`kind` | [String](/docs/datapack/data-types/string) | `food` | `food` for the hunger bar, `saturation` for the hidden saturation value beneath it.

## Examples

Below three shanks:

```json
{
  "type": "apoli:hunger",
  "comparison": "<",
  "compare_to": 6
}
```

Full hunger *and* some saturation left — the state where vanilla regeneration is fast:

```json
{
  "type": "apoli:all_of",
  "conditions": [
    { "type": "apoli:hunger", "comparison": ">=", "compare_to": 20 },
    { "type": "apoli:hunger", "kind": "saturation", "comparison": ">", "compare_to": 0 }
  ]
}
```

Used as a drawback — you lose your speed when you get hungry:

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
