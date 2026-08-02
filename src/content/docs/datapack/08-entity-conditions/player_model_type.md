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

The model is resolved from the first of these that is available:

1. **What the client reports.** Sent on join and whenever it changes — the only source that sees client-side skin-replacement mods.
2. **The player's signed profile**, read server-side. Works for players on a vanilla client, or one without Apoli.
3. **Vanilla's default-skin rule for the player's UUID**, matching the skin the game itself would draw.

Non-players always fail this condition.

> Pairing a `wide` power with a `slim` power is the usual way to use this, and it relies on the two being mutually exclusive — they are, for every player, on every path above.
