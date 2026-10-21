---
title: "Add To Entity Set (Bi-Entity Action Type)"
description: "Adds the target to one of the actor's entity set powers, for good or for a while."
navigation_title: "Add To Entity Set"
aliases: ["add_to_set"]
---

Adds the target entity to one of the actor's [apoli:entity_set](/docs/datapack/powers/entity_set) powers.

Type ID: `apoli:add_to_entity_set` (the older `apoli:add_to_set` ID is accepted as an alias)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `set` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the entity set power to add the target to. |
| `time_limit` | [Integer](/docs/datapack/data-types/integer) | _optional_ | How many ticks the target stays in the set. Without it, the target stays until it is removed. |

## Examples

```json
"bientity_action": {
	"type": "apoli:add_to_entity_set",
	"set": "example:entities_to_exclude"
}
```

This adds the target to the `example:entities_to_exclude` power (`data/example/powers/entities_to_exclude.json`) for good.

```json
"bientity_action": {
	"type": "apoli:add_to_set",
	"set": "example:make_em_glow",
	"time_limit": 200
}
```

This adds the target to the `example:make_em_glow` power (`data/example/powers/make_em_glow.json`) for 10 seconds, after which it is removed again.
