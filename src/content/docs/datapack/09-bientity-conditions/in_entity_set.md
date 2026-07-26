---
title: "apoli:in_entity_set"
description: "Checks whether the target entity is within a power that uses the Entity Set of the actor entity."
---

Checks whether the target entity is within a power that uses the [apoli:entity_set](/docs/datapack/powers/entity_set) of the actor entity.

Type ID: `apoli:in_entity_set` (but can use it's old `in_set` type id as an alias)


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

