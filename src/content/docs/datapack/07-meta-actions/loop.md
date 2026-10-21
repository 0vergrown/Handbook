---
title: "Loop (Meta Action Type)"
description: "Runs an action a number of times, spaced evenly over time."
navigation_title: "Loop"
---

Runs an action a number of times, spaced evenly over time.

Type ID: `apoli:loop`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | How many times `action` runs. At `0` or less the whole action is skipped, and `before_action` and `after_action` don't fire either. |
| `ticks` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | Ticks between iterations. At `0` or less every iteration runs in the tick the loop fires (see [Running it all in one tick](#running-it-all-in-one-tick)). |
| `before_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs once, straight away, before the first iteration. |
| `action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs once per iteration. |
| `after_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs once, in the same tick as the final iteration, right after it. |

## Behavior

With `ticks` at `1` or more, timing is measured in ticks from the moment the loop fires:

- `before_action` runs at tick `0`, just before the first iteration.
- `action` runs `value` times, with iteration *k* at tick `(k − 1) × ticks`. The first iteration happens straight away at tick `0`, so the default `value` of `1` runs entirely in the tick the loop fires, with nothing scheduled.
- `after_action` runs in the same tick as the final iteration, right after it.

A loop with `value: 3` and `ticks: 20` runs `action` at ticks `0`, `20` and `40`, spanning `(value − 1) × ticks` ticks in total. If `action` is left out there is nothing to repeat, so `before_action` and `after_action` (when present) both fire straight away.

`value` and `ticks` can be [expressions](/docs/datapack/data-types/expression). Both are worked out once, when the loop fires, and their variables read the entity the action runs on, which is the actor in a bi-entity action. `"value": "2 + 2 * example:charges"` repeats more the more charges the entity has when the loop starts, and spending charges during the loop doesn't cut it short.

## Running it all in one tick

Set `ticks` to `0` (or any negative number) and the loop schedules nothing: all `value` iterations run back to back inside the tick it fires, then `after_action` fires. Nothing is put off, so the whole loop has finished by the time the action that triggered it returns.

```json
{
   "type":"apoli:loop",
   "value":16,
   "ticks":0,
   "action":{
      "type":"apoli:spawn_particles",
      "particle":{
         "type":"minecraft:flame"
      },
      "count":1
   }
}
```

Use it to repeat something a set number of times, for example to build a burst of particles, roll several chances at once or apply an effect in a batch instead of on a timer.

> [!WARNING]
> Iterations in a single tick are capped at 4096, and a `ticks: 0` loop asking for more stops there without a warning. The cap is a safety limit and shouldn't be treated as a target. Every iteration runs on the server thread in the same tick, so a heavy `action` repeated a few thousand times causes a lag spike. Give `ticks` a real interval when the count is large.

## Performance

A scheduled loop (`ticks` of `1` or more) only ever keeps one entry in the queue of delayed actions, because each iteration schedules only the next one. A long loop, such as `value: 1000`, costs the server the same small amount per tick whatever `value` is. It only runs when triggered, so it costs nothing while idle, unlike a power that runs every tick such as [apoli:action_over_time](/docs/datapack/powers/action_over_time).

A `ticks: 0` loop never touches the queue, but it pays the entire cost up front in one tick. Prefer it for small counts and cheap actions.

## Examples

```json
{
  "type":"apoli:loop",
  "value":5,
  "ticks":10,
  "action":{
    "type":"apoli:spawn_particles",
    "particle":{
      "type":"minecraft:flame"
    },
    "count":3
  }
}
```

This spawns flame particles five times, once every 10 ticks (0.5 seconds).

```json
{
  "type":"apoli:loop",
  "value":3,
  "ticks":20,
  "before_action":{
    "type":"apoli:play_sound",
    "sound":"minecraft:block.note_block.pling"
  },
  "action":{
    "type":"apoli:damage",
    "amount":2,
    "damage_type": "minecraft:on_fire"
  },
  "after_action":{
    "type":"apoli:play_sound",
    "sound":"minecraft:entity.generic.explode"
  }
}
```

This plays a pling, deals 2 fire damage three times at 1-second intervals, and then plays an explosion sound.
