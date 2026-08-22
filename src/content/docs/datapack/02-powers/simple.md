---
title: "Simple (Power Type)"
description: "Does nothing on its own, which makes it useful as a flag other powers can test."
navigation_title: "Simple"
aliases: ["dummy"]
---

Does nothing on its own. That is the point: because a power's presence and its `condition` are visible to every other power, a `apoli:simple` power is the cheapest way to model a piece of state that other powers ask about.

Type ID: `apoli:simple`

## Fields

_None._ It takes the fields every power takes — `condition`, `name`, `description`, `hidden` and so on.

## Examples

The plain form. On its own it does nothing at all, but other powers can now test for it:

```json
{
  "type": "apoli:simple"
}
```

As a **toggleable flag**. This is the common use — a hidden power with a condition, tested elsewhere with [`apoli:power_active`](/docs/datapack/entity-conditions/power_active), so the rule lives in one file instead of being copied into every power that depends on it:

```json
{
  "type": "apoli:simple",
  "hidden": true,
  "condition": {
    "type": "apoli:and",
    "conditions": [
      { "type": "apoli:in_tag", "tag": "minecraft:is_undead" },
      { "type": "apoli:exposed_to_sun" }
    ]
  }
}
```

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "entity_action": { "type": "apoli:set_on_fire", "duration": 4 },
  "condition": {
    "type": "apoli:power_active",
    "power": "vampire:burning_conditions"
  }
}
```

As a **granted marker**, with no condition at all. Grant it with [`apoli:grant_power`](/docs/datapack/entity-actions/grant_power) and revoke it later; anything testing `apoli:power_active` follows:

```json
{
  "type": "apoli:simple",
  "hidden": true,
  "name": "Cursed",
  "description": "Something is wrong with you."
}
```

> **`apoli:dummy` is this power.** An alias kept so packs written for the original Apoli load unchanged.
