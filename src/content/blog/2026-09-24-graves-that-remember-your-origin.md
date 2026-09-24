---
title: "Graves that remember your origin"
description: "Apoli 1.96.0 and Origins 1.44.0: You're in Grave Danger, Gravestones and the GraveStone Mod now keep power inventories and apoli:keep_inventory straight, and every grave shows the origin you died as."
date: 2026-09-24
author: Overgrown
---

Apoli **1.96.0** and Origins **1.44.0**. Earlier today 1.95.1 stopped You're in Grave Danger from crashing 1.20.1 servers by switching its Origins integration off. That only fixed the crash: graves still didn't know about Apoli's powers. This release adds the missing integration, and covers the other two popular grave mods too.

## Power inventories go in the grave

An [`apoli:inventory`](/docs/datapack/powers/inventory) with `drop_on_death` used to scatter its items on the ground next to the grave. Now the grave takes them:

- **You're in Grave Danger** (Fabric 1.20.1, Fabric 1.21.1, NeoForge 1.21.1) and **Gravestones** (Fabric 1.20.1 and 1.21.1, version 1.4 or newer) store them with the grave. Collecting the grave puts each item back in the power it came from, in the same slot.
- **GraveStone Mod** (NeoForge 1.21.1) builds its grave from the drop list. On NeoForge, Apoli now adds power-inventory items to that list instead of spawning them separately, so they land in the gravestone with everything else. Corpse mods that read the drop list pick them up the same way.

## `keep_inventory` keeps things again

With YIGD installed, [`apoli:keep_inventory`](/docs/datapack/powers/keep_inventory) kept nothing, because YIGD took the whole inventory before Apoli got a look at it. Kept items now stay with the player on all three grave mods.

While in there, `keep_inventory` got a fix of its own. With two powers covering the same slot, the first one decided alone, so an item the second power should have kept was dropped. Either power can keep it now.

## The origin on the stone

Every grave now shows the origin the player had when they died, under their name on YIGD and the GraveStone Mod, and on the second sign line on Gravestones. It is stored with the grave, so switching origins later doesn't rewrite old graves. Hidden layers stay off it.

The line comes from a new Apoli API, [`GraveInscriptions`](/docs/addon/api/grave-inscriptions), which Origins uses. Any addon can add a line to player graves the same way: a class, a rank, a kill count.

## Compatibility

Origins 1.44.0 needs Apoli 1.96.0 or newer. Graves made before the update have no inscription and keep working.
