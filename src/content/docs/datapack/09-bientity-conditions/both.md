---
title: "Both (Bi-Entity Condition Type)"
description: "Checks whether both the actor and the target pass an entity condition."
navigation_title: "Both"
---

Checks whether both the actor and the target pass an entity condition.

Type ID: `apoli:both`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _required_ | The entity condition to check on the actor and on the target. |

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

This checks whether the actor and the target are both players.
