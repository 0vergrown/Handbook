---
title: "Any Of (Meta Condition Type)"
description: Passes when at least one listed condition passes.
navigation_title: "Any Of"
aliases: ["or"]
---

Passes when at least one condition in the list passes. An empty list fails. Available in every condition flavour.

Type ID: `apoli:any_of` (alias `apoli:or`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`conditions` | array of conditions | **required** | Any one passing is enough. Same flavour as the containing condition.

## Examples

Wet by any means:

```json
{
  "type": "apoli:any_of",
  "conditions": [
    { "type": "apoli:in_rain" },
    { "type": "apoli:submerged_in", "fluid": "minecraft:water" },
    { "type": "apoli:in_block", "block_condition": { "type": "apoli:block", "block": "minecraft:water_cauldron" } }
  ]
}
```

A list of acceptable dimensions, which is the most common use:

```json
{
  "type": "apoli:any_of",
  "conditions": [
    { "type": "apoli:dimension", "dimension": "minecraft:the_nether" },
    { "type": "apoli:dimension", "dimension": "minecraft:the_end" }
  ]
}
```

> Conditions are checked in order and stop at the first success, so put the likeliest first.
