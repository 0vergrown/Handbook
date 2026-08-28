---
title: "Mount (Command)"
description: "Inspect and clear the rider offsets that apoli:mount stores."
navigation_title: "Mount"
---

Shows what [`apoli:mount`](/docs/datapack/bientity-actions/mount) has recorded for a rider, and clears it. Offsets are runtime state, so this is the way to see whether a rider is actually carrying the offset you think it is.

## Sub-commands

| Sub-command | What it does |
|-------------|--------------|
| `get <targets>` | Prints each target's stored offset, or "no mount offset". |
| `clear <targets>` | Drops the stored offset, leaving the rider on the vehicle's plain seat. |

```mcfunction
apoli:mount get @e[type=minecraft:zombie,limit=1]
apoli:mount clear @e[type=minecraft:zombie]
```

`get` prints one line per target:

```
Zombie#412: x=0.00 y=0.60 z=-0.90 local_horizontal_normalized rotation=body | riding Dev#8 (yaw=137.4 body=95.2) -> 0.90/0.60/0.00
```

Reading it left to right: the raw `x`/`y`/`z` from the JSON, the [Space](/docs/datapack/data-types/space), the `rotation` mode (green for `body`, yellow for `head`), then — when the target is actually riding something — the vehicle, its head yaw, its body yaw, and the world-space vector the offset resolves to right now.

That last group is the useful part when `rotation` looks like it is being ignored. Stand still and turn the camera: under `rotation=body` the `yaw=` figure moves and the `body=` figure does not, and the resolved vector must not change. If `rotation=` reads `head` when your JSON says `"body"`, the offset that reached this side of the connection is stale — most often an older Apoli jar on one side.

> The command reads the offset table on the side it runs on, which on a dedicated server is the server's copy. In single-player one table is shared, so the stored `x`/`y`/`z`/`space`/`rotation` it prints are the ones the client has — but the resolved vector at the end of the line is computed from the server's copy of the vehicle, so a healthy readout is not by itself proof that the frame you are looking at was drawn the same way. That gap is exactly what hid the pre-1.45.3 `rotation: "body"` bug; if a readout looks right and the game still looks wrong, suspect the client, not the data.

## Permissions

Level 2, node `apoli.command.mount`.
