---
title: "Modify Air Speed (Power Type)"
description: "Changes how fast the entity moves while it is off the ground."
navigation_title: "Modify Air Speed"
---

Changes the speed the entity moves at while it isn't standing on anything: falling, jumping or flying in Creative mode. Walking speed is not affected. To make walking speed bonuses count in the air too, use [Attribute Modify Transfer](/docs/datapack/powers/attribute_modify_transfer).

Type ID: `apoli:modify_air_speed`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the air speed. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers, applied in operation order. |

## Examples

An agile origin with 50% more control in mid-air:

```json
{
  "type": "apoli:modify_air_speed",
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": 0.5
  }
}
```

A heavy origin that steers poorly once it leaves the ground, except while gliding:

```json
{
  "type": "apoli:modify_air_speed",
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": -0.4
  },
  "condition": {
    "type": "apoli:fall_flying",
    "inverted": true
  }
}
```
