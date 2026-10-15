---
title: "In Entity Set (Bi-Entity Condition Type)"
description: "Checks whether the target entity is within a power that uses the Entity Set of the actor entity."
navigation_title: "In Entity Set"
aliases: ["in_set"]
---

Checks whether the target entity is within a power that uses the [apoli:entity_set](/docs/datapack/powers/entity_set) of the actor entity.

Type ID: `apoli:in_entity_set` (but can use it's old `in_set` type id as an alias)

To ask from the member's side — is this entity in anyone's set, and how many — use the [entity condition of the same name](/docs/datapack/entity-conditions/in_entity_set).

> This condition also works where the client evaluates conditions, such as [apoli:entity_glow](/docs/datapack/powers/entity_glow), [apoli:model_color](/docs/datapack/powers/model_color) and [apoli:invisibility](/docs/datapack/powers/invisibility). A set is sent to its owner and to every player who can see the owner, so each client can answer it for its own sets and for the sets of any entity in view.

> For a [persistent](/docs/datapack/powers/entity_set#persistent-sets) set, a target that has died or is offline is still in the set. For a default set, a target that has died is never in it.

##	Fields

Field | Type | Default | Description
------|------|---------|------------
`set` | [Identifier](/docs/datapack/data-types/identifier) | | The ID of the power to check whether the target entity is in.

##	Examples

```json
"bientity_condition": {
	"type": "apoli:or",
	"conditions": [
		{
			"type": "apoli:owner"
		},
		{
			"type": "apoli:in_entity_set",
			"set": "example:special_pets"
		}
	]
}
```

This example will check whether the target entity is either owned by the actor entity or if the target entity is within the `example:special_pets` (`data/example/powers/special_pets.json`) power.

```json
{
	"type": "apoli:entity_glow",
	"use_teams": false,
	"red": 1.0,
	"green": 0.2,
	"blue": 0.2,
	"bientity_condition": {
		"type": "apoli:in_entity_set",
		"set": "example:marked"
	}
}
```

This example makes every entity in your `example:marked` set glow red — for you only, since the set and the glow both belong to the player who has them.
