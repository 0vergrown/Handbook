---
title: "All Of (Meta Condition Type)"
description: Passes when every listed condition passes.
navigation_title: "All Of"
aliases: ["and"]
---

Passes when every condition in the list passes. An empty list passes. Available in every condition flavour, and the conditions inside must be the same flavour as the one containing them.

Type ID: `apoli:all_of` (alias `apoli:and`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`conditions` | array of conditions | **required** | All must pass. Same flavour as the containing condition.

## Examples

Sneaking *and* in water:

```json
{
  "type": "apoli:all_of",
  "conditions": [
    { "type": "apoli:sneaking" },
    { "type": "apoli:submerged_in", "fluid": "minecraft:water" }
  ]
}
```

Nested with [`apoli:any_of`](/docs/datapack/meta-conditions/any_of) to build "A and (B or C)":

```json
{
  "type": "apoli:all_of",
  "conditions": [
    { "type": "apoli:daytime" },
    {
      "type": "apoli:any_of",
      "conditions": [
        { "type": "apoli:in_rain" },
        { "type": "apoli:submerged_in", "fluid": "minecraft:water" }
      ]
    }
  ]
}
```

Any condition also takes `inverted`, so "A and not B" needs no extra nesting:

```json
{
  "type": "apoli:all_of",
  "conditions": [
    { "type": "apoli:on_fire" },
    { "type": "apoli:submerged_in", "fluid": "minecraft:water", "inverted": true }
  ]
}
```

> Conditions are checked in order and stop at the first failure, so put the cheap ones first — a resource check before a `apoli:command`, for instance.
