---
title: "apoli:action_on_entity_set"
description: "Executes an action on entities stored within the power that uses the Entity Set."
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
