---
title: "Player Model Type (Entity Condition Type)"
description: "Checks which skin model the player uses: the wide (Steve) arms or the slim (Alex) arms."
navigation_title: "Player Model Type"
---

Checks which skin model the player uses: the wide (Steve) arms or the slim (Alex) arms.

Type ID: `apoli:player_model_type`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `model_type` | [Player Model Type](/docs/datapack/data-types/player-model-type) | _required_ | `wide` or `slim`. |

## Examples

```json
{
	"type": "apoli:player_model_type",
	"model_type": "slim"
}
```

This passes for players whose skin uses the three-pixel (Alex) arms.

The model comes from the first of these that is available:

1. What the client reports. It is sent on join and whenever it changes, and it is the only source that sees skin replacement mods on the client.
2. The player's signed profile, read on the server. This works for players on a vanilla client, or one without Apoli.
3. Vanilla's default skin rule for the player's UUID, which matches the skin the game itself would draw.

Entities that aren't players always fail this condition.

> [!NOTE]
> The usual way to use this is to pair a `wide` power with a `slim` power, which relies on the two never both passing. They never do, for any player, on any of the paths above.
