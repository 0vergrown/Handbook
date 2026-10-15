---
title: "Action On Entity Set (Entity Action Type)"
description: "Executes an action on entities stored within the power that uses the Entity Set."
navigation_title: "Action On Entity Set"
aliases: ["action_on_set"]
---

Executes an action on entities stored within the power that uses the [apoli:entity_set](/docs/datapack/powers/entity_set).

Type ID: `apoli:action_on_entity_set` (but can use it's old `action_on_set` type id as an alias)

> In the context of this entity action type, the actor will be the entity that invoked the entity action while the target will be the entities within the power. The action will be executed on the entities stored within the power regardless of their dimension.

##	Fields

Field | Type | Default | Description
------|------|---------|------------
`set` | [Identifier](/docs/datapack/data-types/identifier) | | The ID of the power.
`bientity_action` | Bi-entity Action Type | | The bi-entity action to execute on both or either the actor and target.
`bientity_condition` | Bi-entity Condition Type | *optional* | If specified, only execute the bi-entity action if this bi-entity condition is fulfilled by both or either the actor and target.
`limit` | [Integer](/docs/datapack/data-types/integer) | `0` | Determines the max amount of times the entity action type should iterate and execute the bi-entity action on the entities stored within the power. If the value is less than or equal to `0`, then there will be no limit.
`reverse` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Determines whether to reverse the order of the entities within the power when processing.
`iterate` | [Set Iteration](/docs/datapack/data-types/set-iteration) | `members` | Which side of the set to walk — `members` for the set *you* own, `owners` for every set that has *you* in it.
`include_offline` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Also visit players who are offline, as read-only copies of their saved data. See [Reaching players who are offline](#reaching-players-who-are-offline).

### Walking the owners instead of the members

By default the entity running this action must hold the [apoli:entity_set](/docs/datapack/powers/entity_set) power itself; if it doesn't, nothing happens. That makes the common "get me out of the set that captured me" case impossible to write, because the set lives on the entity that *added* you, not on you.

`"iterate": "owners"` flips the walk: it finds every entity whose `set` power currently contains you, and runs the bi-entity action once per such entity with **the set's owner as the actor and you as the target**. Those are exactly the roles [apoli:remove_from_entity_set](/docs/datapack/bientity-actions/remove_from_entity_set) expects, so leaving a set someone else put you in is a one-liner.

`limit` and `reverse` apply to the owner list in this mode. `bientity_condition` is tested with the same actor/target pair that the action would receive.

### Reaching players who are offline

By default this action only visits entities that are in the world: a member or owner who is offline, or a mob in an unloaded chunk, is skipped.

With `"include_offline": true`, a player who is offline is visited too, as an **offline copy**: a stand-in loaded from the player's saved data, with their powers, resources, origin, inventory and position. Conditions can read it, and [apoli:exists](/docs/datapack/entity-conditions/exists) (also written `apoli:online`) is `false` for it, so you can tell the two apart. Set actions work on it: an offline owner can be the actor of [apoli:remove_from_entity_set](/docs/datapack/bientity-actions/remove_from_entity_set), so a member can leave a [persistent](/docs/datapack/powers/entity_set#persistent-sets) set while its owner is away.

- Anything else an action changes on the offline copy is thrown away; the player's real data only changes when they play. Use offline copies for questions and set membership, not for damage, items or resources.
- Conditions about the world around the copy (blocks, biome, light) read their last position, which may have to load that chunk.
- Mobs are never copied: an unloaded or dead mob is still skipped.
- The copy is loaded from disk the first time it is needed and kept, for up to 32 offline players at a time, until the player logs in again. Repeated visits cost a map lookup.

##	Examples

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

This example will restore 2 hearts to entities that were added to the `example:special_pets` (`data/example/powers/special_pets.json`) power using the [apoli:add_to_entity_set](/docs/datapack/bientity-actions/add_to_entity_set).

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

Put this on the *victim*: taking any damage removes them from every `example:mind_controlled` set they are in, firing that set's `action_on_remove` on the way out. Without `"iterate": "owners"` this does nothing, because the victim never holds the set power.

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
