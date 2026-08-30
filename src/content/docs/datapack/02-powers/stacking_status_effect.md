---
title: "Stacking Status Effect (Power Type)"
description: "Provides a system where the entity that has the power gains/loses a stack per specified interval if the power is active or inactive respectively. If the stack count is greater than 0, the specified status effect(s) will be applied to the entity."
navigation_title: "Stacking Status Effect"
---

Provides a system where the entity that has the power gains/loses a stack per specified interval if the power is active or inactive respectively. If the stack count is greater than 0, the specified status effect(s) will be applied to the entity.

Type ID: `apoli:stacking_status_effect`

> The actual duration of the specified status effect(s) is determined by the `stacks * duration_per_stack` formula.

While the power is **active**, the stack count climbs by one every `tick_rate` ticks up to
`max_stacks`, and never sits below `min_stacks`. While it is **inactive** it falls by one every
`tick_rate` ticks down to **zero** — `min_stacks` is a floor for the active state only, not a
permanent one, so an inactive power stops applying its effects entirely.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`min_stacks` | Integer | | The stack count the power jumps to the moment it becomes active. Set it above `1` for an effect that starts part-way up instead of ticking there one stack at a time. Negative numbers are allowed.
`max_stacks` | Integer | | The stack count it climbs to and stops at while active.
`duration_per_stack` | Integer | | Determines the duration of the specified status effect(s) for each stack.
`tick_rate` | Integer | `10` | Determines how fast the power will gain/lose stacks in ticks.
`effect` | Status Effect Instance | _optional_ | If specified, this status effect will be applied on the entity that has the power.
`effects` | Array of Status Effect Instances | _optional_ | If specified, these status effects will be applied on the entity that has the power.

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

This example will apply the Weakness I and Slowness I status effects that would last for 1 second to the entity that has the power if the entity is under a low ceiling.

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

This example will apply the Blindness I status effect that would last for 5 seconds after being exposed to the sun for at least 4 seconds.
