---
title: "Prevent Death (Power Type)"
description: "Stops the entity from dying. Damage that would kill it leaves it at half a heart instead."
navigation_title: "Prevent Death"
---

Stops the entity that has the power from dying. Damage that would kill it leaves it at half a heart instead.

Type ID: `apoli:prevent_death`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `damage_condition` | [Damage Condition Type](/docs/datapack/damage-conditions) | _optional_ | If set, death is only prevented when the damage passes this condition. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the entity when death is prevented. |

## Examples

```json
{
    "type": "apoli:prevent_death",
    "entity_action": {
		"type": "apoli:and",
		"actions": [
			{
				"type": "apoli:clear_effect"
			},
			{
				"type": "apoli:apply_effect",
				"effects": [
					{
						"effect": "minecraft:regeneration",
						"amplifier": 1,
						"duration": 900
					},
					{
						"effect": "minecraft:fire_resistance",
						"duration": 800
					},
					{
						"effect": "minecraft:absorption",
						"amplifier": 1,
						"duration": 100
					}
				]
			}
		]
	}
}
```

This always prevents death and then does what a Totem of Undying does: it clears every status effect, then applies Regeneration II, Fire Resistance I and Absorption II.
