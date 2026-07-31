---
title: "Loop (Meta Action Type)"
description: "Executes an action a set number of times, spaced evenly over time."
navigation_title: "Loop"
---

Executes an action a set number of times, spaced evenly over time.

Type ID: `apoli:loop`

## Fields

| Field           | Type                                         | Default    | Description                                                                                                                                                       |
|-----------------|----------------------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `value`         | [Integer](/docs/datapack/data-types/integer) | `1`        | Number of times `action` is executed. At `0` or less the whole action is skipped — not even `before_action` and `after_action` fire.                              |
| `ticks`         | [Integer](/docs/datapack/data-types/integer) | `1`        | Tick interval between iterations. At `0` or less every iteration runs in the firing tick instead (see [Running it all in one tick](#running-it-all-in-one-tick)). |
| `before_action` | Entity Action                                | *optional* | Fired once, immediately, before the first iteration.                                                                                                              |
| `action`        | Entity Action                                | *optional* | Fired once per iteration.                                                                                                                                         |
| `after_action`  | Entity Action                                | *optional* | Fired once, in the same tick as the final iteration, right after it.                                                                                              |

## Behavior

With `ticks` at `1` or more, timing is measured in ticks from the moment the loop fires:

- `before_action` runs at tick `0`, just before the first iteration.
- `action` runs `value` times with iteration *k* at tick `(k − 1) × ticks`. The **first iteration is immediate** (tick `0`), so the default `value` of `1` runs entirely in the firing tick with no scheduling at all.
- `after_action` runs in the same tick as the final iteration, immediately after it.

A `value: 3`, `ticks: 20` loop therefore runs `action` at ticks `0`, `20`, and `40`, spanning `(value − 1) × ticks` ticks total. If `action` is omitted there is nothing to iterate, so `before_action` and `after_action` (when present) both fire immediately.

## Running it all in one tick

Set `ticks` to `0` (or any negative number) and the loop stops scheduling entirely: all `value` iterations run back-to-back inside the firing tick, then `after_action` fires. Nothing is deferred, so the whole loop is finished by the time the action that triggered it returns.

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

Can be used as a repeat-N-times helper for building a burst of particles, rolling several chances at once, applying an effect in a batch rather than as a timer.

> Synchronous iterations are capped at **4096**. A `ticks: 0` loop asking for more silently stops there. This is a safety limit, not a target: every iteration lands on the server thread in the same tick, so a heavy `action` repeated a few thousand times is a lag spike. Give `ticks` a real interval when the count is large.

## Performance

A scheduled loop (`ticks` of `1` or more) only ever keeps **one** entry in the deferred-action queue: each iteration schedules just the next one, so a long loop (e.g. `value: 1000`) costs the server a constant amount per tick instead of scaling with `value`. It runs only when triggered, so it is free while idle unlike a per-tick power such as [`Action Over Time (Power Type)`](/docs/datapack/powers/action_over_time).

A `ticks: 0` loop never touches the queue at all, but it pays the entire cost up front in one tick. Prefer it for small counts and cheap actions.

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
Spawns flame particles five times, once every 10 ticks (0.5 seconds).

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
Plays a pling, deals 2 fire damage three times at 1-second intervals, then plays an explosion sound.
