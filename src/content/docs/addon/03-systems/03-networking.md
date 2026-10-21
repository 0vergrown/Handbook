---
title: Networking & sync
description: "How powers reach the client, and the rules for changing packets safely."
---

Powers live on the server, but the client needs to know about them to draw HUD bars, render overlays and respond to keybinds. Apoli keeps a synced copy of each entity's powers on the clients that can see it. Most addons never touch networking directly, and this page is for when you add a power that needs client state of its own.

## What syncs, and when

- An entity's power container is synced to the clients tracking it.
- When you change power state on the server, [mark it dirty](/docs/addon/systems/aux-and-persistence#mark-dirty-when-you-mutate), and the change is then written and sent.
- Client code reads powers through the `PowerContainer` interface, never the server's `PowerContainerImpl`.

On the client, read through the interface and don't assume the implementation type:

```java
PowerContainer powers = PowerContainer.of(clientPlayer);
boolean has = powers != null && powers.hasPower(GRAVITY);
```

## Chunked sync

A full power list can be larger than one packet's string limit. Apoli slices large syncs into gzipped chunks and reassembles them, keyed by a generation number so a client never mixes two versions. If you send bulk data of your own, follow the same shape instead of sending one huge payload.

## Protocol versioning rules

Two builds with the same mod version can still disagree on the network if a packet changed. Apoli checks a protocol version during the handshake and uses tolerant readers. When you change a payload:

1. Never reorder or reuse existing fields, and add new ones at the end.
2. Raise the protocol version when the network format changes.
3. Write a tolerant reader that copes with a peer that hasn't sent the new field.
4. Test an old client against a new server, and the other way round.

> [!WARNING]
> A mismatch between two jars with the same version is the classic cause of crashes on join. Rebuild and publish both sides together, and don't ship a client and server built from different trees.

## Sending to a specific client

When a value only matters to one player, such as their own resource, sync it to that player instead of to everyone. It is smaller and doesn't leak other players' state.
