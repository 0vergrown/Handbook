---
title: "Teleport To Spawn (Entity Action Type)"
description: "Teleports the entity to its respawn point, or to the world spawn."
navigation_title: "Teleport To Spawn"
---

Teleports the entity to its respawn point — the bed or respawn anchor it last used — or to the world spawn.

Type ID: `apoli:teleport_to_spawn`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`player_spawn` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to use the player's own respawn point. Falls back to the world spawn when the entity is not a player, has no respawn point set, its respawn dimension is not loaded, or the respawn point no longer works. `false` always uses the world spawn.
`success_action` | Entity Action Type | _optional_ | Runs on the entity once it has arrived.
`fail_action` | Entity Action Type | _optional_ | Runs on the entity when the teleport is refused, which for this action means [apoli:prevent_teleport](/docs/datapack/powers/prevent_teleport).

## Examples

```json
"entity_action": {
    "type": "apoli:teleport_to_spawn"
}
```

Sends the player home the way a bed would.

```json
{
    "type": "apoli:action_over_time",
    "interval": 20,
    "condition": {
        "type": "apoli:in_block",
        "block_condition": { "type": "apoli:in_tag", "tag": "minecraft:portals" }
    },
    "entity_action": {
        "type": "apoli:teleport_to_spawn",
        "player_spawn": false
    }
}
```

An origin that cannot use portals: standing in one throws them back to the world spawn.

> The respawn point is checked the same way dying checks it: the bed or respawn anchor has to still be there, be usable in that dimension, and have room to stand. If it was broken, buried or blocked, the action goes to the world spawn instead of dropping the player into the obstruction. A respawn anchor is **not** drained — this is a move, not a respawn.
