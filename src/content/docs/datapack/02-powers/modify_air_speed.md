---
title: "Modify Air Speed (Power Type)"
description: Modifies how fast the entity moves while off the ground.
navigation_title: "Modify Air Speed"
---

Modifies the speed the entity moves at while it is not standing on anything — falling, jumping, or flying in creative. It does not touch walking speed.

Type ID: `apoli:modify_air_speed`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the air speed.
`modifiers` | array of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers, applied in operation order.

## Examples

Much finer control in mid-air, for an origin that is meant to feel agile:

```json
{
  "type": "apoli:modify_air_speed",
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": 0.5
  }
}
```

The opposite — a heavy origin that cannot steer once it leaves the ground:

```json
{
  "type": "apoli:modify_air_speed",
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": -0.4
  },
  "condition": {
    "type": "apoli:not",
    "condition": { "type": "apoli:fall_flying" }
  }
}
```
