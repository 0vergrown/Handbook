---
title: "Undirected (Bi-Entity Condition Type)"
description: "Checks a bi-entity condition both ways round, passing if either direction holds."
navigation_title: "Undirected"
---

Checks a bi-entity condition both ways round, and passes if it holds with the actor and target as they are or with the two swapped.

Type ID: `apoli:undirected`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _required_ | The bi-entity condition to check. |

## Examples

```json
"bientity_condition": {
	"type": "apoli:undirected",
	"condition": {
		"type": "apoli:owner"
	}
}
```

This checks whether the actor owns the target, or the target owns the actor.
