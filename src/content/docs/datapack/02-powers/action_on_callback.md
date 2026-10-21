---
title: "Action On Callback (Power Type)"
description: "Runs entity actions at points such as gaining the power, respawning or choosing an origin."
navigation_title: "Action On Callback"
---

Runs entity actions at points in the power's life, such as when the player gains it, joins or leaves the world, respawns or chooses an origin.

Type ID: `apoli:action_on_callback`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action_gained` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player when the entity gets the power for the first time. |
| `entity_action_lost` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player when the power is removed from the entity for good. |
| `entity_action_added` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player whenever the power is added to the entity. Joining a world adds each power back. |
| `entity_action_removed` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player whenever the power is removed from the entity, and right after the player respawns. Leaving a world removes each power. |
| `entity_action_respawned` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player right after they respawn, after the action in `entity_action_removed`. |
| `entity_action_chosen` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player once they have chosen an origin on every layer. It needs the Origins mod, as explained below. |
| `execute_chosen_when_orb` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether `entity_action_chosen` also runs when the origin was picked with an Orb of Origin instead of the first-join screen. Set it to `false` for a welcome action that should only run once. |

> [!NOTE]
> `entity_action_added` and `entity_action_respawned` both run on the tick after the respawn completes, not during it. The respawn sequence sets the player's position, health and inventory last, so an action run during the respawn would be undone.

## Choosing an origin

`entity_action_chosen` and `execute_chosen_when_orb` are the only part of this power that needs the [Origins](/docs/datapack/origins/overview) mod, because Origins is what tells Apoli that a choice happened. The power type itself is core Apoli and every other field works without Origins. Without it, these two fields never fire.

The action runs once the player has chosen on all layers, not once per layer. On a pack with an origin layer and a class layer, it fires after the second pick, which makes it the right place to hand out starting gear or a greeting.

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

This makes players join the team called "TheNetherBoys" when they gain the power, and leave it when they lose the power.

> [!NOTE]
> The "TheNetherBoys" team has to exist already for this power to work.
