---
title: "Impact (Entity Condition Type)"
description: "Compares the impact rating of the origins a player has against a fixed value."
navigation_title: "Impact"
---

Compares the impact of the origins a player currently has against a value you choose. Impact is the one-to-three-flame rating every [origin](/docs/datapack/origins/overview) carries, so this is how a power asks "is this player playing something powerful?" without listing every origin by name.

Type ID: `origins:impact`

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or impact name | **required** | The value to compare against — `0`–`3`, or `none`, `low`, `medium`, `high`. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How the player's impact is compared to `compare_to`. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only look at the origin the player has in this layer. Omit to look at every layer at once. |
| `aggregate` | [String](/docs/datapack/data-types/string) | `max` | How several layers combine when `layer` is omitted: `max`, `min`, `sum` or `average`. Ignored when `layer` is set. |

Always `false` for non-players. A player whose layers are all empty reads `0`, the same as `none`.

The origin it reads is the one that is **active**, so a [swapped](/docs/datapack/origins/swapped) layer reports the impact of the origin the player is swapped into, not the one underneath it.

## Examples

Only let high-impact origins take the shortcut:

```json
{
    "type": "origins:impact",
    "comparison": ">=",
    "compare_to": "high"
}
```

Give low-impact players a leg up — a regeneration power that only applies while nothing they have is stronger than `low`:

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

With several layers, `aggregate` decides what "their impact" means. `sum` is the budget reading — the total across every layer:

```json
{
    "type": "origins:impact",
    "aggregate": "sum",
    "comparison": ">",
    "compare_to": 4
}
```

Scoped to one layer, so a strong secondary origin does not count:

```json
{
    "type": "origins:impact",
    "layer": "origins:origin",
    "comparison": "==",
    "compare_to": "medium"
}
```
