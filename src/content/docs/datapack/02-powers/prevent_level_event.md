---
title: "Prevent Level Event (Power Type)"
description: "Stops the world events the entity causes, such as the particles and sound of a block it breaks, for everyone."
navigation_title: "Prevent Level Event"
---

Stops the world events the entity with the power causes, for everyone including the entity itself. World events, which Minecraft calls level events, are effects the game sends by number instead of as a sound or a particle, such as the cracking sound and particles of a breaking block.

Type ID: `apoli:prevent_level_event`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `events` | [Integer](/docs/datapack/data-types/integer) or [Array](/docs/datapack/data-types/array) of Integers | _optional_ | Only stops these events. Leave it out to stop every event the entity causes. `event` is accepted as another spelling. |

## Which events it can stop

Minecraft only ties a few events to the player who caused them, so those are the ones this power reaches:

| ID | Event |
| --- | --- |
| `2001` | The particles and sound of a block being broken. |
| `3003` | Waxing copper with honeycomb. |
| `3004` | Scraping the wax off copper with an axe. |
| `3005` | Scraping oxidation off copper with an axe. |

Events with no player behind them, such as a dispenser firing or a composter filling, are never stopped. Mods can tie their own events to a player, and the power stops those too.

## Examples

```json
{
    "type": "apoli:prevent_level_event"
}
```

Blocks the player breaks crumble without a sound or a particle, for the player and for everyone around them.

```json
{
    "type": "apoli:prevent_level_event",
    "events": [3003, 3004, 3005]
}
```

The player waxes and scrapes copper without the sparkles and sounds.
