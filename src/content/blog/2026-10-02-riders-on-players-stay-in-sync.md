---
title: "Riders on players stay in sync"
description: "Apoli 1.107.1 and Origins 1.46.13: sneaking off a player updates the carried player's screen, mount offsets show for everyone, and /apoli:mount clear reaches clients."
date: 2026-10-02
author: Overgrown
---

Apoli **1.107.1** and Origins **1.46.13**. Origins has no changes of its own this time; it is built against the new Apoli.

## Sneaking off a player

A rider placed on a player with [`apoli:mount`](/docs/datapack/bientity-actions/mount) could get off with the sneak key, but the player being ridden never found out. Their screen kept drawing the rider on top of them after it had left. [`apoli:dismount`](/docs/datapack/entity-actions/dismount) did not have the problem, which is why it looked like a sneak bug.

The cause is in vanilla. When a vehicle's passengers change, the server tells every player *watching* the vehicle, and a player never watches themselves. Vanilla never needed to, because nothing in vanilla rides a player. Apoli now tells the carried player as well, whatever ended the ride.

## Mount offsets show for everyone

An offset such as `"y": -0.3` was only drawn on the carried player's screen. The rider's own camera and everyone else saw the rider on the plain seat, because a second, redundant passenger update arrived after the offset and wiped it. Each passenger update is now followed by the offsets it belongs to, so the rider, the carried player and anyone watching agree.

## /apoli:mount clear

[`/apoli:mount clear`](/docs/datapack/commands/mount) dropped the server's copy of an offset but left clients drawing it. It now clears it everywhere.
