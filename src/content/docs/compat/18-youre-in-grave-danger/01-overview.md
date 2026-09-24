---
title: You're in Grave Danger
description: How Apoli's power inventories, apoli:keep_inventory and the grave inscription work with You're in Grave Danger.
---

[You're in Grave Danger](https://modrinth.com/mod/yigd) (YIGD) puts a player's items in a grave when they die. Apoli registers **no types** for it. Instead it plugs into YIGD's own inventory-integration API on every version Apoli supports: Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1.

| What | With YIGD installed |
|------|---------------------|
| [`apoli:inventory`](/docs/datapack/powers/inventory) with `drop_on_death` | The items that would drop go into the grave instead. Collecting the grave puts each one back in the same power and slot. If that slot is taken, or the player no longer has the power, it goes to the player's inventory instead. |
| [`apoli:keep_inventory`](/docs/datapack/powers/keep_inventory) | The items it keeps are marked as kept in YIGD, so they stay with the player and are back in the same slot after respawn. |
| Grave inscription | The grave shows an extra line under the owner's name, such as the player's origin with Origins installed. See [Grave inscriptions](/docs/addon/api/grave-inscriptions). |

Power items go through YIGD's normal drop rules, so Curse of Vanishing still destroys them and a soulbound enchantment still keeps them.

## YIGD's own Origins integration (1.20.1)

YIGD 2.0 for 1.20.1 ships its own Origins integration, which turns on whenever a mod with the id `apoli` is installed. It is written against the original Apoli's classes (`io.github.apace100.apoli`), which this Apoli does not have, so on its own the first player death crashes the server:

```
java.lang.NoClassDefFoundError: io/github/apace100/apoli/power/InventoryPower
	at com.b1n_ry.yigd.compat.OriginsCompat$OriginsCompatComponent.getInventory(OriginsCompat.java:99)
```

Apoli switches that integration off and registers its own in its place. YIGD for 1.21.1 has no Origins integration, so nothing needs switching off there.
