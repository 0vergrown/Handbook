---
title: "Modify Status Effect Amplifier (Power Type)"
description: "Changes how strong status effects are when they are applied."
navigation_title: "Modify Status Effect Amplifier"
---

Changes the amplifier of status effects as they are applied to the entity with the power. Amplifier `0` is level I and `1` is level II, so setting it to `0` means "always level I".

Type ID: `apoli:modify_status_effect_amplifier`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the amplifier. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers. |
| `status_effect` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Limits the power to one effect. |
| `status_effects` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | `[]` | Limits the power to several effects. An empty list means every effect. |

## Examples

Poison, Weakness and Mining Fatigue always land at level I:

```json
{
  "type": "apoli:modify_status_effect_amplifier",
  "modifier": { "operation": "set_total", "value": 0 },
  "status_effects": [
    "minecraft:poison",
    "minecraft:weakness",
    "minecraft:mining_fatigue"
  ]
}
```

Strength, Speed and Regeneration land one level higher:

```json
{
  "type": "apoli:modify_status_effect_amplifier",
  "modifier": { "operation": "add_base_early", "value": 1 },
  "status_effects": ["minecraft:strength", "minecraft:speed", "minecraft:regeneration"]
}
```
