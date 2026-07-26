---
title: "apoli:loop"
description: "Executes an action a set number of times, spaced evenly over time."
---

Executes an action a set number of times, spaced evenly over time.

Type ID: `apoli:loop`

## Fields

| Field           | Type                  | Default    | Description                                                          |
|-----------------|-----------------------|------------|----------------------------------------------------------------------|
| `value`         | [Integer](/docs/datapack/data-types/integer)   | `1`        | Number of times `action` is executed. `0` or less runs nothing.      |
| `ticks`         | [Integer](/docs/datapack/data-types/integer)   | `1`        | Tick interval between iterations. Minimum effective value is `1`.     |
| `before_action` | Entity Action         | *optional* | Fired once, immediately, before the first iteration.                 |
| `action`        | Entity Action         | *optional* | Fired once per iteration.                                            |
| `after_action`  | Entity Action         | *optional* | Fired once, in the same tick as the final iteration, right after it. |

## Behavior

Timing is measured in ticks from the moment the loop fires, with `interval = max(1, ticks)`:

- `before_action` runs at tick `0`, just before the first iteration.
- `action` runs `value` times — iteration *k* at tick `(k − 1) × interval`. The **first iteration is immediate** (tick `0`), so the default `value` of `1` runs entirely in the firing tick with no scheduling at all.
- `after_action` runs in the same tick as the final iteration, immediately after it.

A `value: 3`, `ticks: 20` loop therefore runs `action` at ticks `0`, `20`, and `40`, spanning `(value − 1) × interval` ticks total. If `action` is omitted there is nothing to iterate, so `before_action` and `after_action` (when present) both fire immediately.

## Performance

`apoli:loop` only ever keeps **one** entry in the deferred-action queue per running loop: each iteration schedules just the next one, so a long loop (e.g. `value: 1000`) costs the server a constant amount per tick instead of scaling with `value`. It runs only when triggered, so it is free while idle — unlike a per-tick power such as `apoli:action_over_time`.

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
Plays a pling, deals 2 magic damage three times at 1-second intervals, then plays an explosion sound.

