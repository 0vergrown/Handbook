---
title: "Random Chance (Meta Condition Type)"
description: Passes with a given probability.
navigation_title: "Random Chance"
aliases: ["chance"]
---

Passes with the given probability. Available in every condition flavour.

Type ID: `apoli:random_chance` (alias `apoli:chance`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`chance` | [Float](/docs/datapack/data-types/float) | **required** | Probability of passing, `0.0` to `1.0`.

## Examples

A one-in-five chance:

```json
{
  "type": "apoli:random_chance",
  "chance": 0.2
}
```

Used as a power's condition, this re-rolls **every time the condition is checked** — which for a ticking power is many times a second, and almost never what you want:

```json
{
  "type": "apoli:action_over_time",
  "interval": 100,
  "entity_action": { "type": "apoli:apply_effect", "effect": { "effect": "minecraft:nausea", "duration": 100 } },
  "condition": { "type": "apoli:random_chance", "chance": 0.25 }
}
```

Here the long `interval` is what makes it sane: the condition is only consulted every five seconds, so it is a one-in-four chance every five seconds rather than a coin flip per tick.

> If you want to roll once and *act*, use the [meta action](/docs/datapack/meta-actions/random_chance) instead — it is almost always the right one. Reach for the condition only when the thing being gated is itself evaluated on a slow, deliberate schedule.
