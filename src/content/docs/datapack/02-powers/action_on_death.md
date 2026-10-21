---
title: "Action On Death (Power Type)"
description: "Runs an action when the entity that has the power dies."
navigation_title: "Action On Death"
---

Runs an action when the entity that has the power dies. The target is the entity that died, and the actor is the entity that killed it.

Type ID: `apoli:action_on_death`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | | The action to run on the actor, the target or both. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the action only runs when the actor and target pass this condition. |
| `damage_condition` | [Damage Condition Type](/docs/datapack/damage-conditions) | _optional_ | If set, the action only runs when the killing damage passes this condition. |

## Examples

```json
{
   "type":"apoli:action_on_death",
   "bientity_action":{
      "type":"apoli:target_action",
      "action":{
         "type":"apoli:explode",
         "power":5,
         "destruction_type":"none",
         "damage_self":false
      }
   }
}
```

This makes the entity explode when it dies.
