---
title: "apoli:remove_from_entity_set"
description: "Removes the target entity from the power that uses the Entity Set of the actor entity."
---

Removes the target entity from the power that uses the [apoli:entity_set](/docs/datapack/powers/entity_set) of the actor entity.

Type ID: `apoli:remove_from_entity_set` (but can use it's old `remove_from_set` type id as an alias)


##	Fields

Field | Type | Default | Description
------|------|---------|------------
`set` | [Identifier](/docs/datapack/data-types/identifier) | | The ID of the power to remove the target entity from.


##	Examples

```json
"bientity_action": {
	"type": "apoli:remove_from_entity_set",
	"set": "example:entities_to_exclude"
}
```

This example will remove the target entity from the `example:entities_to_exclude` (`data/example/powers/entities_to_exclude.json`) power.

