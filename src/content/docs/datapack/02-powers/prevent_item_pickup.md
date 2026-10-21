---
title: "Prevent Item Pickup (Power Type)"
description: "Stops the entity that has the power from picking up items."
navigation_title: "Prevent Item Pickup"
---

Stops the entity that has the power from picking up items.

Type ID: `apoli:prevent_item_pickup`

## Actors and targets

| Field | Actor | Target |
|-------|-------|--------|
| `bientity_action_thrower` | The entity that threw the item. | The entity about to pick up the item. |
| `bientity_action_item` | The entity about to pick up the item. | The item entity being picked up. |
| `bientity_condition` | The entity that threw the item. | The entity about to pick up the item. |

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_action_thrower` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | If set, this action runs on the actor, the target or both, as listed in the table above. |
| `bientity_action_item` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | If set, this action runs on the actor, the target or both, as listed in the table above. |
| `item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item that the entity tried to pick up. The item stays on the ground with the change applied. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the pickup is only stopped when the actor and target pass this condition. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the pickup is only stopped when the item passes this condition. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | When several of these powers stop the same pickup, every one of them runs its actions, highest priority first. |

It works for players and for mobs that pick up loot. The actions run on every attempt to pick the item up, which for a player standing on the item means every tick, so keep them cheap or put a condition on them.

## Examples

```json
{
	"type": "apoli:prevent_item_pickup",
	"item_condition": {
		"type": "apoli:meat"
	}
}
```

This stops the entity from picking up any food that counts as meat.
