---
title: Meta-actions
description: Actions that run other actions — branch, combine, delay and repeat.
---

**Meta-actions** are the control flow of Apoli. They don't touch the world themselves; they orchestrate *other* actions. With them you can branch on a [condition](/docs/datapack/conditions/overview), run things in sequence, add randomness, or schedule work for later — all in JSON.

A meta-action is the same flavour as the actions it wraps. `apoli:and` for entity actions is an entity action; for bi-entity actions it's a bi-entity action. It slots into the same field.

## `apoli:and`

Run a list of actions, in order.

```json
{
  "type": "apoli:and",
  "actions": [
    { "type": "apoli:extinguish" },
    { "type": "apoli:heal", "amount": 2 },
    { "type": "apoli:play_sound", "sound": "minecraft:block.fire.extinguish" }
  ]
}
```

## `apoli:if_else`

Run one action if a condition passes, another if it doesn't.

```json
{
  "type": "apoli:if_else",
  "condition": { "type": "apoli:on_fire" },
  "if_action": { "type": "apoli:extinguish" },
  "else_action": { "type": "apoli:set_on_fire", "duration": 40 }
}
```

| Field | Type | Purpose |
| --- | --- | --- |
| `condition` | [condition](/docs/datapack/conditions/overview) | The test. |
| `if_action` | action | Runs when the condition passes. |
| `else_action` | action | Optional. Runs when it fails. |

## `apoli:if_else_list`

A chain of condition → action pairs. **Every** matching branch runs (it's not a switch — think a list of independent `if`s).

```json
{
  "type": "apoli:if_else_list",
  "actions": [
    { "condition": { "type": "apoli:in_rain" }, "action": { "type": "apoli:extinguish" } },
    { "condition": { "type": "apoli:sneaking" }, "action": { "type": "apoli:heal", "amount": 1 } }
  ]
}
```

## `apoli:chance`

Run an action with a probability.

```json
{
  "type": "apoli:chance",
  "chance": 0.25,
  "success_action": { "type": "apoli:apply_effect",
    "effect": { "effect": "minecraft:speed", "duration": 100 } }
}
```

## `apoli:choice`

Pick one action from a weighted list.

```json
{
  "type": "apoli:choice",
  "actions": [
    { "element": { "type": "apoli:heal", "amount": 4 }, "weight": 3 },
    { "element": { "type": "apoli:set_on_fire", "duration": 40 }, "weight": 1 }
  ]
}
```

## `apoli:delay`

Run an action after a number of ticks (20 ticks = 1 second).

```json
{
  "type": "apoli:delay",
  "ticks": 40,
  "action": { "type": "apoli:damage", "amount": 6 }
}
```

## `apoli:loop`

Run an action every tick for a while, or a set number of times — handy for a burst of particles or a channelled effect.

## `apoli:nothing`

Do nothing. Useful as an explicit "no-op" branch, or a placeholder while you build.

## See also

- [Entity actions](/docs/datapack/actions/entity-actions)
- [Conditions](/docs/datapack/conditions/overview) — including the `apoli:and` / `apoli:or` meta-*conditions*.
