---
title: "Entity Set Size (Entity Condition Type)"
description: "Compares how many entities an entity set power holds with a number."
navigation_title: "Entity Set Size"
aliases: ["set_size"]
---

Compares how many entities are stored in an [apoli:entity_set](/docs/datapack/powers/entity_set) power with a number.

Type ID: `apoli:entity_set_size` (the older `apoli:set_size` ID is accepted as an alias)

> [!NOTE]
> This condition also works where the client evaluates conditions, such as the `condition` of a render power. A set is sent to its owner and to every player who can see the owner, so a client knows the size of its own sets and of the sets of any entity in view.

> [!NOTE]
> The size counts every member, including offline players and, for a [persistent](/docs/datapack/powers/entity_set#persistent-sets) set, members that no longer exist.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `set` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the entity set power. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the number of stored entities is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the count is compared with. |

## Examples

```json
"condition": {
	"type": "apoli:entity_set_size",
	"set": "example:special_pets",
	"comparison": ">",
	"compare_to": 0
}
```

This checks whether the `example:special_pets` power (`data/example/powers/special_pets.json`) holds any entities, meaning it isn't empty.
