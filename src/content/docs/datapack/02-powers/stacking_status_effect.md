---
title: "Stacking Status Effect (Power Type)"
description: "Builds up stacks while the power is active and loses them while it isn't. With more than zero stacks, the entity gets status effects that last longer the more stacks it has."
navigation_title: "Stacking Status Effect"
---

Gives the entity that has the power a stack count that rises while the power is active and falls while it isn't. While the count is above 0, the entity gets the listed status effects, and each effect lasts `stacks * duration_per_stack` ticks.

Type ID: `apoli:stacking_status_effect`

While the power is active, the stack count rises by one every `tick_rate` ticks up to `max_stacks`, and the effects are applied whenever it is above 0. While the power is inactive, the count falls by one every `tick_rate` ticks down to `min_stacks` and no new effects are applied, so whatever the entity already has runs out on its own.

A negative `min_stacks` works as a delay. The count has to climb back past 0 before the effects start, so an entity that has been inactive long enough waits about `(1 - min_stacks) * tick_rate` ticks after the power turns on. A power that has just been granted starts at `min_stacks` when it is negative, and at 0 otherwise.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `min_stacks` | [Integer](/docs/datapack/data-types/integer) | _required_ | The lowest the stack count goes. A negative value delays the effects, and a value above `0` makes the count jump straight to it the moment the power becomes active. |
| `max_stacks` | [Integer](/docs/datapack/data-types/integer) | _required_ | The stack count the power climbs to and stops at while active. |
| `duration_per_stack` | [Integer](/docs/datapack/data-types/integer) | _required_ | The effect duration, in ticks, for each stack. |
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

Under a low ceiling, the count climbs from -20 by one every 10 ticks, so the entity gets Weakness I and Slowness I after about 10 seconds. The effects last longer the longer it stays under the ceiling, and back in the open the count sinks to -20 again.

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
