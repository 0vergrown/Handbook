---
title: Networking & sync
description: How powers reach the client, and the rules for changing packets safely.
---

Powers live on the server, but the client needs to know about them — to draw HUD bars, render overlays, and respond to keybinds. Apoli keeps a synced copy of each entity's powers on the clients that can see it. Most addons never touch networking directly; this page is for when you add a power that needs its own client state.

## What syncs, and when

- An entity's power container is synced to the clients tracking it.
- When you mutate power state on the server, [mark it dirty](/docs/addon/systems/aux-and-persistence#mark-dirty-when-you-mutate) — the change is then written and sent.
- Client code reads powers through the `PowerContainer` **interface**, never the server `PowerContainerImpl`.

```java
// client-side: read, don't assume the impl type
PowerContainer powers = PowerContainer.get(clientPlayer);
boolean has = powers.hasPower(MyMod.id("gravity"));
```

## Chunked sync

A full power list can exceed a single packet's string limit. Apoli slices large syncs into gzipped chunks and reassembles them, keyed by a generation number so a client never mixes two versions. If you send your own bulk data, follow the same shape rather than one giant payload.

## Protocol versioning — the rules

Two builds with the *same* mod version can still disagree on the wire if a packet changed. Apoli handshakes a protocol version and uses tolerant readers. When you change a payload:

1. **Never reorder or repurpose existing fields** — append new ones.
2. Bump the protocol version when the wire format changes.
3. Write a **tolerant reader** that copes with a peer that hasn't sent the new field.
4. Test an old client against a new server *and* the reverse.

> A "same version, different jar" mismatch is the classic cause of join crashes. Rebuild and republish both sides together; don't ship a client and server built from different trees.

## Sending to a specific client

When a value only matters to one player (their own resource), sync it to that player's tracker, not to everyone — it's smaller and avoids leaking other players' state.
