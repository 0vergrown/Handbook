---
title: "apoli:target_action"
description: "Executes an Entity Action Type on the target entity."
---

Executes an Entity Action Type on the target entity.

Type ID: `apoli:target_action`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`action` | Entity Action Type | | The entity action type to execute on the target entity.

## Examples

```json
"bientity_action": {
    "type": "apoli:target_action",
    "action": {
        "type": "apoli:set_on_fire",
        "duration": 5
    }
}
```

This example will set the target entity on fire for 5 seconds.

