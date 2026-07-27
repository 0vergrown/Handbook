---
title: Hardcore Revival
description: Knockout and revive triggers, actions and a condition.
---

With [Hardcore Revival](https://modrinth.com/mod/hardcore-revival) installed, players who would die are knocked out instead and can be picked back up by a teammate. Apoli registers types to react to and drive that state.

These types are **registration-gated**: they only exist when Hardcore Revival is loaded. A data pack that uses them without it will fail to load that power.

## Types

| Type | Kind | What it does |
| --- | --- | --- |
| [`apoli:action_on_knockout`](/docs/compat/hardcore-revival/action_on_knockout) | Power | Fires when the holder goes down. |
| [`apoli:action_on_revive`](/docs/compat/hardcore-revival/action_on_revive) | Power | Fires when the holder is picked back up. |
| [`apoli:knock_out`](/docs/compat/hardcore-revival/knock_out) | Entity action | Put the entity into the downed state. |
| [`apoli:revive`](/docs/compat/hardcore-revival/revive) | Entity action | Bring the entity back up. |
| [`apoli:knocked_out`](/docs/compat/hardcore-revival/knocked_out) | Entity condition | Is the entity currently down? |

## Notes

Hardcore Revival is a [Balm](https://modrinth.com/mod/balm) mod, so Balm must be present too — it ships as a dependency of Hardcore Revival, so this is usually automatic.
