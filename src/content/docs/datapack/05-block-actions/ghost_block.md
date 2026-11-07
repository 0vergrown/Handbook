---
title: "Ghost Block (Block Action Type)"
description: "Places a temporary block that restores itself, and that nobody can break, use or move."
navigation_title: "Ghost Block"
---

Places a temporary block that restores itself after a set number of ticks, and that nobody can break, use or move while it is there.

Type ID: `apoli:ghost_block`

The original block, and its block entity data if it had any, is remembered when the ghost is placed and put back when it expires. Placing a second ghost block on top of a live one keeps the first original and restarts the timer, so the block lasts `duration` ticks from the latest placement. A platform that keeps being refreshed stays up for as long as it is refreshed, and still restores the world correctly when it stops. Nothing is placed at a position whose chunk isn't loaded.

> [!NOTE]
> Ghost blocks are solid and have collision, so they work as temporary bridges, walls and platforms. They can't be used as a resource: they can't be mined, right-clicked, blown up or pushed by a piston, and they never drop anything. Without those rules, a ghost block that names a valuable block would be free ore on a multiplayer server.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The block to place, in its default state. |
| `nbt` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Block entity data applied to the placed block. |
| `duration` | [Integer](/docs/datapack/data-types/integer) | `20` | How many ticks the ghost block lasts, counted from the latest placement at that position. `tick` is accepted as an alias. |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | Runs at the ghost block's position right after it is placed. |
| `end_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | Runs at the position right after the original block is put back. |

## What "can't be interacted with" covers

| Interaction | What happens |
| --- | --- |
| Mining (survival or creative) | The break is refused and the block is sent to the client again. |
| Right-clicking the block | The interaction is refused, so a ghost chest or furnace can never be opened. |
| Explosions | The position is taken out of the blast, so the ghost survives and drops nothing. |
| Pistons | The block can't be moved, so it can never be pushed off its registered position. |

Ghost blocks are also placed and removed without neighbour updates and with drops turned off, so they don't trigger redstone, observers or gravity, and replacing a block never drops it.

## Examples

```json
{
	"type": "apoli:ghost_block",
	"block": "minecraft:ice",
	"duration": 60
}
```

A patch of ice that lasts three seconds and then gives the original block back.

```json
{
	"type": "apoli:block_action_at",
	"block_action": {
		"type": "apoli:offset",
		"y": -1,
		"action": {
			"type": "apoli:ghost_block",
			"block": "minecraft:obsidian",
			"duration": 40,
			"end_action": {
				"type": "apoli:execute_command",
				"command": "particle minecraft:cloud ~ ~ ~ 0.3 0.3 0.3 0 10"
			}
		}
	}
}
```

This conjures a two-second obsidian tile under the holder's feet and puffs a cloud when it fades. Use [apoli:offset](/docs/datapack/block-actions/offset) to move the placement off the block the action ran at, since this action has no offset field of its own.

When a ghost block runs out while its chunk is unloaded, the original comes back the next time the chunk loads, within a second of it loading. Ghost blocks never load a chunk to restore themselves while the server is running, so players leaving an area full of them causes no lag.

> [!WARNING]
> The live ghost blocks are kept in memory and aren't saved to the world. When the server stops normally, every ghost block is restored, including the ones waiting in unloaded chunks, which are loaded for that. A hard crash while a ghost block is placed leaves it behind, so keep durations short, which is what they are for.
