---
title: "apoli:action_on_callback"
description: "Execute Entity Action Types depending on the context."
---

Execute Entity Action Types depending on the context.

Type ID: `apoli:action_on_callback`

> Callbacks may refer to when the player joins the world, when the player leaves the world, when the player respawns, etc.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_action_gained` | Entity Action Type | _optional_ | If specified, this action will be executed on the player when the power is added to the entity for the first time.
`entity_action_lost` | Entity Action Type | _optional_ | If specified, this action will be executed on the player when the power is removed from the entity permanently.
`entity_action_added` | Entity Action Type | _optional_ | If specified, this action will be executed on the player when the power is added to the entity. Joining a world adds each power back.
`entity_action_removed` | Entity Action Type | _optional_ | If specified, this action will be executed on the player when the power is removed from the entity and right after the player respawns. Leaving a world removes each power.
`entity_action_respawned` | Entity Action Type | _optional_ | If specified, this action will be executed on the player right after the player respawns. This action will be executed after the action in `entity_action_removed`.

## Examples

```json
{
  	"type": "apoli:action_on_callback",
  	"entity_action_gained": {
    	"type": "apoli:execute_command",
    	"command": "team join TheNetherBoys @s"
  	},
  	"entity_action_lost": {
    	"type": "apoli:execute_command",
    	"command": "team leave @s"
  	}
}
```

This example will make players automatically join the team called "TheNetherBoys" upon gaining the power, and will make the players also leave automatically.
(The "TheNetherBoys" team has to exist beforehand for this power to work!)

