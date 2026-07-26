---
title: "apoli:mount"
description: "Mounts the actor entity onto the target entity."
---

Mounts the actor entity onto the target entity.

Type ID: `apoli:mount`

> Since July 2026 the mount is properly synced to the clients involved: when the target (or actor) is a player, that player's client is sent the updated passenger list directly — previously the ridden player never saw the rider (the entity appeared frozen in place and "teleported" on dismount). apoli:dismount got the matching fix.

## Fields

_None._

## Examples

```json
"bientity_action": {
    "type": "apoli:mount"
}
```
