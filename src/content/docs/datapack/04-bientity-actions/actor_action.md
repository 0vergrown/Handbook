---
title: "apoli:actor_action"
description: "Executes an Entity Action Type on the actor entity."
---

Executes an Entity Action Type on the actor entity.

Type ID: `apoli:actor_action`

## Fields
Field  | Type | Default | Description
-------|------|---------|-------------
`action` | Entity Action Type | | The entity action type to execute on the actor entity.


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
This example will set the actor entity on fire for 5 seconds.
