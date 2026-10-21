---
title: "Ability (Entity Condition Type)"
description: "Checks whether the player has a player ability turned on."
navigation_title: "Ability"
---

Checks whether the player has a player ability turned on.

Type ID: `apoli:ability`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `ability` | [Player Ability](/docs/datapack/data-types/player-abilities) | _required_ | The ID of the ability to check for. |

## Examples

```json
"condition": {
    "type": "apoli:ability",
    "ability": "minecraft:mayfly"
}
```

This checks whether the player can fly the way Creative mode allows.
