---
title: "Explosions you can hear, and one packet per beam"
description: "Apoli 1.130.0: apoli:explode now plays its sound and particles for players, and raycast particle lines go out as a single packet."
date: 2026-11-10
author: Overgrown
---

This is Apoli 1.130.0, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Origins 1.52.0 works with it as it is. On NeoForge the network version changed, so update the client and the server together there.

## Explosions you can hear

I ran into this one while building combustionbending for Elemental Bendings. The beams blew up exactly where they should and hurt what they hit, and they made no sound at all. [`apoli:explode`](/docs/datapack/entity-actions/explode) ran the whole explosion on the server and never told anyone's client that it happened. Damage and broken blocks were fine, because the server handles those anyway. The sound, the explosion particle and the push a player feels all happen on the client, and vanilla sends a packet for them that Apoli never sent.

It sends that packet now, to every player within 64 blocks, the same way a vanilla explosion does. That goes for the entity, bi-entity and block versions of the action.

If your pack played `entity.generic.explode` or spawned `minecraft:explosion` particles next to its explode actions to fake it, take those out, or players will get two bangs.

## One packet per beam

The `particle` field on [`apoli:raycast`](/docs/datapack/entity-actions/raycast) draws a line of particles from the eye to whatever the ray hit. Under the hood that was one particle packet per point, per player. A lightning bolt in Elemental Bendings is 40 blocks long with a particle every 0.16 blocks, which comes to about 250 packets for each player watching, and the combustion barrage fires four beams at once.

Now the server sends one packet per line: where it starts, which way it points, how long it is and how far apart the particles are. Each client spawns the particles itself. The line looks the same and reaches the same players, anyone within 32 blocks of some point on it. A Fabric client on an older Apoli doesn't have the new channel, so the server sends it the old packets instead.
