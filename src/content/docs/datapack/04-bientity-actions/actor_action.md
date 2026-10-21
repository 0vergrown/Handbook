---
title: "Actor Action (Bi-Entity Action Type)"
description: "Runs an entity action on the actor."
navigation_title: "Actor Action"
---

Runs an entity action on the actor.

Type ID: `apoli:actor_action`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | [Entity Action Type](/docs/datapack/entity-actions) | _required_ | The entity action to run on the actor. |

## Examples

```json
"bientity_action": {
    "type": "apoli:actor_action",
    "action": {
        "type": "apoli:set_on_fire",
        "duration": 5
    }
}
```

This sets the actor on fire for 5 seconds.
