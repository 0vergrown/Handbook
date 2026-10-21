---
title: "Any Of (Meta Condition Type)"
description: Passes when at least one listed condition passes.
navigation_title: "Any Of"
aliases: ["or"]
---

Passes when at least one condition in the list passes, and an empty list fails. It works in every kind of condition.

Type ID: `apoli:any_of` (alias `apoli:or`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `conditions` | array of conditions | _required_ | Any one of them passing is enough. They are the same kind as the containing condition. |

## Examples

Wet in any way:

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

> [!TIP]
> Conditions are checked in order and stop at the first success, so put the likeliest first.
