---
title: "Gamemode (Entity Condition Type)"
description: "Checks the gamemode of the entity."
navigation_title: "Gamemode"
---

Checks the gamemode of the entity.

Type ID: `apoli:gamemode`

> **This entity condition type will only work on players.**

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`gamemode` | String | | One of `survival`, `creative`, `adventure`, `spectator`. The gamemode the player must be in for this condition to evaluate to true.

> On the client — which is where powers that only draw something evaluate their `condition`, such as [apoli:overlay](/docs/datapack/powers/overlay) or [apoli:shaking](/docs/datapack/powers/shaking) — `spectator` and `creative` are exact for every player, but a *different* player in adventure mode reads as `survival` there, because another player's build permissions are not sent to your client. Your own gamemode is always exact.

## Examples

```json
"condition": {
  "type": "apoli:gamemode",
  "gamemode": "creative"
}
```

This example will check if the player is in Creative Mode.
