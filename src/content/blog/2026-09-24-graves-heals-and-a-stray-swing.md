---
title: "Graves, heals and a stray swing"
description: "Apoli 1.95.1: You're in Grave Danger no longer crashes 1.20.1 servers on the first death, a lethal negative apoli:heal kills properly, and an off-hand swing stops replaying when you attack."
date: 2026-09-24
author: Overgrown
---

Apoli **1.95.1** fixes a server crash, two bugs and some duplicated code. It sits on top of 1.95.0 and adds no new types.

## A grave that crashed the server

On a 1.20.1 server with [You're in Grave Danger](https://modrinth.com/mod/yigd), the first player death took the whole server down:

```
java.lang.NoClassDefFoundError: io/github/apace100/apoli/power/InventoryPower
	at com.b1n_ry.yigd.compat.OriginsCompat$OriginsCompatComponent.getInventory(OriginsCompat.java:99)
```

YIGD ships its own Origins integration and switches it on whenever a mod with the id `apoli` is loaded. That integration is written against the original Apoli's classes, which this Apoli doesn't have, so the moment YIGD asked it for the dead player's power inventories, the class lookup failed.

Apoli now turns that integration off when YIGD is installed. It stops the integration from registering its death hook, and removes it from YIGD's list of inventory integrations through YIGD's own `LoadModCompatEvent`. Graves then work the same as they would without Apoli. YIGD for 1.21.1 has no Origins integration, so only 1.20.1 needed this.

One thing to know: YIGD takes the whole inventory before Apoli sees the death, so `apoli:keep_inventory` doesn't keep items while YIGD is installed. They go into the grave instead. The [compat page](/docs/compat/youre-in-grave-danger/overview) has the details.

## Negative heals that didn't kill

`apoli:heal` with a negative `amount` takes health away. When that took an entity to 0, it set its health to 0 and nothing else. The game never ran its death handling: no death message, no drops, no `apoli:action_on_death`, and a totem didn't trigger.

A negative heal that would be lethal now deals lethal `minecraft:generic` damage instead, so the entity dies the normal way. A Totem of Undying or `apoli:prevent_death` can still save it. Non-lethal negative heals still change health directly.

## The off-hand swing that came back

Apoli lets both arms swing at once when both hands swing in the same tick. It decided that by asking "was the other arm still swinging?", and that was true for longer than it should be. So if you swung your off hand and then attacked a few ticks later, your off hand swung again.

Only swings that start in the same tick pair up now. A later swing replaces the earlier one, the same as vanilla.

## Less duplicated code

A few parts of 1.95.0 had their own versions of things Apoli already had. They now use the existing ones:

- `apoli:sprinting` now runs in the same client mixin as `apoli:prevent_sprinting`, not in a separate tick listener. It behaves the same, and `prevent_sprinting` still wins.
- The custom status effect packets are registered with the rest of Apoli's packets. On NeoForge that means Apoli's network version is now 13, so NeoForge clients and servers both need 1.95.1.
- A custom effect's `type` now accepts lower case or all upper case (`harmful`, `HARMFUL`), like Apoli's other named values, and its colour uses the shared colour helper.
