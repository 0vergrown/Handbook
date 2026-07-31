---
title: "Entity Set (Power Type)"
description: "Provides a 'set' (a storage) for storing entities that can be used for executing actions on the entities within the set, or checking whether an entity is…"
navigation_title: "Entity Set"
---

Provides a "set" (a storage) for storing entities that can be used for executing actions on the entities within the set, or checking whether an entity is stored within the set.

Type ID: `apoli:entity_set`

> In the context of this power type, the '**actor**' will be the entity that has the power while the '**target**' will be the entities within the set. Entities are not stored in the set physically, meaning that the entity will continue to exist as is. The UUID of the entity is stored in the power's data, allowing for the power type to access the entity for later use (unless the entity no longer exists). Of course if you think there is a better way to do this, please do.

##	Fields

Field | Type | Default | Description
------|------|---------|------------
`action_on_add` | Bi-entity Action Type | *optional* | If specified, this bi-entity action will be executed on either or both the '**actor**' and the '**target**' upon the '**target**' being added to the set.
`action_on_remove` | Bi-entity Action Type | *optional* | If specified, this bi-entity action will be executed on either or both the '**actor**' and the '**target**' upon the '**target**' being removed from the set.

##	Examples

```json
{
	"type": "apoli:entity_set"
}
```

This example simply provides a set. No actions will be executed to entities being added to or removed from the set.

```json
{
	"type": "apoli:entity_set",
	"action_on_remove": {
		"type": "apoli:tame"
	}
}
```

This example will tame the target entities that were removed from the set with the actor entity as the owner.
