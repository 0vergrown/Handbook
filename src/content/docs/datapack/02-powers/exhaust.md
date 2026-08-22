---
title: "Exhaust (Power Type)"
description: "Legacy alias of apoli:action_over_time with an apoli:exhaust action pre-filled."
navigation_title: "Exhaust"
---

Drains hunger on an interval. This is a **legacy alias** — it resolves to [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) with an [`apoli:exhaust`](/docs/datapack/entity-actions/exhaust) action built for you.

Type ID: `apoli:exhaust`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`exhaustion` | [Float](/docs/datapack/data-types/float) | **required** | Exhaustion added each interval.
`interval` | [Integer](/docs/datapack/data-types/integer) | `20` | Ticks between applications.

## The composed form

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "entity_action": {
    "type": "apoli:exhaust",
    "amount": 0.05
  },
  "condition": { "type": "apoli:sprinting" }
}
```
