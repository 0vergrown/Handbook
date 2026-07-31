---
title: "Spawn Entity (Entity Action Type)"
description: "Spawns another entity at the position of the target entity."
navigation_title: "Spawn Entity"
---

Spawns another entity at the position of the target entity.

Type ID: `apoli:spawn_entity`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_type` | Identifier |  | The namespace and ID of the entity type that will be spawned.
`tag` | NBT | _optional_ | If specified, this NBT data will be applied to the entity that will be spawned.
`entity_action` | Entity Action Type | _optional_ | If specified, the specified entity action type will be executed on the entity that will be spawned when it is spawned.
`bientity_action` | Bi-Entity Action Type | _optional_ | If specified, this bi-entity action will be executed on either or both the actor (the entity that invoked the entity action) and the target (the spawned entity).

## Examples

```json
"entity_action": {
    "type": "apoli:spawn_entity",
    "entity_type": "minecraft:zombie",
    "tag": "{NoAI:1b,IsBaby:1,HandItems:[{id:\"minecraft:gold_block\",Count:1},{}]}"
}
```

This example will spawn a baby Zombie holding a Gold Block that has no AI at the position of the entity.
