---
title: "Action Over Time (Power Type)"
description: "Executes an Entity Action Type on the entity that has the power within the specified interval."
navigation_title: "Action Over Time"
aliases: ["damage_over_time", "burn", "exhaust", "freeze"]
---

Executes an Entity Action Type on the entity that has the power within the specified interval.

Type ID: `apoli:action_over_time`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`interval` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `20` | Ticks between subsequent executions of the specified actions. At least 1. An expression is re-read every time the action fires, so the gap can change while the power runs — see [A changing interval](#a-changing-interval).
`onset_delay` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks to wait after the condition first becomes true before `entity_action` starts running. `rising_action` still fires immediately.
`entity_action` | Entity Action Type | _optional_ | The action to execute on the entity that has the power each interval.
`rising_action` | Entity Action Type | _optional_ | The action to execute on the first interval tick in which the condition became true.
`falling_action` | Entity Action Type | _optional_ | The action to execute on the first interval tick in which the condition became false.
`actions` | array of step objects | _optional_ | Extra actions on their own intervals, all driven by the same condition. See [Several intervals in one power](#several-intervals-in-one-power).

## Several intervals in one power

`actions` takes a list of steps, each with its own `interval`. The power's `condition` is still tested once per `interval` tick and its result is shared by every step, so three effects on three different beats cost one condition evaluation instead of three.

| Field | Type | Default | Description |
|---|---|---|---|
| `interval` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `20` | Ticks between executions of this step. An expression is re-read each time the step fires. |
| `entity_action` | Entity Action Type | **required** | The action this step runs. |
| `onset_delay` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks to wait after the condition first became true before this step starts. |
| `condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | An extra gate for this step only, checked on the ticks the step is due. |

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "condition": { "type": "apoli:in_rain" },
  "entity_action": { "type": "apoli:damage", "amount": 1, "damage_type": "minecraft:drown" },
  "actions": [
    {
      "interval": 5,
      "entity_action": { "type": "apoli:spawn_particles", "particle": "minecraft:falling_water", "count": 2 }
    },
    {
      "interval": 200,
      "entity_action": { "type": "apoli:apply_effect", "effect": { "effect": "minecraft:slowness", "duration": 200 } }
    }
  ]
}
```

Particles every 5 ticks, a point of damage every 20, slowness every 200 — one power, one `apoli:in_rain` check per second.

The top-level `interval` stays the condition's heartbeat: it decides how often the power re-checks whether it is active, and `rising_action` / `falling_action` still fire on those edges. Steps use the last known result in between, so a step faster than the top-level `interval` can run up to one `interval` after the condition stopped being true.

## A changing interval

Write `interval` as an [Expression](/docs/datapack/data-types/expression) and the wait between firings is recomputed from scratch each time the action runs, so it can follow a resource, an enchantment level, the time of day — anything an expression can read.

```json
{
  "type": "apoli:action_over_time",
  "interval": "20 + min(enchantment[origins:water_protection, armor, sum], 8) * 6",
  "condition": { "type": "apoli:in_rain" },
  "entity_action": { "type": "apoli:damage", "amount": 2, "damage_type": "origins:hurt_by_water" }
}
```

One point of damage a second bare, one every 3.4 seconds in four pieces of the enchantment — and the delay changes the moment the armour does, because the next gap is measured when the current hit lands.

Two things behave differently from a fixed number, both in your favour:

- **The first hit is immediate.** The power checks its condition every tick instead of once per interval, so the action runs on the tick the condition becomes true rather than up to one interval later.
- **The gap is measured from the last firing**, not from a fixed beat, so shortening the interval speeds the power up straight away.

> That per-tick check is the price. A fixed `interval` evaluates the power's `condition` once per interval; an expression evaluates it every tick. Keep the condition cheap — a fluid or weather check is nothing, a scan over nearby entities is not — or leave `interval` a plain number. Mixing the two is fine: a fixed top-level `interval` with one expression step still re-checks every tick, so the same advice applies.

> The power wakes on the greatest common divisor of all the intervals involved. `20` with steps at `5` and `40` wakes every 5 ticks; `20` with a step at `7` wakes every tick, because nothing smaller divides both. Pick intervals that share factors — `5`, `10`, `20`, `40` — and the power stays as cheap as one plain `action_over_time`.

## Gating an expensive condition

Because `interval` is how often the condition is re-checked, this power is also the way to stop an expensive condition from being tested every tick. Put the expensive condition here, write a resource on the edges, and let the costly power read the resource:

```json
{
  "type": "apoli:action_over_time",
  "interval": 10,
  "condition": {
    "type": "apoli:block_in_radius",
    "radius": 5,
    "shape": "sphere",
    "block_condition": { "type": "apoli:in_tag", "tag": "minecraft:campfires" }
  },
  "rising_action": {
    "type": "apoli:modify_resource",
    "resource": "mypack:near_smoke",
    "modifier": { "operation": "set_base", "value": 1 }
  },
  "falling_action": {
    "type": "apoli:modify_resource",
    "resource": "mypack:near_smoke",
    "modifier": { "operation": "set_base", "value": 0 }
  }
}
```

Anything that needs the answer now tests `{"type": "apoli:resource", "resource": "mypack:near_smoke", "comparison": "==", "compare_to": 1}`, which costs nothing. That matters most for [apoli:shader](/docs/datapack/powers/shader), whose condition Apoli re-resolves once per player every tick.

> The trade is latency: the answer can be up to one `interval` out of date. Pick the interval from how quickly the thing you are watching can change.

## Legacy shapes

Four older power ids are read as an `apoli:action_over_time`, so packs that use them keep working and get every field this power has:

| Legacy id | Read as |
| --- | --- |
| `apoli:damage_over_time` | an `apoli:damage` entity action on an interval |
| `apoli:burn` | an `apoli:set_on_fire` entity action on an interval |
| `apoli:exhaust` | an `apoli:exhaust` entity action on an interval |
| `apoli:freeze` | an [apoli:freeze](/docs/datapack/entity-actions/freeze) entity action every tick |

Write the action form in new packs — it takes a duration, can be fired from anything, and can be combined with the rest of the `actions` list.

## Examples
```json
{
  	"type": "apoli:action_over_time",
  	"entity_action": {
    	"type": "apoli:set_on_fire",
    	"duration": 4
  	},
  	"interval": 20,
  	"condition": {
    	"type": "apoli:on_fire"
  	}
}
```

This example will set the entity on fire if the entity that has the power is on fire, essentially making the entity burn indefinitely unless the entity manages to extinguish the fire.

`onset_delay` gives the power a grace period. This one only starts hurting after the entity has been in the rain for five seconds, then damages every second:

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "onset_delay": 100,
  "entity_action": {
    "type": "apoli:damage",
    "amount": 2,
    "damage_type": "minecraft:drown"
  },
  "condition": { "type": "apoli:in_rain" }
}
```

Because it takes an [Expression](/docs/datapack/data-types/expression), the delay can also be driven by a resource — `"onset_delay": "20 + mypack:insulation * 26"` waits longer the more insulation the holder has built up.

> Three power types are just this one with the action pre-filled: [`apoli:damage_over_time`](/docs/datapack/powers/damage_over_time), [`apoli:burn`](/docs/datapack/powers/burn) and [`apoli:exhaust`](/docs/datapack/powers/exhaust). They still load, and they resolve to `apoli:action_over_time`.
