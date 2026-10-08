---
title: "Close menus with their own key, and damage in dev mode"
description: "Apoli 1.112.0: a radial menu or power inventory closes on the key that opened it, dev mode shows what modify_damage did to each hit, and a missing shader file is reported at its real path."
date: 2026-10-08
author: Overgrown
---

Apoli **1.112.0**, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. The closing keys and the shader warning are client changes; the damage lines come from the server.

## The key that opens a menu now closes it

A [radial menu](/docs/datapack/entity-actions/radial_menu) or a [power inventory](/docs/datapack/powers/inventory) opened with a key used to need Esc to close. Now the same key closes it, the way the inventory key opens and closes the inventory: press G to open, press G to close. The radial menu also closes on the inventory key now, like every other inventory screen.

- The key has to be let go before it can close anything, so holding it down after opening never closes the menu by accident.
- A menu opened by picking a slice of another radial menu closes on the same key as the first one.
- If a power inventory's key is a hotbar number (or swap offhand, drop or pick block), pressing it over a slot still moves the item, as it always did. Pressing it anywhere else closes the inventory.

## Damage in dev mode

With [dev mode](/docs/datapack/commands/dev-mode) on, every hit an [`apoli:modify_damage`](/docs/datapack/powers/modify_damage) power changes now gets a line in chat, on the victim, with the damage before and after and the powers that did it:

```
[apoli] Pig: damage 6 → 4 (minecraft:mob_attack) · dealt: example:strong (Steve) · taken: example:tough
```

That covers `modify_damage_dealt` and `modify_damage_taken` too, both sides at once, so when an attacker's bonus and a victim's resistance stack you can see the result of both. Damage over time is limited to one line every half second per victim and attacker.

## Shader warnings point at the right file

When the file behind an [`apoli:shader`](/docs/datapack/powers/shader) power was missing, the warning in the log printed its path wrong (`assets/example/shaders/post/shaders/post/sketch.json.json` for `example:shaders/post/sketch.json`). It now names the file the game actually looked for, and when the `shader` field isn't a full `shaders/post/….json` path it says so, with an example of the form it expects.
