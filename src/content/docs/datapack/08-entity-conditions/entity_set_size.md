---
title: "Entity Set Size (Entity Condition Type)"
description: "Compares the amount of entities stored in a power that uses the Entity Set to a certain value."
navigation_title: "Entity Set Size"
aliases: ["set_size"]
---

Compares the amount of entities stored in a power that uses the [apoli:entity_set](/docs/datapack/powers/entity_set) to a certain value.

Type ID: `apoli:entity_set_size` (but can use it's old `set_size` type id as an alias)

> This condition also works where the client evaluates conditions, such as the `condition` of a render power. A set is sent to its owner and to every player who can see the owner, so a client knows the size of its own sets and of the sets of any entity in view.

> The size counts every member, including offline players and, for a [persistent](/docs/datapack/powers/entity_set#persistent-sets) set, members that no longer exist.

##	Fields

Field | Type | Default | Description
------|------|---------|------------
`set` | [Identifier](/docs/datapack/data-types/identifier) | | The ID of the power.
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | | Determines how the amount of referenced entities in the specified power should be compared to the specified value.
`compare_to` | [Integer](/docs/datapack/data-types/integer) | | The value at which the amount of referenced entities in the specified power will be compared to.

##	Examples

```json
"condition": {
	"type": "apoli:entity_set_size",
	"set": "example:special_pets",
	"comparison": ">",
	"compare_to": 0
}
```

This example will check if the amount of entities stored in the `example:special_pets` (`data/example/powers/special_pets.json`) power is non-zero (e.g: if it's not empty).
