---
title: "Modify Status Effect Duration (Power Type)"
description: Modifies how long status effects last when they are applied.
navigation_title: "Modify Status Effect Duration"
---

Modifies the duration of status effects as they are applied to the holder. It works at the moment the effect arrives, so it does not change effects the entity already has.

Type ID: `apoli:modify_status_effect_duration`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the duration, in ticks.
`modifiers` | array of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers.
`status_effect` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Restrict to one effect.
`status_effects` | array of [Identifier](/docs/datapack/data-types/identifier) | `[]` | Restrict to several. Empty means every effect.

## Examples

Potions last twice as long:

```json
{
  "type": "apoli:modify_status_effect_duration",
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": 1.0
  }
}
```

An origin that shrugs off the bad ones quickly — cap a list of harmful effects at five seconds:

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

> Pair it with [`apoli:modify_status_effect_amplifier`](/docs/datapack/powers/modify_status_effect_amplifier) to weaken an effect as well as shorten it, or with [`apoli:effect_immunity`](/docs/datapack/powers/effect_immunity) to block it outright.
