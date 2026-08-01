---
title: "Player Model Type (Entity Condition Type)"
description: "Checks which skin model the player is using — the wide (Steve) arms or the slim (Alex) arms."
navigation_title: "Player Model Type"
---

Checks which skin model the player is using — the wide (Steve) arms or the slim (Alex) arms.

Type ID: `apoli:player_model_type`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`model_type` | [Player Model Type](/docs/datapack/data-types/player-model-type) | **required** | `wide` or `slim`.

## Examples

```json
{
	"type": "apoli:player_model_type",
	"model_type": "slim"
}
```

Passes for players whose skin uses the three-pixel (Alex) arms.

> The skin model is a client-side fact, so each client reports it to the server on join and whenever it changes. Non-players always fail this condition, and a player on a client without Apoli — or one that has not reported yet — counts as `wide`.
