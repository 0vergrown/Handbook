---
title: "Modify Attribute (Power Type)"
description: "Legacy alias of apoli:attribute that takes a single attribute at the top level."
navigation_title: "Modify Attribute"
---

Applies modifiers to one attribute. This is a **legacy alias** of [`apoli:attribute`](/docs/datapack/powers/attribute) — the only difference is that the attribute is written once at the top level instead of inside each modifier, and Apoli folds it in for you.

Type ID: `apoli:modify_attribute`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`attribute` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The attribute every modifier applies to.
`modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier.
`modifiers` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) array | _optional_ | Several modifiers.
`update_health` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Scale current health with max health when the attribute is `minecraft:generic.max_health`.

## The composed form

`apoli:attribute` lets each modifier name its own attribute, so one power can touch several at once — which `apoli:modify_attribute` cannot:

```json
{
  "type": "apoli:attribute",
  "modifiers": [
    {
      "attribute": "minecraft:generic.max_health",
      "operation": "multiply_base_multiplicative",
      "value": -0.4
    },
    {
      "attribute": "minecraft:generic.movement_speed",
      "operation": "multiply_base_multiplicative",
      "value": 0.2
    }
  ]
}
```
