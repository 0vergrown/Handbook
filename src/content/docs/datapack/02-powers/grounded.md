---
title: "Grounded (Power Type)"
description: "The entity counts as standing on the ground, even when it isn't on a block."
navigation_title: "Grounded"
---

An entity with this power counts as standing on the ground, so normal walking works even when it isn't on a block.

Type ID: `apoli:grounded`

## Fields

_None._

## Examples

```json
{
    "type": "apoli:grounded"
}
```

This always counts the player as on the ground, so they can jump in mid-air.

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

These powers let the player walk on air, neither jumping nor falling, for a short time after they press their primary ability key.
