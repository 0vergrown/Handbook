---
title: "Add XP (Entity Action Type)"
description: "Gives the player experience points or levels, or takes levels away."
navigation_title: "Add XP"
---

Gives the player experience points or levels. A negative number of levels takes levels away.

Type ID: `apoli:add_xp`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `points` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Experience points to give. It can't be negative. |
| `levels` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Experience levels to give. A negative number takes levels away. |

## Examples

```json
"entity_action": {
    "type": "apoli:add_xp",
    "levels": 2
}
```

This gives the player 2 levels.
