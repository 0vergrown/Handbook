---
title: "Stacking Status Effect (Power Type)"
description: "Builds up stacks while the power is active and loses them while it isn't. With more than zero stacks, the entity gets status effects that last longer the more stacks it has."
navigation_title: "Stacking Status Effect"
---

Gives the entity that has the power a stack count that rises while the power is active and falls while it isn't. While the count is above 0, the entity gets the listed status effects, and each effect lasts `stacks * duration_per_stack` ticks.

Type ID: `apoli:stacking_status_effect`

While the power is active, the stack count rises by one every `tick_rate` ticks up to `max_stacks`, and never sits below `min_stacks`. While it is inactive, the count falls by one every `tick_rate` ticks down to zero. `min_stacks` is only a floor while the power is active, so an inactive power eventually stops applying its effects.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `min_stacks` | [Integer](/docs/datapack/data-types/integer) | | The stack count the power jumps to the moment it becomes active. Set it above `1` for an effect that starts part of the way up instead of climbing there one stack at a time. Negative numbers are allowed. |
| `max_stacks` | [Integer](/docs/datapack/data-types/integer) | | The stack count the power climbs to and stops at while active. |
| `duration_per_stack` | [Integer](/docs/datapack/data-types/integer) | | The effect duration, in ticks, for each stack. |
| `tick_rate` | [Integer](/docs/datapack/data-types/integer) | `10` | How many ticks it takes to gain or lose a stack. |
| `effect` | [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) | _optional_ | If set, this status effect is applied to the entity that has the power. |
| `effects` | [Array](/docs/datapack/data-types/array) of [Status Effect Instances](/docs/datapack/data-types/status-effect-instance) | _optional_ | If set, these status effects are applied to the entity that has the power. |

## Examples

```json
{
  	"type": "apoli:stacking_status_effect",
  	"min_stacks": -20,
  	"max_stacks": 361,
  	"duration_per_stack": 10,
  	"effects": [
    	{
      		"effect": "minecraft:weakness",
      		"is_ambient": true,
      		"show_particles": false,
      		"show_icon": true
    	},
    	{
      		"effect": "minecraft:slowness",
      		"is_ambient": true,
      		"show_particles": false,
      		"show_icon": true
    	}
  	],
  	"condition": {
    	"type": "apoli:block_collision",
    	"offset_x": 0,
    	"offset_y": 1,
    	"offset_z": 0
  	}
}
```

Under a low ceiling, the count starts at -20 and climbs by one every 10 ticks. After about 10 seconds the entity gets Weakness I and Slowness I, and the effects last longer the longer it stays under the ceiling.

```json
{
    "type": "apoli:stacking_status_effect",
    "min_stacks": -3,
    "max_stacks": 1,
    "duration_per_stack": 100,
    "tick_rate": 20,
    "effect": {
        "effect": "minecraft:blindness",
        "is_ambient": true,
        "show_particles": true,
        "show_icon": true
    },
    "condition": {
        "type": "apoli:exposed_to_sun"
    }
}
```

After 4 seconds in sunlight, the entity is blinded for 5 seconds.
