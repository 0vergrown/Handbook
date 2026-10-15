---
title: "Exists (Entity Condition Type)"
description: "Checks if the entity is in the world. A player counts while they are online."
navigation_title: "Exists"
aliases: ["online"]
---

Checks if the entity is in the world: it hasn't died, despawned or been unloaded, and a player is online. The offline copy of a player that [apoli:action_on_entity_set](/docs/datapack/entity-actions/action_on_entity_set) hands out with `include_offline` does not exist.

Type ID: `apoli:exists` (also written `apoli:online`)

## Fields

_None._

## Examples

```json
"condition": {
    "type": "apoli:exists"
}
```

```json
"bientity_condition": {
    "type": "apoli:actor_condition",
    "condition": {
        "type": "apoli:online"
    }
}
```

This passes when the actor is a player who is online, rather than the offline copy of one.
