---
title: "Random Chance (Meta Condition Type)"
description: Passes with a given probability.
navigation_title: "Random Chance"
aliases: ["chance"]
---

Passes with the given probability. It works in every kind of condition.

Type ID: `apoli:random_chance` (alias `apoli:chance`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `chance` | [Float](/docs/datapack/data-types/float) | _required_ | The probability of passing, from `0.0` to `1.0`. |

## Examples

A one-in-five chance:

```json
{
  "type": "apoli:random_chance",
  "chance": 0.2
}
```

Used as a power's condition, it rolls again every time the condition is checked, which for a power that ticks is many times a second and almost never what you want:

```json
{
  "type": "apoli:action_over_time",
  "interval": 100,
  "entity_action": { "type": "apoli:apply_effect", "effect": { "effect": "minecraft:nausea", "duration": 100 } },
  "condition": { "type": "apoli:random_chance", "chance": 0.25 }
}
```

Here the long `interval` is what makes it work: the condition is only checked every five seconds, so it is a one-in-four chance every five seconds and not a coin flip every tick.

> [!TIP]
> To roll once and then act, use the [meta action](/docs/datapack/meta-actions/random_chance) instead, which is almost always the right choice. Use the condition only when the thing it gates is itself checked on a slow, deliberate schedule.
