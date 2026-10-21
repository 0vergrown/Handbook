---
title: "Action On Entity Set (Entity Action Type)"
description: "Runs a bi-entity action on the entities stored in an entity set power."
navigation_title: "Action On Entity Set"
aliases: ["action_on_set"]
---

Runs a bi-entity action on the entities stored in an [apoli:entity_set](/docs/datapack/powers/entity_set) power. The actor is the entity that ran the action and each stored entity is a target, whatever dimension it is in.

Type ID: `apoli:action_on_entity_set` (the older `apoli:action_on_set` ID is accepted as an alias)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `set` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the entity set power. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _required_ | The action to run for each stored entity. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | The action only runs for stored entities that pass this condition. |
| `limit` | [Integer](/docs/datapack/data-types/integer) | `0` | The most entities to run the action on. `0` or less means no limit. |
| `reverse` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether to go through the stored entities in reverse order. |
| `iterate` | [Set Iteration](/docs/datapack/data-types/set-iteration) | `members` | Which side of the set to walk: `members` for the set you own, or `owners` for every set that has you in it. |
| `include_offline` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Also visits players who are offline, as read-only copies of their saved data. See [Reaching players who are offline](#reaching-players-who-are-offline). |

### Walking the owners instead of the members

By default the entity running this action must hold the [apoli:entity_set](/docs/datapack/powers/entity_set) power itself, and nothing happens if it doesn't. That makes the common case of leaving a set that captured you impossible to write, because the set lives on the entity that added you.

`"iterate": "owners"` reverses the walk. It finds every entity whose `set` power contains you and runs the bi-entity action once per entity, with the set's owner as the actor and you as the target. Those are exactly the roles [apoli:remove_from_entity_set](/docs/datapack/bientity-actions/remove_from_entity_set) expects, so leaving a set someone else put you in takes one action.

`limit` and `reverse` apply to the list of owners in this mode. `bientity_condition` is tested with the same actor and target the action would get.

### Reaching players who are offline

By default this action only visits entities that are in the world, and a member or owner who is offline, or a mob in an unloaded chunk, is skipped.

With `"include_offline": true`, a player who is offline is visited too, as an offline copy: a stand-in loaded from the player's saved data, with their powers, resources, origin, inventory and position. Conditions can read it, and [apoli:exists](/docs/datapack/entity-conditions/exists) (also written `apoli:online`) is `false` for it, so you can tell the two apart. Set actions work on it. An offline owner can be the actor of [apoli:remove_from_entity_set](/docs/datapack/bientity-actions/remove_from_entity_set), so a member can leave a [persistent](/docs/datapack/powers/entity_set#persistent-sets) set while its owner is away.

- Anything else an action changes on the offline copy is thrown away, and the player's real data only changes when they play. Use offline copies for questions and set membership, and keep damage, items and resources for players who are online.
- Conditions about the world around the copy (blocks, biome, light) read the player's last position, which may have to load that chunk.
- Mobs are never copied, so an unloaded or dead mob is still skipped.
- The copy is loaded from disk the first time it is needed and kept until the player logs in again, for up to 32 offline players at a time. Repeated visits cost a map lookup.

## Examples

```json
"entity_action": {
	"type": "apoli:action_on_entity_set",
	"set": "example:special_pets",
	"bientity_action": {
		"type": "apoli:target_action",
		"action": {
			"type": "apoli:heal",
			"amount": 4
		}
	}
}
```

This restores 2 hearts to the entities that were added to the `example:special_pets` power (`data/example/powers/special_pets.json`) with [apoli:add_to_entity_set](/docs/datapack/bientity-actions/add_to_entity_set).

```json
{
	"type": "apoli:action_when_hit",
	"entity_action": {
		"type": "apoli:action_on_entity_set",
		"set": "example:mind_controlled",
		"iterate": "owners",
		"bientity_action": {
			"type": "apoli:remove_from_entity_set",
			"set": "example:mind_controlled"
		}
	}
}
```

Put this on the victim. Taking any damage removes them from every `example:mind_controlled` set they are in, and fires that set's `action_on_remove` on the way out. Without `"iterate": "owners"` it does nothing, because the victim never holds the set power.

```json
"entity_action": {
	"type": "apoli:action_on_entity_set",
	"set": "example:soul_bond",
	"iterate": "owners",
	"include_offline": true,
	"bientity_condition": {
		"type": "apoli:actor_condition",
		"condition": {
			"type": "apoli:online",
			"inverted": true
		}
	},
	"bientity_action": {
		"type": "apoli:remove_from_entity_set",
		"set": "example:soul_bond"
	}
}
```

Run by a member, this breaks every `example:soul_bond` link whose owner is offline right now, and leaves the links of owners who are online alone.
