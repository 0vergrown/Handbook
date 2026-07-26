---
title: "apoli:add_to_entity_set"
description: "Add the target entity to the power that uses the Entity Set of the actor entity."
---

Add the target entity to the power that uses the [apoli:entity_set](/docs/datapack/powers/entity_set) of the actor entity.

Type ID: `apoli:add_to_entity_set` (but can use it's old `add_to_set` type id as an alias)

##	Fields

Field | Type | Default | Description
------|------|---------|------------
`set` | [Identifier](/docs/datapack/data-types/identifier) | | The ID of the power to add the target entity into.
`time_limit` | [Integer](/docs/datapack/data-types/integer) | *optional* | If specified, this will determine how long the target entity will be stored in the specified power in ticks.


##	Examples

```json
"bientity_action": {
	"type": "apoli:add_to_entity_set",
	"set": "example:entities_to_exclude"
}
```

This example will add the target entity to the `example:entities_to_exclude` (`data/example/powers/entities_to_exclude.json`) power permanently.

```json
"bientity_action": {
	"type": "apoli:add_to_set",
	"set": "example:make_em_glow",
	"time_limit": 200
}
```

This example will add the target entity to the `example:make_em_glow` (`data/example/powers/make_em_glow.json`) power temporarily for 10 seconds, after which the target entity will be removed.

