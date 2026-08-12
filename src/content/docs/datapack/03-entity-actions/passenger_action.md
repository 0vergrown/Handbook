---
title: "Passenger Action (Entity Action Type)"
description: "Executes an action on the passengers of the entity."
navigation_title: "Passenger Action"
---

Executes an action on the passengers of the entity.

Type ID: `apoli:passenger_action`

> Not to be confused with [Riding Action](/docs/datapack/entity-actions/riding_action)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`action` | Entity Action Type | _optional_ | If specified, this action will be executed on the passenger entity.
`bientity_action` | Bi-entity Action Type | _optional_ | If specified, this action will be executed on either the 'actor' (the entity being ridden) or the 'target' (the passenger entity) or both.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the specified actions will only be executed if this condition is fulfilled by either the 'actor' (the entity being ridden) or the 'target' (the passenger entity) or both.
`recursive` | Boolean | `false` | If set to `true`, the specified action(s) will be executed on all the passenger entities.

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

This example will heal all entities that are currently riding the entity that executed this entity action type.
