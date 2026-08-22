---
title: "Burn (Power Type)"
description: "Legacy alias of apoli:action_over_time with an apoli:set_on_fire action pre-filled."
navigation_title: "Burn"
---

Sets the holder on fire on an interval. This is a **legacy alias** — it resolves to [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) with an [`apoli:set_on_fire`](/docs/datapack/entity-actions/set_on_fire) action built for you.

Type ID: `apoli:burn`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`burn_duration` | [Float](/docs/datapack/data-types/float) | **required** | Seconds of fire applied each interval.
`interval` | [Integer](/docs/datapack/data-types/integer) | **required** | Ticks between applications.

## The composed form

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
