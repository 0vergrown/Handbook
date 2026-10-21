---
title: "Mount (Command)"
description: "Inspects and clears the rider offsets that apoli:mount stores."
navigation_title: "Mount"
---

Shows what [`apoli:mount`](/docs/datapack/bientity-actions/mount) has recorded for a rider, and clears it. Offsets are runtime state, so this is how you see whether a rider is carrying the offset you think it is.

## Sub-commands

| Sub-command | What it does |
| --- | --- |
| `get <targets>` | Prints each target's stored offset, or "no mount offset". |
| `clear <targets>` | Drops the stored offset and tells every client that can see the rider, leaving it on the vehicle's plain seat. |

```mcfunction
apoli:mount get @e[type=minecraft:zombie,limit=1]
apoli:mount clear @e[type=minecraft:zombie]
```

`get` prints one line per target:

```
Zombie#412: x=0.00 y=0.60 z=-0.90 local_horizontal_normalized rotation=body | riding Dev#8 (yaw=137.4 body=95.2) -> 0.90/0.60/0.00
```

From left to right, the line has the raw `x`, `y` and `z` from the JSON, the [Space](/docs/datapack/data-types/space), and the `rotation` mode (green for `body`, yellow for `head`). When the target is riding something, it then has the vehicle, its head yaw, its body yaw, and the world space vector the offset resolves to at that moment.

That last group is the useful part when `rotation` seems to be ignored. Stand still and turn the camera: under `rotation=body` the `yaw=` figure moves and the `body=` figure doesn't, and the resolved vector must not change. If `rotation=` reads `head` when your JSON says `"body"`, the offset that reached this side of the connection is stale, most often because one side has an older Apoli jar.

> [!NOTE]
> The command reads the server's offset table. Every client keeps its own copy, filled in by the server, and that is true in single player as well. The resolved vector at the end of the line is also computed from the server's copy of the vehicle, so a healthy readout doesn't prove that the frame you are looking at was drawn the same way. If a readout looks right and the game still looks wrong, suspect the client before the data.

## Permissions

Level 2, or the `apoli.command.mount` node.
