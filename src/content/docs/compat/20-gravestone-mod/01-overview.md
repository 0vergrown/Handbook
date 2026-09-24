---
title: GraveStone Mod
description: How Apoli's power inventories, apoli:keep_inventory and the grave inscription work with the GraveStone Mod on NeoForge.
---

The [GraveStone Mod](https://modrinth.com/mod/gravestone-mod) by henkelmax builds its gravestone from the items a player drops when they die. Apoli registers **no types** for it, and supports it on NeoForge 1.21.1. Its 1.20.1 version is Forge-only, which Apoli does not run on.

| What | With the GraveStone Mod installed |
|------|-----------------------------------|
| [`apoli:inventory`](/docs/datapack/powers/inventory) with `drop_on_death` | The items that would drop go into the gravestone with the rest of the player's drops. Collecting it gives them back to the player's inventory, not the power. |
| [`apoli:keep_inventory`](/docs/datapack/powers/keep_inventory) | The items it keeps never drop, so they stay with the player and are not copied into the gravestone. |
| Grave inscription | The gravestone shows an extra line under the owner's name, such as the player's origin with Origins installed. See [Grave inscriptions](/docs/addon/api/grave-inscriptions). |

On NeoForge, `drop_on_death` items are added to the death's drop list rather than spawned separately. That is how the GraveStone Mod, YIGD, corpse mods and anything else that reads the drop list picks them up. Without such a mod they drop on the ground as before.
