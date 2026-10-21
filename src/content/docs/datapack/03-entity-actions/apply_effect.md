---
title: "Apply Effect (Entity Action Type)"
description: "Gives a living entity one or more status effects."
navigation_title: "Apply Effect"
---

Gives a living entity one or more status effects. It does nothing to entities that aren't alive.

Type ID: `apoli:apply_effect`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `effect` | [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) | _optional_ | A status effect to apply. |
| `effects` | [Array](/docs/datapack/data-types/array) of [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) | _optional_ | Several status effects to apply. |

## Examples

```json
"entity_action": {
    "type": "apoli:apply_effect",
    "effect": {
        "effect": "minecraft:speed",
        "duration": 400,
        "amplifier": 0
    }
}
```

This gives the entity Speed I for 20 seconds.

```json
"entity_action": {
	"type": "apoli:apply_effect",
	"effects": [
		{
			"effect": "minecraft:slow_falling",
			"duration": 400,
			"is_ambient": false,
			"show_particles": false,
			"show_icon": true
		},
		{
			"effect": "minecraft:slowness",
			"duration": 400,
			"is_ambient": false,
			"show_particles": false,
			"show_icon": true
		}
	]
}
```

This gives the entity Slow Falling I and Slowness I, both for 20 seconds.
