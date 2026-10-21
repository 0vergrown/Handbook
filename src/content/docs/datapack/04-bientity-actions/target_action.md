---
title: "Target Action (Bi-Entity Action Type)"
description: "Runs an entity action on the target."
navigation_title: "Target Action"
---

Runs an entity action on the target.

Type ID: `apoli:target_action`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | [Entity Action Type](/docs/datapack/entity-actions) | _required_ | The entity action to run on the target. |

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

This sets the target on fire for 5 seconds.
