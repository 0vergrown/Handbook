---
title: "Spawn Entity (Entity Action Type)"
description: "Spawns an entity at the position of the target entity."
navigation_title: "Spawn Entity"
---

Spawns an entity at the position of the target entity, or at an offset from it.

Type ID: `apoli:spawn_entity`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the entity type to spawn. |
| `tag` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | NBT data applied to the spawned entity. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the spawned entity once it is spawned. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs with the entity that ran the action as the actor and the spawned entity as the target. |
| `offset` | [Vector](/docs/datapack/data-types/vector) | `{"x": 0, "y": 0, "z": 0}` | Moves the spawn point away from the entity by this much, in blocks. |
| `space` | [Space](/docs/datapack/data-types/space) | `"world"` | The frame `offset` is read in. `"local"` follows where the entity is looking, so `z` is forward and `x` is to its left. |

## Examples

```json
"entity_action": {
    "type": "apoli:spawn_entity",
    "entity_type": "minecraft:zombie",
    "tag": "{NoAI:1b,IsBaby:1,HandItems:[{id:\"minecraft:gold_block\",Count:1},{}]}"
}
```

This spawns a baby zombie with no AI, holding a gold block, at the entity's position.

```json
"entity_action": {
    "type": "apoli:spawn_entity",
    "entity_type": "minecraft:armor_stand",
    "offset": { "x": 0, "y": 0, "z": 2 },
    "space": "local"
}
```

This spawns an armor stand two blocks in front of wherever the entity is looking.
