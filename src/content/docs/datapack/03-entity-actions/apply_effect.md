---
title: "apoli:apply_effect"
description: "Adds one or more status effects to the living entity."
---

Adds one or more status effects to the living entity. Does not have an effect on non-living entities.

Type ID: `apoli:apply_effect`


## Fields

| Field     | Type                                                    | Default    | Description                                                  |
| --------- | ------------------------------------------------------- | ---------- | ------------------------------------------------------------ |
| `effect`  | [Status Effect Instance](/docs/datapack/data-types/status-effect-instance)                      | _optional_ | If set, this status effect will be applied by this action.   |
| `effects` | [Array](/docs/datapack/data-types/array) of [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) | _optional_ | If set, these status effects will be applied by this action. |


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

This example will apply a Speed I status effect to the entity that would last for 20 seconds.


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
This example will apply both Slowness I and Slow Falling I status effects that lasts for 20 seconds.
