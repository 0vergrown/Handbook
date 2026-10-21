---
title: "Invert (Bi-Entity Action Type)"
description: "Runs a bi-entity action with the actor and target swapped."
navigation_title: "Invert"
---

Runs a bi-entity action with the actor and the target swapped.

Type ID: `apoli:invert`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _required_ | The bi-entity action to run with the actor and target swapped. |

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

This pulls the actor toward the target.
