---
title: "Impact (Entity Condition Type)"
description: "Compares the impact rating of the origins a player has against a fixed value."
navigation_title: "Impact"
---

Compares the impact of the origins a player currently has against a value you choose. Impact is the rating from `none` to `high` (0 to 3) that every [origin](/docs/datapack/origins/overview) carries, so a power can check whether the player is playing something powerful without listing every origin by name.

Type ID: `origins:impact`

> [!NOTE]
> This condition comes from the Origins mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or impact name | _required_ | The value to compare against: `0` to `3`, or `none`, `low`, `medium` or `high`. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How the player's impact is compared to `compare_to`. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only looks at the origin the player has in this layer. Leave it out to look at every layer at once. |
| `aggregate` | [String](/docs/datapack/data-types/string) | `max` | How several layers combine when `layer` is left out: `max`, `min`, `sum` or `average`. It is ignored when `layer` is set. |

The condition is always `false` for entities that aren't players. A player whose layers are all empty reads `0`, the same as `none`.

It reads the active origin, so a [swapped](/docs/datapack/origins/swapped) layer reports the impact of the origin the player is swapped into, not the one underneath it.

## Examples

```json
{
    "type": "origins:impact",
    "comparison": ">=",
    "compare_to": "high"
}
```

This passes only for high impact origins, for something like a shortcut that only they can take.

```json
{
    "type": "apoli:action_over_time",
    "interval": 60,
    "entity_action": { "type": "apoli:heal", "amount": 1 },
    "condition": {
        "type": "origins:impact",
        "comparison": "<=",
        "compare_to": "low"
    }
}
```

This power gives low impact players a hand: it heals 1 health every 60 ticks while nothing they have is stronger than `low`.

```json
{
    "type": "origins:impact",
    "aggregate": "sum",
    "comparison": ">",
    "compare_to": 4
}
```

With several layers, `aggregate` decides what the player's impact means. `sum` reads it as a budget, the total across every layer, and this passes when that total is above 4.

```json
{
    "type": "origins:impact",
    "layer": "origins:origin",
    "comparison": "==",
    "compare_to": "medium"
}
```

This only looks at the main layer, so a strong origin on another layer doesn't count.
