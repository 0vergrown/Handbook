---
title: "Burn (Power Type)"
description: "Legacy alias of apoli:action_over_time with an apoli:set_on_fire action filled in."
navigation_title: "Burn"
---

Sets the entity with the power on fire on an interval. `apoli:burn` is a legacy alias: it resolves to [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) with an [`apoli:set_on_fire`](/docs/datapack/entity-actions/set_on_fire) action built for you.

Type ID: `apoli:burn`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `burn_duration` | [Float](/docs/datapack/data-types/float) | _required_ | Seconds of fire applied each interval. |
| `interval` | [Integer](/docs/datapack/data-types/integer) | _required_ | Ticks between applications. |

## The same power without the alias

An `apoli:burn` power with `"burn_duration": 2`, `"interval": 20` and an `exposed_to_sun` condition is the same as this:

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "entity_action": {
    "type": "apoli:set_on_fire",
    "duration": 2
  },
  "condition": { "type": "apoli:exposed_to_sun" }
}
```
