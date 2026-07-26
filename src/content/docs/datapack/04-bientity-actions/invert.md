---
title: "apoli:invert"
description: "Swaps the context of the target entity and the actor entity."
---

Swaps the context of the target entity and the actor entity.

Type ID: `apoli:invert`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`action` | Bi-entity Action Type | | The bi-entity action to execute which will have its 'target' and 'actor' contexts swapped.

## Examples

```json
"bientity_action": {
    "type": "apoli:invert",
    "action": {
	    "type": "apoli:add_velocity",
	    "z": -2
    }
}
```

This example will "pull" the actor entity to the target entity.
