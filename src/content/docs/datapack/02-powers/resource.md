---
title: "Resource (Power Type)"
description: "Provides a variable with an assignable, modifiable, and optionally dynamic minimum and maximum value."
navigation_title: "Resource"
---

Provides a variable with an assignable, modifiable, and optionally dynamic minimum and maximum value.

Type ID: `apoli:resource`

> This power type provides a variable that can be changed with the [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) (and the legacy [apoli:change_resource](/docs/datapack/entity-actions/change_resource), which auto-translates into Modify Resource), and the value of which can be checked with the Resource (Entity Condition Type).

## What's new vs. Apace's `apoli:resource`

- `min`, `max`, and `start_value` accept either an [Integer](/docs/datapack/data-types/integer) **or** an [Expression](/docs/datapack/data-types/expression). When an Expression is used, the limit is re-evaluated on every tick so the ceiling can shift in response to other resources, entity stats, or world state.
- `enforce_limits` and `retain_value` are first-class options (taken from the `apoli:modifiable_resource` power type in Origins: Math). When `enforce_limits` is `false` the value can travel outside `[min, max]` until something clamps it.
- Values persist across server restarts via the entity's `PowerContainer` aux-data store.
- `max` is **optional**. Leave it out and the resource is uncapped upwards — useful for score counters and running totals that should never hit a ceiling. `min` is optional too, and leaving it out makes the resource uncapped downwards.
- `size` turns one power into a **table** of that many independently addressable slots.

## Fields

| Field            | Type                                          | Default        | Description                                                                                                                                                                                                                                                                                                  |
| ---------------- | --------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `min`            | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | _unbounded_    | The minimum value of the resource. When an Expression, re-evaluated each tick. Omit it and the resource has no lower bound.                                                                                                                                                                                   |
| `max`            | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | _unbounded_    | The maximum value of the resource. When an Expression, re-evaluated each tick. Omit it and the resource has no upper bound.                                                                                                                                                                                   |
| `start_value`    | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | value of `min`, or `0` when there is no `min` | The value of the resource when the entity first receives the power. Also aliased as `default`.                                                                                                                                                                                                                |
| `size`           | [Integer](/docs/datapack/data-types/integer)  | `1`            | How many values this resource stores. Above `1` the power becomes a **table** of that many slots, each addressed by a `position` from `0` to `size - 1`. Also aliased as `positions` and `slots`. There is no upper limit — see [Big tables](#big-tables).                                                                                              |
| `hud_render`     | [Hud Render](/docs/datapack/data-types/hud-render)                        | _hidden_       | Determines how the resource is visualized on the HUD.                                                                                                                                                                                                                                                        |
| `enforce_limits` | [Boolean](/docs/datapack/data-types/boolean)                           | `true`         | Whether the resource value is clamped to `[min, max]`.                                                                                                                                                                                                                                                       |
| `retain_value`   | [Boolean](/docs/datapack/data-types/boolean)                           | `false`        | When `enforce_limits` is `true`: if a modification would push the value outside the bounds, keep the old value instead of clamping.                                                                                                                                                                          |
| `min_action`     | Entity Action Type                            | _optional_     | Run on the entity whenever the value reaches `min`.                                                                                                                                                                                                                                                          |
| `max_action`     | Entity Action Type                            | _optional_     | Run on the entity whenever the value reaches `max`.                                                                                                                                                                                                                                                          |
| `persistent`     | [Boolean](/docs/datapack/data-types/boolean)                           | `true`         | When `true`, the value survives server restart (and survives the entity unloading/reloading). When `false`, the value resets to `start_value` whenever the entity rejoins the world. Useful for resources that semantically should reset, like daily-quest counters or cooldowns you want to clear on login. |

## Storing more than one value

Set `size` and the resource holds a row of independent values instead of a single one. Every slot shares the same `min` / `max` / `start_value` / `enforce_limits` rules, and every slot is addressed by a **position** — a zero-based index.

```json
{
   "type":"apoli:resource",
   "min":0,
   "max":64,
   "start_value":0,
   "size":6
}
```

That stores six values, `0` through `5`, all starting at `0`.

Reading and writing a slot:

- [apoli:resource](/docs/datapack/entity-conditions/resource) (entity condition) takes a `position`. Leave it out and the condition passes if **any** slot matches.
- [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) takes a `position`. Leave it out and the modification is applied to **every** slot.
- In an [Expression](/docs/datapack/data-types/expression), `example:table[2]` reads slot 2, `example:table_size` is the slot count, and `resource_contains(example:table, 5)` asks whether any slot holds `5`.
- `/apoli:resource get|set|change <targets> <power> [position]` reads or writes one slot; `/apoli:resource list` prints the whole table.

Slot `0` is the resource's scalar value: anything that reads the resource without a position (the HUD bar, an unindexed Expression reference, `min_action` / `max_action`) sees slot `0`.

### Big tables

Slots are only allocated when they are **written**. Declaring `"size": 1000000` costs nothing on its own: the resource stores slot 0 and grows only as far as the highest slot you have actually written to. A slot you have never written reads as `start_value`, so an unwritten table behaves exactly as if it were full of that value.

That is why there is no cap on `size`. What it costs you is decided by which slots you write, not by the number you declare. Writing slot 999999 does allocate a million slots' worth of memory for that holder — about 4 MB — and that memory is saved to disk and sent to clients with the rest of the power's data, so write high slots deliberately rather than by accident.

`size` is also the guard on a computed `position`: a write to a slot at or above `size` is refused, so however wrong an index expression goes, it can never allocate past the number you declared. Declaring a size far larger than you need gives that guard nothing to do, so pick a number that reflects the table you actually want.

Apoli logs one warning naming the power if a declared `size` is above 65536, as a check against a typo like an extra zero.

> `min_action` and `max_action` fire **per slot** in table mode, so a write with no `position` — which touches every slot — can fire `max_action` several times in one go.

> Because slots are ordinary Expression values, a table doubles as a vector store. `example:pos[0]`, `example:pos[1]` and `example:pos[2]` feed straight into any field that takes an Expression — a velocity, a damage amount, a modifier — with no `if_else_list` of hard-coded numbers in between.

## Available variables in Expression fields

When `min`, `max`, or `start_value` are written as [Expression](/docs/datapack/data-types/expression) strings, the following variables are bound:

- `value`: The current value of this same resource (useful for limits that depend on the current stockpile, e.g. a max that grows as the resource accrues).
- `<namespace>:<path>`: Any other resource the entity has, referenced by its full power id. Add `[n]` to read a slot of a table resource, and the `_min` / `_max` / `_size` suffixes to read its bounds and length.
- `health`, `max_health`, `food`, `air`, `xp_level`, `xp_progress`: Common entity stats.
- `world_time`, `day_time`: Long ticks from the entity's level.

See the [Expression](/docs/datapack/data-types/expression) page for the complete list.

> **A `min_action` or `max_action` that fails to parse is dropped, not silently ignored.** Since Apoli 1.38.0 the log carries a warning naming the power and the field — `Ignoring the 'max_action' field of <power id> — it is present but failed to parse` — followed by the underlying reason. The rest of the resource still loads, so the bar works and only the boundary action is missing. Before 1.38.0 the drop was completely silent, which is why a mistyped action read as "the power does not parse and nothing is logged".

> The most common cause is a legacy damage source: [apoli:damage](/docs/datapack/entity-actions/damage) takes `damage_type` (a damage type ID), not the pre-1.19.4 `source` object.

## Examples

A binary flag (boolean-like resource):

```json
{
   "type":"apoli:resource",
   "min":0,
   "max":1,
   "hud_render":{
      "should_render":false
   },
   "min_action":{
      "type":"apoli:heal",
      "amount":6
   }
}
```

A mana pool whose maximum scales with the player's XP level:

```json
{
   "type":"apoli:resource",
   "min":0,
   "max":"20 + 5 * xp_level",
   "start_value":0,
   "hud_render":{
      "should_render":true,
      "bar_index":2
   }
}
```

An uncapped score counter — no `max`, so it can grow forever:

```json
{
   "type":"apoli:resource",
   "min":0,
   "start_value":0
}
```

A six-slot table used as a saved position (x, y, z) plus three spare slots:

```json
{
   "type":"apoli:resource",
   "min":-30000000,
   "max":30000000,
   "start_value":0,
   "size":6
}
```

A resource whose ceiling is the value of another resource (composes cleanly without nesting):

```json
{
   "type":"apoli:resource",
   "min":0,
   "max":"example:mana_capacity",
   "start_value":0
}
```
