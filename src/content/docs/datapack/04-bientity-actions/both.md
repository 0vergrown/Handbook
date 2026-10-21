---
title: "Both (Bi-Entity Action Type)"
description: "Runs an entity action on both the actor and the target."
navigation_title: "Both"
---

Runs an entity action on both the actor and the target, first on the actor and then on the target. It is the action counterpart of the [`apoli:both`](/docs/datapack/bientity-conditions/both) condition, and a shorter way to write [`apoli:actor_action`](/docs/datapack/bientity-actions/actor_action) and [`apoli:target_action`](/docs/datapack/bientity-actions/target_action) inside an [`apoli:and`](/docs/datapack/meta-actions/and).

Type ID: `apoli:both`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | [Entity Action Type](/docs/datapack/entity-actions) | _required_ | The entity action to run on the actor and on the target. |

## Examples

```json
"bientity_action": {
    "type": "apoli:both",
    "action": {
        "type": "apoli:set_on_fire",
        "duration": 5
    }
}
```

This sets both entities on fire for 5 seconds.

```json
{
    "type": "apoli:action_on_hit",
    "bientity_action": {
        "type": "apoli:both",
        "action": {
            "type": "apoli:add_velocity",
            "y": 0.6,
            "space": "world"
        }
    }
}
```

A hit that launches the attacker and the victim alike.
