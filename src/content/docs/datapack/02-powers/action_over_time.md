---
title: "Action Over Time (Power Type)"
description: "Executes an Entity Action Type on the entity that has the power within the specified interval."
navigation_title: "Action Over Time"
---

Executes an Entity Action Type on the entity that has the power within the specified interval.

Type ID: `apoli:action_over_time`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`interval` | [Integer](/docs/datapack/data-types/integer) | `20` | Interval of ticks between subsequent executions of the specified actions. Must be a value of at least 1.
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
