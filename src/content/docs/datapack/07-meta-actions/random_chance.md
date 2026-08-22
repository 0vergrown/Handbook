---
title: "Random Chance (Meta Action Type)"
description: Runs an action with a given probability.
navigation_title: "Random Chance"
aliases: ["chance"]
---

Rolls once and runs `action` if it succeeds, or `fail_action` if it does not. Available in every action flavour — entity, bi-entity, block and item — and the fields are the same in all of them.

Type ID: `apoli:random_chance` (alias `apoli:chance`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`chance` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | **required** | Probability of success, `0.0` to `1.0`. `0.25` is a one-in-four chance.
`action` | action | **required** | Runs when the roll succeeds. Same flavour as the containing action.
`fail_action` | action | _optional_ | Runs when the roll fails.

## Examples

A one-in-ten chance to drop something extra when you break a block:

```json
{
  "type": "apoli:action_on_block_break",
  "block_action": {
    "type": "apoli:random_chance",
    "chance": 0.1,
    "action": {
      "type": "apoli:spawn_entity",
      "entity_type": "minecraft:item"
    }
  }
}
```

Both outcomes spelled out, which reads better than leaving the failure implicit:

```json
{
  "type": "apoli:random_chance",
  "chance": 0.3,
  "action":      { "type": "apoli:heal", "amount": 4 },
  "fail_action": { "type": "apoli:exhaust", "amount": 1.0 }
}
```

Because `chance` takes an [expression](/docs/datapack/data-types/expression), the odds can depend on state — here, likelier the more of a resource you have:

```json
{
  "type": "apoli:random_chance",
  "chance": "mypack:luck / 10",
  "action": { "type": "apoli:apply_effect", "effect": { "effect": "minecraft:hero_of_the_village", "duration": 200 } }
}
```

> The roll happens once per invocation. To roll separately for several things, use several `apoli:random_chance` blocks rather than one wrapping an [`apoli:and`](/docs/datapack/meta-actions/and).
