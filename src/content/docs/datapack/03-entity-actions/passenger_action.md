---
title: "origins:passenger_action"
description: "[Entity Action Type](../entityactiontypes.md)"
---

Entity Action Type

Executes an action on the passengers of the entity.

Type ID: `origins:passenger_action`

!!! note

    Not to be confused with [Riding Action](/docs/datapack/entity-actions/riding_action)


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
    "type": "origins:passenger_action",
    "action": {
        "type": "origins:heal",
        "amount": 2
    },
    "recursive": true
}
```

This example will heal all entities that are currently riding the entity that executed this entity action type.

