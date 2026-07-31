---
title: "Add XP (Entity Action Type)"
description: "Adds experience points and levels to the player, or subtracts levels."
navigation_title: "Add XP"
---

Adds experience points and levels to the player, or subtracts levels.

Type ID: `apoli:add_xp`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`points` | Integer or [Expression](/docs/datapack/data-types/expression) | _optional_ | If set, this is the amount experience points that will be given to the player. Can not be negative.
`levels` | Integer or [Expression](/docs/datapack/data-types/expression) | _optional_ | If set, this is the amount experience levels that will be given to the player. Can be negative and thus used to subtract levels.

## Examples

```json
"entity_action": {
    "type": "apoli:add_xp",
    "levels": 2
}
```

This example will add 2 levels to the player.
