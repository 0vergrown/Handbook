---
title: "Action Over Time (Power Type)"
description: "Executes an Entity Action Type on the entity that has the power within the specified interval."
navigation_title: "Action Over Time"
aliases: ["damage_over_time", "burn", "exhaust"]
---

Executes an Entity Action Type on the entity that has the power within the specified interval.

Type ID: `apoli:action_over_time`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`interval` | [Integer](/docs/datapack/data-types/integer) | `20` | Interval of ticks between subsequent executions of the specified actions. Must be a value of at least 1.
`onset_delay` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks to wait after the condition first becomes true before `entity_action` starts running. `rising_action` still fires immediately.
`entity_action` | Entity Action Type | _optional_ | The action to execute on the entity that has the power each interval.
`rising_action` | Entity Action Type | _optional_ | The action to execute on the first interval tick in which the condition became true.
`falling_action` | Entity Action Type | _optional_ | The action to execute on the first interval tick in which the condition became false.

## Examples
```json
{
  	"type": "apoli:action_over_time",
  	"entity_action": {
    	"type": "apoli:set_on_fire",
    	"duration": 4
  	},
  	"interval": 20,
  	"condition": {
    	"type": "apoli:on_fire"
  	}
}
```

This example will set the entity on fire if the entity that has the power is on fire, essentially making the entity burn indefinitely unless the entity manages to extinguish the fire.

`onset_delay` gives the power a grace period. This one only starts hurting after the entity has been in the rain for five seconds, then damages every second:

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "onset_delay": 100,
  "entity_action": {
    "type": "apoli:damage",
    "amount": 2,
    "damage_type": "minecraft:drown"
  },
  "condition": { "type": "apoli:in_rain" }
}
```

Because it takes an [Expression](/docs/datapack/data-types/expression), the delay can also be driven by a resource — `"onset_delay": "20 + mypack:insulation * 26"` waits longer the more insulation the holder has built up.

> Three power types are just this one with the action pre-filled: [`apoli:damage_over_time`](/docs/datapack/powers/damage_over_time), [`apoli:burn`](/docs/datapack/powers/burn) and [`apoli:exhaust`](/docs/datapack/powers/exhaust). They still load, and they resolve to `apoli:action_over_time`.
