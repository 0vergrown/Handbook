---
title: "Gamemode (Entity Condition Type)"
description: "Checks which game mode the player is in."
navigation_title: "Gamemode"
---

Checks which game mode the entity is in.

Type ID: `apoli:gamemode`

> [!NOTE]
> This condition only works on players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `gamemode` | [String](/docs/datapack/data-types/string) | _required_ | The game mode the player must be in: `survival`, `creative`, `adventure` or `spectator`. |

> [!WARNING]
> Powers that only draw something, such as [apoli:overlay](/docs/datapack/powers/overlay) or [apoli:shaking](/docs/datapack/powers/shaking), evaluate their `condition` on the client. There, `spectator` and `creative` are exact for every player, but another player in adventure mode reads as `survival`, because other players' build permissions aren't sent to your client. Your own game mode is always exact.

## Examples

```json
"condition": {
  "type": "apoli:gamemode",
  "gamemode": "creative"
}
```

This checks whether the player is in Creative mode.
