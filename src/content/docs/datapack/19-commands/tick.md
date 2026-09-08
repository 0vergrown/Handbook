---
title: "Tick (Command)"
description: "Minecraft's own /tick command, extended with per-entity and per-chunk targets."
navigation_title: "Tick"
---

Minecraft's `/tick` command controls how fast the world runs. Apoli adds two branches to it — `entity` and `chunk` — so the same six operations can be pointed at a handful of mobs or a patch of ground instead of the whole server.

The vanilla branches are untouched: `/tick query`, `/tick rate`, `/tick freeze`, `/tick unfreeze`, `/tick step` and `/tick sprint` still mean the whole server.

## Targets

```mcfunction
tick entity <targets> <operation>
tick chunk <from> <operation>
tick chunk <from> <to> <operation>
tick chunk <from> radius <blocks> <operation>
```

`<targets>` is any entity selector. `<from>` and `<to>` are block **columns** (`x z`, so `~ ~` is where you are standing) — the chunks containing them are used, and `from`/`to` covers the whole rectangle between the two. `radius` covers every chunk within that many blocks of `<from>`.

An area larger than 4096 chunks is refused; narrow it down.

## Operations

| Operation | What it does |
|-----------|--------------|
| `query` | Prints the tick rate each target is actually running at. |
| `rate <1–10000>` | Ticks the target that many times per second. |
| `rate reset` | Clears everything Apoli set on the target. |
| `freeze` | Stops the target ticking. |
| `unfreeze` | Starts it again. |
| `step`, `step <time>`, `step stop` | Runs a frozen target for that many ticks and freezes it again. Every target must already be frozen and not sprinting. |
| `sprint <time>`, `sprint stop` | Ignores the target's rate and freeze for that many ticks, so it runs at the server's speed. |

```mcfunction
tick entity @e[type=creeper] freeze
tick entity @e[type=arrow] rate 4
tick entity @s rate reset
tick chunk ~ ~ radius 64 rate 5
tick chunk 0 0 512 512 query
```

## What a rate does

A rate below the server's own means the target is skipped on some server ticks, spread as evenly as possible. At `rate 5` an entity gets one tick in four: it falls, walks, burns, attacks and ages at a quarter speed, and its status effects and cooldowns count down four times slower. On a chunk the same gate covers block entities, scheduled block and fluid ticks, and random ticks.

A rate **above** the server's own does nothing on its own — the server cannot tick a single entity more often than it ticks at all. To run something faster, raise the whole server with `/tick rate 40` and hold everything else down, either with `tick chunk`/`tick entity` or with [apoli:modify_tick_rate](/docs/datapack/powers/modify_tick_rate) on a `dimension` target.

Every entity running slower than the server is told so, and its client slows it the same way, so the two never disagree about where it is. Mobs are driven by the server's position updates and the client stretches that interpolation. Projectiles, items and other non-living entities would normally run their own physics on the client, so while they are slowed the client stops simulating them and glides them toward each position the server sends instead. Either way the entity glides at its new speed instead of running ahead and getting snapped back. Anything the local player is riding keeps ticking normally on their own client, because skipping it would stutter their camera.

Scopes fall back to each other: an entity with no rate of its own uses its chunk's, and a chunk with no rate of its own uses its dimension's — which only [apoli:tick_rate](/docs/datapack/entity-actions/tick_rate) and [apoli:modify_tick_rate](/docs/datapack/powers/modify_tick_rate) can set. A passenger always follows its root vehicle.

> Freezing a **player** stops their server-side tick — hunger, regeneration, status effects, item cooldowns, block breaking — but not their client's movement, which is client-authoritative.

## Lifetime

What this command sets is held in memory for as long as the server runs. It survives `/reload`, is not written to the world save, and is dropped when the server stops or the entity leaves the dimension. Anything that has to survive a restart belongs in a power: [apoli:modify_tick_rate](/docs/datapack/powers/modify_tick_rate) re-applies itself every tick and lapses on its own when the power goes away.

## Permissions

On Minecraft 1.21 and later these branches live under vanilla's `/tick`, so they need the same permission level it does — level 3, not the level 2 the rest of Apoli's commands use.

Minecraft 1.20.1 has no `/tick` command. There, Apoli registers `/tick` itself with only the `entity` and `chunk` branches, at permission level 2 (or the `apoli.command.tick` node), and the server-wide operations are unavailable — use `apoli:tick_rate` with `scope: dimension` instead.
