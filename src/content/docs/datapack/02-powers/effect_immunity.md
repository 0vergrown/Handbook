---
title: "Effect Immunity (Power Type)"
description: "Stops status effects from being applied to the entity that has the power."
navigation_title: "Effect Immunity"
---

Stops status effects from being applied to the entity that has the power.

Type ID: `apoli:effect_immunity`

> [!NOTE]
> Immunity is checked when an effect is applied, and while the power is active it also removes any matching effect the entity already has. So when the power's `condition` starts to hold, an effect the entity picked up earlier is removed instead of running out.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `effect` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If set, the status effect the entity is immune to. |
| `effects` | [Array](/docs/datapack/data-types/array) of [Identifiers](/docs/datapack/data-types/identifier) | _optional_ | If set, the status effects the entity is immune to. |
| `inverted` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `true`, the entity is immune to every status effect except the listed ones. |

## Examples

```json
{
	"type": "apoli:effect_immunity",
	"effects": [
		"minecraft:weakness",
		"minecraft:strength"
	]
}
```

This makes the entity immune to Weakness and Strength.
