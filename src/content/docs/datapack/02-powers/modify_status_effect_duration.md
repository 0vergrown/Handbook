---
title: "Modify Status Effect Duration (Power Type)"
description: "Changes how long status effects last when they are applied."
navigation_title: "Modify Status Effect Duration"
---

Changes the duration of status effects as they are applied to the entity with the power. It acts when the effect arrives, so it doesn't change effects the entity already has.

Type ID: `apoli:modify_status_effect_duration`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the duration, in ticks. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers. |
| `status_effect` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Limits the power to one effect. |
| `status_effects` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | `[]` | Limits the power to several effects. An empty list means every effect. |

## Examples

Every effect lasts twice as long:

```json
{
  "type": "apoli:modify_status_effect_duration",
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": 1.0
  }
}
```

Poison, Wither, Blindness and Slowness always last five seconds:

```json
{
  "type": "apoli:modify_status_effect_duration",
  "modifier": { "operation": "set_base", "value": 100 },
  "status_effects": [
    "minecraft:poison",
    "minecraft:wither",
    "minecraft:blindness",
    "minecraft:slowness"
  ]
}
```

> [!TIP]
> Combine it with [`apoli:modify_status_effect_amplifier`](/docs/datapack/powers/modify_status_effect_amplifier) to weaken an effect as well as shorten it, or with [`apoli:effect_immunity`](/docs/datapack/powers/effect_immunity) to block it completely.
