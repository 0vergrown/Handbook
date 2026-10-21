---
title: "Simple (Power Type)"
description: "Does nothing on its own, so other powers can use it as a flag to test."
navigation_title: "Simple"
aliases: ["dummy", "nothing"]
---

Does nothing on its own. A power's presence and its `condition` are visible to every other power, so an `apoli:simple` power is the cheapest way to model a piece of state that other powers ask about.

Type ID: `apoli:simple`

## Fields

_None._ It takes the fields every power takes, such as `condition`, `name`, `description` and `hidden`.

## Examples

The plain form. It does nothing at all, but other powers can test for it:

```json
{
  "type": "apoli:simple"
}
```

A flag that switches on and off. This is the common use: a hidden power with a condition, tested elsewhere with [`apoli:power_active`](/docs/datapack/entity-conditions/power_active), so the rule lives in one file instead of being copied into every power that depends on it.

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

A power that depends on the flag:

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

A marker with no condition at all. Grant it with [`apoli:grant_power`](/docs/datapack/entity-actions/grant_power) and revoke it later, and anything testing `apoli:power_active` follows:

```json
{
  "type": "apoli:simple",
  "hidden": true,
  "name": "Cursed",
  "description": "Something is wrong with you."
}
```

> [!NOTE]
> `apoli:dummy` and `apoli:nothing` are this power. `apoli:dummy` is an alias kept so packs written for the original Apoli load unchanged. `apoli:nothing` is the power form of the meta type that also exists as an [action](/docs/datapack/meta-actions/nothing) and a [condition](/docs/datapack/meta-conditions/nothing), so "nothing happens here" reads the same wherever you write it.
