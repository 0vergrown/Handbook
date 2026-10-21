---
title: "Riding Action (Entity Action Type)"
description: "Runs an action on the entity this entity is riding."
navigation_title: "Riding Action"
---

Runs an action on the entity this entity is riding.

Type ID: `apoli:riding_action`

> [!NOTE]
> For the opposite direction, the entities riding this one, see [Passenger Action](/docs/datapack/entity-actions/passenger_action).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity being ridden. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs with the passenger as the actor and the entity being ridden as the target. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | The actions only run when this passes, with the passenger as the actor and the entity being ridden as the target. |
| `recursive` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, the actions run on every entity further down the stack as well, not only the one the entity rides directly. |

## Examples

```json
"entity_action": {
    "type": "apoli:riding_action",
    "action": {
        "type": "apoli:apply_effect",
        "effect": {
            "effect": "minecraft:speed",
            "duration": 100,
            "amplifier": 1
        }
    }
}
```

This gives Speed II for 5 seconds to the entity that the entity running the action is riding.
