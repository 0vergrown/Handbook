---
title: "Remove From Entity Set (Bi-Entity Action Type)"
description: "Removes the target from one of the actor's entity set powers."
navigation_title: "Remove From Entity Set"
aliases: ["remove_from_set"]
---

Removes the target entity from one of the actor's [apoli:entity_set](/docs/datapack/powers/entity_set) powers.

Type ID: `apoli:remove_from_entity_set` (the older `apoli:remove_from_set` ID is accepted as an alias)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `set` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the entity set power to remove the target from. |

## Examples

```json
"bientity_action": {
	"type": "apoli:remove_from_entity_set",
	"set": "example:entities_to_exclude"
}
```

This removes the target from the `example:entities_to_exclude` power (`data/example/powers/entities_to_exclude.json`).
