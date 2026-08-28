---
title: "Unit (Data Type)"
description: Which unit an experience comparison is read in — whole levels or raw points.
navigation_title: "Unit"
---

A string naming the unit an experience value is measured in. Used by
[`apoli:xp`](/docs/datapack/entity-conditions/xp), which reads the same two numbers the vanilla XP
bar keeps.

## Values

Value | Meaning
------|--------
`levels` | Whole experience **levels** — the number printed above the XP bar. Level 30 is `30`, regardless of how many points that took.
`points` | Raw experience **points** — the total the player has banked. Level 30 is 1395 points, so the two units are never interchangeable.

## Example

```json
{
  "type": "apoli:xp",
  "unit": "levels",
  "comparison": ">=",
  "compare_to": 30
}
```

> The `apoli:xp_levels` and `apoli:xp_points` aliases fill `unit` in for you, so a condition written
> with one of those never needs to name it. [`apoli:add_xp`](/docs/datapack/entity-actions/add_xp)
> takes no `unit` — it has a `points` field and a `levels` field instead.
