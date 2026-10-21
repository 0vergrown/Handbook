---
title: "In Entity Set (Bi-Entity Condition Type)"
description: "Checks whether the target is in one of the actor's entity set powers."
navigation_title: "In Entity Set"
aliases: ["in_set"]
---

Checks whether the target is in one of the actor's [apoli:entity_set](/docs/datapack/powers/entity_set) powers.

Type ID: `apoli:in_entity_set` (the older `apoli:in_set` ID is accepted as an alias)

To ask from the member's side, whether an entity is in anyone's set and how many, use the [entity condition of the same name](/docs/datapack/entity-conditions/in_entity_set).

> [!NOTE]
> This condition also works where the client evaluates conditions, such as [apoli:entity_glow](/docs/datapack/powers/entity_glow), [apoli:model_color](/docs/datapack/powers/model_color) and [apoli:invisibility](/docs/datapack/powers/invisibility). A set is sent to its owner and to every player who can see the owner, so each client can answer it for its own sets and for the sets of any entity in view.

> [!NOTE]
> For a [persistent](/docs/datapack/powers/entity_set#persistent-sets) set, a target that has died or is offline is still in the set. For a default set, a target that has died is never in it.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `set` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the entity set power to look in. |

## Examples

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

This checks whether the actor owns the target, or the target is in the actor's `example:special_pets` power (`data/example/powers/special_pets.json`).

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

This makes every entity in your `example:marked` set glow red, for you only, since the set and the glow both belong to the player who has them.
