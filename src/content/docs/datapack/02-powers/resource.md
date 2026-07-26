---
title: "apoli:resource"
description: "Provides a variable with an assignable, modifiable, and optionally dynamic minimum and maximum value."
---

Provides a variable with an assignable, modifiable, and optionally dynamic minimum and maximum value.

Type ID: `apoli:resource`

> This power type provides a variable that can be changed with the [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) (and the legacy [apoli:change_resource](/docs/datapack/entity-actions/change_resource), which auto-translates into Modify Resource), and the value of which can be checked with the Resource (Entity Condition Type).

## What's new vs. Apace's `apoli:resource`

- `min`, `max`, and `start_value` accept either an [Integer](/docs/datapack/data-types/integer) **or** an [Expression](/docs/datapack/data-types/expression). When an Expression is used, the limit is re-evaluated on every tick so the ceiling can shift in response to other resources, entity stats, or world state.
- `enforce_limits` and `retain_value` are first-class options (taken from the `apoli:modifiable_resource` power type in Origins: Math). When `enforce_limits` is `false` the value can travel outside `[min, max]` until something clamps it.
- Values persist across server restarts via the entity's `PowerContainer` aux-data store.

## Fields

| Field            | Type                                          | Default        | Description                                                                                                                                                                                                                                                                                                  |
| ---------------- | --------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `min`            | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) |                | The minimum value of the resource. When an Expression, re-evaluated each tick.                                                                                                                                                                                                                               |
| `max`            | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) |                | The maximum value of the resource. When an Expression, re-evaluated each tick.                                                                                                                                                                                                                               |
| `start_value`    | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | value of `min` | The value of the resource when the entity first receives the power.                                                                                                                                                                                                                                          |
| `hud_render`     | [Hud Render](/docs/datapack/data-types/hud-render)                        | _hidden_       | Determines how the resource is visualized on the HUD.                                                                                                                                                                                                                                                        |
| `enforce_limits` | [Boolean](/docs/datapack/data-types/boolean)                           | `true`         | Whether the resource value is clamped to `[min, max]`.                                                                                                                                                                                                                                                       |
| `retain_value`   | [Boolean](/docs/datapack/data-types/boolean)                           | `false`        | When `enforce_limits` is `true`: if a modification would push the value outside the bounds, keep the old value instead of clamping.                                                                                                                                                                          |
| `min_action`     | Entity Action Type                            | _optional_     | Run on the entity whenever the value reaches `min`.                                                                                                                                                                                                                                                          |
| `max_action`     | Entity Action Type                            | _optional_     | Run on the entity whenever the value reaches `max`.                                                                                                                                                                                                                                                          |
| `persistent`     | [Boolean](/docs/datapack/data-types/boolean)                           | `true`         | When `true`, the value survives server restart (and survives the entity unloading/reloading). When `false`, the value resets to `start_value` whenever the entity rejoins the world. Useful for resources that semantically should reset, like daily-quest counters or cooldowns you want to clear on login. |

## Available variables in Expression fields

When `min`, `max`, or `start_value` are written as [Expression](/docs/datapack/data-types/expression) strings, the following variables are bound:

- `value`: The current value of this same resource (useful for limits that depend on the current stockpile, e.g. a max that grows as the resource accrues).
- `<namespace>:<path>`: Any other resource the entity has, referenced by its full power id. Resource ids with `:` and `/` are usable inside the Expression because mXparser allows arbitrary variable names when registered programmatically.
- `health`, `max_health`, `food`, `air`, `xp_level`, `xp_progress`: Common entity stats.
- `world_time`, `day_time`: Long ticks from the entity's level.

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

A resource whose ceiling is the value of another resource (composes cleanly without nesting):

```json
{
   "type":"apoli:resource",
   "min":0,
   "max":"example:mana_capacity",
   "start_value":0
}
```

## See also

- [apoli:cooldown](/docs/datapack/powers/cooldown) — internally a resource with `min = 0`, `max = cooldown`, auto-decrementing each tick.
- [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) — the canonical way to change a resource's value.
- [apoli:change_resource](/docs/datapack/entity-actions/change_resource) — legacy alias of Modify Resource; kept for old data packs.

