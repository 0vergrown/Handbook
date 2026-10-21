---
title: "Passenger Action (Entity Action Type)"
description: "Runs an action on the entities riding this entity."
navigation_title: "Passenger Action"
---

Runs an action on the entities riding this entity.

Type ID: `apoli:passenger_action`

> [!NOTE]
> For the opposite direction, the entity this one is riding, see [Riding Action](/docs/datapack/entity-actions/riding_action).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on each passenger. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs with the entity being ridden as the actor and the passenger as the target. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | The actions only run on a passenger when this passes, with the entity being ridden as the actor and the passenger as the target. |
| `recursive` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, the actions also run on indirect passengers, such as the passengers of a passenger. |

## Examples

```json
"entity_action": {
    "type": "apoli:passenger_action",
    "action": {
        "type": "apoli:heal",
        "amount": 2
    },
    "recursive": true
}
```

This heals every entity riding the entity that ran the action, including anything riding on top of them.
