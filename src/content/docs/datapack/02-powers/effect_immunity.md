---
title: "Effect Immunity (Power Type)"
description: "Prevents status effects from being applied to the entity that has the power."
navigation_title: "Effect Immunity"
---

Prevents status effects from being applied to the entity that has the power.

Type ID: `apoli:effect_immunity`

> Immunity is not only checked when an effect is applied — while the power is active it also **strips any matching effect the entity already has**. That is what makes a `condition` on this power observable: when the condition starts holding, an effect the entity picked up beforehand is removed rather than being allowed to run out.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`effect` | Identifier | _optional_ | If specified, only the status effect with this namespace and ID can not be applied to the entity that has the power.
`effects` | Array of Identifiers | _optional_ | If specified, only the status effects with the specified namespace and IDs can not be applied to the entity that has the power.
`inverted` | Boolean | `false` | Determines whether to make the entity immune to the status effect(s) that aren't specified.

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

This example will make the entity immune to the Weakness and Strength status effects.
