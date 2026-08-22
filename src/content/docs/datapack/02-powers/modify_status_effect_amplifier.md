---
title: "Modify Status Effect Amplifier (Power Type)"
description: Modifies how strong status effects are when they are applied.
navigation_title: "Modify Status Effect Amplifier"
---

Modifies the amplifier of status effects as they are applied to the holder. Amplifier `0` is level I, `1` is level II, and so on, so setting it to `0` means "always level I".

Type ID: `apoli:modify_status_effect_amplifier`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the amplifier.
`modifiers` | array of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers.
`status_effect` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Restrict to one effect.
`status_effects` | array of [Identifier](/docs/datapack/data-types/identifier) | `[]` | Restrict to several. Empty means every effect.

## Examples

Every harmful effect is knocked down to its weakest level:

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

A brewer whose own potions land one level higher:

```json
{
  "type": "apoli:modify_status_effect_amplifier",
  "modifier": { "operation": "add_base_early", "value": 1 },
  "status_effects": ["minecraft:strength", "minecraft:speed", "minecraft:regeneration"]
}
```
