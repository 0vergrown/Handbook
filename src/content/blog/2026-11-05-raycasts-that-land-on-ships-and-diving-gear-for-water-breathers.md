---
title: "Raycasts that land on ships, and diving gear for water breathers"
description: "Apoli 1.125.0 and Origins 1.50.0: raycasts that work on Sable and Create Aeronautics ships, ropes that phasing can't slip through, and Create's diving gear and goggles in powers."
date: 2026-11-05
author: Overgrown
---

This is Apoli 1.125.0 and Origins 1.50.0, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Update the two together, because Origins 1.50.0 needs this Apoli.

## Raycasts on ships

0xalive reported a raycast power that launches the player toward whatever the ray hits. Aimed at a Create Aeronautics ship, it froze the game until they relogged. A later update fixed the launch, and then a second power, a raycast that teleports the player, froze it the same way.

Aeronautics ships are Sable sub-levels. Sable keeps a ship's blocks in a storage area about 20 million blocks out, and draws and collides them wherever the ship really is. When a ray hits a ship, Sable reports the hit inside that storage area, and [`apoli:raycast`](/docs/datapack/entity-actions/raycast) took it at face value. `hit_x` and the other hit values pointed 20 million blocks away, `command_at_hit` ran out there, and the particle trail and `command_along_ray` stepped along the whole distance. That is millions of steps in a single tick, and any one of them is enough to stall a server.

The raycast now turns a hit on a ship back into the spot on the hull the ray touched. Teleporting to the hit puts you on the deck, `command_hit_offset` backs away from the face as the ship is turned, and a `chain` reflects off it properly. Block actions still run on the ship's own block, so breaking or replacing it changes the ship. The [raycast condition](/docs/datapack/entity-conditions/raycast) got the same treatment, so a ship hides whatever is behind it. Ropes already worked this way, and now the rest of the raycasts match them. The [Sable page](/docs/compat/sable/overview) has the full list.

## Ropes and phasing

A player with a phasing power couldn't rope onto a ship. The rope's ray asked each block what it blocks for that player, phasing answered that the player walks through, and so the rope went through too. It happened with ordinary walls as well, which made a Phantom-style origin and a grappling hook a bad pair. The rope's ray now checks blocks the same way whoever casts it.

## Create

[Create](/docs/compat/create/overview) has its own compat page now. With Create installed:

- A diving helmet with a backtank that still holds air lets an entity with `suffocate_outside_water` breathe on land. It draws 1 unit of air a second from the backtank, the rate Create uses underwater, and Create's low-air warning still tells you when to refill.
- Diving boots switch off [`apoli:modify_swim_speed`](/docs/datapack/powers/modify_swim_speed), so a fast swimmer in heavy boots swims at the normal speed.
- [`apoli:create_goggles`](/docs/compat/create/create_goggles) shows Create's goggle overlay without the goggles.
- Three item tags say what counts as a diving helmet, a backtank and diving boots, so a pack can add another mod's gear.

In Origins, the Enderian and the Blazeborn take no water or rain damage while they wear the full diving set. It's all in their `water_vulnerability` power file, built from the same tags, so a pack can change which pieces count or take the set out again. The [Water Protection guide](/docs/datapack/origins/water-protection#diving-gear) shows the file.

Create has no Fabric build for 1.21.1, so on that version none of this turns on, and `apoli:create_goggles` loads and does nothing.

## Smaller fixes

- With `collision` on, an [`apoli:modify_camera`](/docs/datapack/powers/modify_camera) offset stops at a ship's hull instead of passing into it.
- Dev mode's ray outlines end where a ray hit a ship. They used to try to draw a line 20 million blocks long.
