---
title: "apoli:undirected"
description: "Checks if the specified bi-entity condition is true before or after swapping the actor and target context."
---

Checks if the specified bi-entity condition is true before or after swapping the actor and target context.

Type ID: `apoli:undirected`


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`condition` | Bi-entity Condition Type | | The bi-entity condition type to check for.


## Examples

```json
"bientity_condition": {
	"type": "apoli:undirected",
	"condition": {
		"type": "apoli:owner"
	}
}
```

This example will check if the actor entity is the owner of the target entity, or if the target entity is the owner of the actor entity.

