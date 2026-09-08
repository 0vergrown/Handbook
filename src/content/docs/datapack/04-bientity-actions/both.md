---
title: "Both (Bi-Entity Action Type)"
description: "Executes an Entity Action Type on both the actor and the target entity."
navigation_title: "Both"
---

Executes an Entity Action Type on both the actor and the target entity — the action counterpart of [`apoli:both`](/docs/datapack/bientity-conditions/both), and a shorthand for pairing [`apoli:actor_action`](/docs/datapack/bientity-actions/actor_action) with [`apoli:target_action`](/docs/datapack/bientity-actions/target_action) inside an [`apoli:and`](/docs/datapack/meta-actions/and). The actor runs it first, then the target.

Type ID: `apoli:both`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`action` | Entity Action Type | | The entity action type to execute on the actor and on the target entity.

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

Sets both entities on fire for 5 seconds.

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

A collision that launches attacker and victim alike.
