---
title: "Cooldown (Power Type)"
description: "Provides a cooldown — a count-down timer that can be triggered, queried, and modified."
navigation_title: "Cooldown"
---

Provides a cooldown — a count-down timer that can be triggered, queried, and modified. Useful for power types that don't have a built-in cooldown, or as a simple recurring timer.

Type ID: `apoli:cooldown`

> A Cooldown is implemented as a thin specialization of the [apoli:resource](/docs/datapack/powers/resource) with `min = 0`, `max = cooldown`, and an automatic decrement of `1` each tick. This means **everything that works against a Resource also works against a Cooldown** — the Resource (Entity Condition Type), [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource), [apoli:change_resource](/docs/datapack/entity-actions/change_resource), and [apoli:trigger_cooldown](/docs/datapack/entity-actions/trigger_cooldown) all operate on the same underlying value.

## Why not a separate power type?

Apace's Apoli had `apoli:cooldown` and `apoli:resource` as parallel classes with mostly-duplicated logic, which is why nested cooldowns inside complex power packs got awkward. In this rewrite the two share their state machine — a Cooldown is just a Resource that ticks down — so any composition that works on a Resource works the same on a Cooldown.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `cooldown` | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | | The number of ticks the cooldown needs to recharge from `0` back to `cooldown`. Becomes the resource's `max`. |
| `hud_render` | [Hud Render](/docs/datapack/data-types/hud-render) | _hidden_ | Determines how the cooldown is visualized on the HUD. |
| `persistent` | [Boolean](/docs/datapack/data-types/boolean) | `true` | When `true`, the cooldown's remaining ticks survive server restart (so a player who used their ult and logged off doesn't get to reuse it on login). When `false`, the cooldown resets to ready (value `0`) whenever the entity rejoins the world. |

## Behaviour

- On power add, value starts at `0` — the cooldown is "ready". The value represents **remaining ticks until ready** (matches the semantics of Apace's `CooldownPower.getRemainingTicks`).
- [apoli:trigger_cooldown](/docs/datapack/entity-actions/trigger_cooldown) sets the value to `cooldown` (just triggered, max remaining).
- Each tick the value decrements by `1` until it reaches `0` (re-ready).
- The Resource (Entity Condition Type) can check `value == 0` (ready) or `value > 0` (cooling).
- [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) with `add 1` increases the remaining time by 1 tick — matches Apace's legacy behaviour exactly, so packs that ran `change_resource: { change: 1 }` on a cooldown still behave the same.

## Examples

A simple 10-second cooldown displayed on the HUD:

```json
{
    "type": "apoli:cooldown",
    "cooldown": 200,
    "hud_render": { "should_render": true, "bar_index": 3 }
}
```

A cooldown whose duration depends on the player's XP level (longer for higher-XP players):

```json
{
    "type": "apoli:cooldown",
    "cooldown": "100 + 10 * xp_level"
}
```
