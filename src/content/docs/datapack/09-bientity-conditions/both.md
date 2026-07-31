---
title: "Both (Bi-Entity Condition Type)"
description: "Checks for an entity condition on both the actor and target entities."
navigation_title: "Both"
---

Checks for an entity condition on both the actor and target entities.

Type ID: `apoli:both`
## Fields

Field | Type | Default | Description
------|------|---------|-------------
`condition` | Entity Condition Type | | The entity condition type to check on both the actor and target entity.

## Examples

```json
"bientity_condition": {
    "type": "apoli:both",
    "condition": {
        "type": "apoli:entity_type",
        "entity_type": "minecraft:player"
    }
}
```

This example will check if both the actor entity and the target entity is a player.
