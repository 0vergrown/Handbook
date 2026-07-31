---
title: "Action On Callback (Power Type)"
description: "Execute Entity Action Types depending on the context."
navigation_title: "Action On Callback"
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
`entity_action_chosen` | Entity Action Type | _optional_ | If specified, this action will be executed on the player once they have chosen an origin on **every** layer. Requires the Origins mod — see below.
`execute_chosen_when_orb` | Boolean | `true` | Whether `entity_action_chosen` also fires when the origin was picked via an Orb of Origin rather than the first-join screen. Set it to `false` for a "welcome" action that should only run once.

## Choosing an origin

`entity_action_chosen` and `execute_chosen_when_orb` are the one part of this power that needs the [Origins](/docs/datapack/origins/overview) mod — Origins is what tells Apoli that a choice happened. The power type itself is core Apoli and every other field works without it; the two fields simply never fire.

The action runs when the player has chosen on **all** layers, not once per layer — so on a pack with an origin layer and a class layer, it fires after the second pick, and it is the right hook for handing out starting gear or a greeting.

```json
{
  "type": "apoli:action_on_callback",
  "entity_action_chosen": {
    "type": "apoli:give",
    "stack": { "item": "minecraft:bread", "amount": 3 }
  },
  "execute_chosen_when_orb": false
}
```

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
