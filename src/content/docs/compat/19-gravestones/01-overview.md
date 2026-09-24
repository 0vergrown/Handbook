---
title: Gravestones
description: How Apoli's power inventories, apoli:keep_inventory and the grave inscription work with Pneumono's Gravestones.
---

[Gravestones](https://modrinth.com/mod/pneumono_gravestones) by Pneumono places a gravestone with the player's items when they die. Apoli registers **no types** for it. It uses Gravestones' own API instead: two gravestone data types and a skip-item listener. This needs Gravestones **1.4** or newer on Fabric 1.20.1 or 1.21.1. Older versions don't have that API, and Apoli leaves them alone.

| What | With Gravestones installed |
|------|----------------------------|
| [`apoli:inventory`](/docs/datapack/powers/inventory) with `drop_on_death` | The items that would drop are stored in the gravestone. Collecting it puts each one back in the same power and slot. If that slot is taken, or the player no longer has the power, it goes to the player instead. Breaking the gravestone drops them. |
| [`apoli:keep_inventory`](/docs/datapack/powers/keep_inventory) | The items it keeps are skipped by the gravestone, so they stay with the player. |
| Grave inscription | The gravestone's sign reads: name, inscription, date, time. See [Grave inscriptions](/docs/addon/api/grave-inscriptions). |

> With **Show Heads** on (Gravestones' default), the owner's head covers the fourth line, so the time is hidden behind it once an inscription moves it down. Turn Show Heads off to see all four lines.
