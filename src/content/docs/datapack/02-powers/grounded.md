---
title: "Grounded (Power Type)"
description: "An entity with this power counts as being 'on ground', meaning regular walking mechanics can occur even if the entity isn't physically on a block."
navigation_title: "Grounded"
---

An entity with this power counts as being "on ground", meaning regular walking mechanics can occur even if the entity isn't physically on a block.

Type ID: `apoli:grounded`

## Fields

_None._

## Examples

```json
{
    "type": "apoli:grounded"
}
```

The most basic example - always counts the player as being on the ground, allowing them to jump even while in the air.

```json
{
    "type": "apoli:multiple",
    "activate": {
        "type": "apoli:active_self",
        "key": {
			"key": "key.apoli.primary_active"
		},
		"cooldown": 200,
		"entity_action": {
			"type": "apoli:trigger_cooldown",
			"power": "*:*_duration"
		}
    },
    "duration": {
        "type": "apoli:cooldown",
        "cooldown": 120,
        "hud_render": {
			"bar_index": 5
		}
    },
	"effect_grounded": {
		"type": "apoli:grounded",
		"condition": {
			"type": "apoli:resource",
			"resource": "*:*_duration",
			"comparison": ">",
			"compare_to": 0
		}
	},
	"effect_no_velocity": {
		"type": "apoli:modify_velocity",
		"axes": ["y"],
		"modifier": {
			"operation": "set_total",
			"value": 0
		},
		"condition": {
			"type": "apoli:resource",
			"resource": "*:*_duration",
			"comparison": ">",
			"compare_to": 0
		}
	}
}
```

A combination of powers which allows the player to walk on air (neither jump nor fall) for a short duration when they use their primary ability key.
