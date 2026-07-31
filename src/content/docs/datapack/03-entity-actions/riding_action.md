---
title: "Riding Action (Entity Action Type)"
description: "Executes an action on the entity/entities that's being ridden by the entity."
navigation_title: "Riding Action"
---

Executes an action on the entity/entities that's being ridden by the entity.

Type ID: `apoli:riding_action`

!!! note

    Not to be confused with [Passenger Action](/docs/datapack/entity-actions/passenger_action).

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`action` | Entity Action Type | _optional_ | If specified, this action will be executed on the entity being ridden.
`bientity_action` | Bi-entity Action Type | _optional_ | If specified, this action will be executed on either the 'actor' (the passenger entity) or the 'target' (the entity being ridden) or both.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, only execute the specified actions if this condition is fulfilled by either the 'actor' (the passenger entity) or the 'target' (entity being ridden) or both.
`recursive` | Boolean | `false` | If set to `true`, the specified action(s) will be executed on all entities that are being ridden.

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

This example will apply a Speed II status effect to the entity that is currently being ridden by the entity that executed the entity action type.
