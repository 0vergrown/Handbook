---
title: "apoli:entity_set_size"
description: "Compares the amount of entities stored in a power that uses the Entity Set to a certain value."
---

Compares the amount of entities stored in a power that uses the [apoli:entity_set](/docs/datapack/powers/entity_set) to a certain value.

Type ID: `apoli:entity_set_size` (but can use it's old `set_size` type id as an alias)


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
