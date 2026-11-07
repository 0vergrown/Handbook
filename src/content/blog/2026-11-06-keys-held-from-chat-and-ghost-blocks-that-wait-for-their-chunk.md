---
title: "Keys held from chat, and ghost blocks that wait for their chunk"
description: "Apoli 1.127.0: /apoli:key hold, forced keys that count as held on a player's client, and ghost blocks that never load a chunk to put themselves back."
date: 2026-11-06
author: Overgrown
---

This is Apoli 1.127.0, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. It works with Origins 1.51.0, and the network format is the same as 1.126.0. Both changes came up while I was building a pack that leans on ghost blocks and held keys harder than anything I'd made before.

## Holding a key from chat

[`/apoli:key`](/docs/datapack/commands/key) has a new sub-command, `hold`:

```mcfunction
apoli:key hold @s key.apoli.primary_active
apoli:key release @s key.apoli.primary_active
```

The first line holds the key down with no time limit, and the second lets go of it. Like `press`, it works on players and on any other entity.

I wanted it for a power you ride for as long as you hold a key, and testing that showed me forcing a key on a player never really held it. [`apoli:force_key_pressed`](/docs/datapack/entity-actions/force_key_pressed) and `/apoli:key press` with a duration both counted as a single tap for Apoli's own powers, so a `continuous` power fired once and anything waiting for the key to come up decided it already had. A forced key now counts as held for its whole duration, the same as the real button, and the ride lasts until the hold ends.

Forcing a key that's already forced keeps the longer of the two durations. The player's client always did that, but the server used whichever came last, so a short press in the middle of a long hold ended it early. Both sides agree now, which also means a `press` can't cut a `hold` short.

## Ghost blocks and unloaded chunks

[`apoli:ghost_block`](/docs/datapack/block-actions/ghost_block) places a temporary block and puts the original back when it runs out. If that happened in a chunk nobody was near anymore, Apoli loaded the chunk right then, on the server thread, to put one block back. A power that tears out and raises blocks all over the place leaves dozens of them behind, so walking away from a fight meant one chunk load per block as the timers ran out, which a busy server feels as a lag spike.

Ghost blocks don't load chunks while the server is running anymore. One that runs out in an unloaded chunk waits, and the original comes back within about a second of that chunk loading again. Chunks load at the edge of a player's view distance, so nobody is close enough to see the swap. The only time a chunk gets loaded for this is when the server stops, so a clean shutdown still leaves nothing behind. The action also refuses to place anything at a position whose chunk isn't loaded, where it used to load it.

Placing a ghost block where one already is keeps the original block, as before, and now restarts the timer from the new placement. The first timer used to go off anyway, so a block you kept refreshing vanished when the first placement ran out.

## Origins

Origins 1.51.0 works with this Apoli as it is, so there's no new Origins build this time.
