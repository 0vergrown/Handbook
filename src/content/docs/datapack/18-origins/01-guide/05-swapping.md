---
title: "Swappable Layers"
description: "A pool of origins that can temporarily stand in for a player's main origin, without losing its resources or cooldowns."
navigation_title: "Swapping"
---

A **swappable layer** is not a layer a player chooses an origin in. It is a *pool*: a set of origins the player can temporarily wear in place of their main origin, and swap back out of at will.

The classic use is a stolen- or copied-power origin. Your main origin stays what it is; the pool holds everything you have taken from other players, and you cycle through them.

## Marking a layer swappable

```json
{
  "order": 10,
  "swappable": true,
  "origins": [
    "example:acid",
    "example:brainwash",
    "example:dark_shadow"
  ]
}
```

That is the whole minimum. A swappable layer never appears in the choose flow, never appears on the view-origin screen as a layer of its own, and never holds an origin of its own — it only supplies the pool.

The long form lets you say which layer it swaps:

```json
"swappable": {
    "target_layer": "origins:origin",
    "shift_returns_to_main": true,
    "wrap_to_main": true
}
```

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `target_layer` | [Identifier](/docs/datapack/data-types/identifier) | first enabled non-swappable layer, by `order` | The layer whose origin gets replaced. |
| `shift_returns_to_main` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Holding shift while pressing the swap key jumps straight back to the main origin. |
| `wrap_to_main` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Cycling past the last option returns to the main origin rather than to the first option. |

More than one swappable layer may target the same layer; their pools are merged.

## Who is in the pool

The pool is the swappable layer's **available** origins — the ones whose [conditioned origin](/docs/datapack/origins/layers) groups currently pass — minus whatever the player already has as their main origin.

This means you do not need a separate "granting" system. Gate each origin on a condition the pack controls, and the pool fills and empties by itself:

```json
{
  "swappable": true,
  "origins": [
    {
      "condition": {
        "type": "apoli:resource",
        "resource": "example:stolen/acid",
        "comparison": ">=",
        "compare_to": 1
      },
      "origins": [
        "example:acid"
      ]
    }
  ]
}
```

Set `example:stolen/acid` to 1 and Acid appears in the pool; set it back to 0 and it disappears — and if the player was wearing it, they are returned to their main origin automatically. The same happens if the whole swappable layer closes: once no swappable layer aimed at the target offers the player anything, and they have nothing in their granted list for it either, they go back to their main origin.

Changing the main origin also ends the swap. Choosing, being auto-chosen, having a derived layer re-derive, losing the origin, and using an Orb of Origin all return the player to their (new) main origin first, so they can never be left wearing a pool origin on top of one.

### Filling the pool with Copy and Transfer Origin

Conditions can't express "whatever origin I just copied off that player", so a swappable layer also has a **granted list** stored per player. When [`origins:copy_origin`](/docs/datapack/origins/copy_origin) or [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin) names a swappable layer as its `to_layer`, the origin is added to that list instead of being set as the layer's origin:

```json
{
    "type": "origins:copy_origin",
    "from_layer": "origins:origin",
    "to_layer": "example:stolen"
}
```

This means a swappable layer can ship with an **empty** `origins` list and be filled entirely at runtime — the player ends up with a pool they had no way to reach when they started. The granted list is saved with the player and survives death and relogging.

`/origin set <player> <swappable layer> <origin>` adds an origin to that player's granted list, and `/origin set <player> <swappable layer> origins:empty` clears the list. Origins removed from the list are dropped from the pool immediately, and a player wearing one is returned to their main origin.

The pool is the granted list plus the condition-driven origins, listed in alphabetical order by origin display name.

> A swappable layer is a pool, never a choice, so it holds no origin of its own. Anything that would normally *set* a layer's origin — `/origin set`, `apply_stored_origin`, `copy_origin`, `transfer_origin`, [`origins:grant_origin`](/docs/datapack/origins/grant_origin) — adds to the granted list instead when the layer is swappable. The randomiser and `/origin random` skip swappable layers entirely; use [`origins:force_swap`](/docs/datapack/origins/force_swap) with `"mode": "random"` to roll a pool.

## Swapping

Three ways in:

- The **swap key** (default `V`, rebindable in Controls). Each press moves to the next option: `Main → first → … → last → Main`. Shift-press returns to the main origin from anywhere.
- The **S button** on the view-origin screen, which opens a grid of the pool's icons. It only appears when the pool is non-empty.
- The [`origins:force_swap`](/docs/datapack/origins/force_swap) entity action, for packs that want to drive it from a power.

## What happens to the origin you swapped away from

It depends on whether you swapped away from your **main** origin or from a **pool** origin, and the difference matters.

**Your main origin goes dormant.** Its powers stop completely — no ticking, no attributes, no flags, no activation — but they are **not** taken away. Resource values, cooldown counters and skill purchases are all preserved exactly as they were, and come back untouched the moment you swap home.

**A pool origin is revoked.** When you move from one pool origin to another, or back to your main, the one you were wearing is removed outright, exactly as if the power had been revoked — its resource values and cooldowns are discarded and start fresh next time you swap into it.

**A power both origins have stays awake.** If your main origin and the pool origin you swap into both provide the same power — directly, or through the same [`apoli:multiple`](/docs/datapack/powers/multiple) — it is not dormant, because the origin you are wearing is still providing it. It keeps its resource values and cooldowns straight through the swap, and swapping home leaves it exactly where it was.

> Pool origins have to be revoked rather than made dormant, because dormancy only stops a power *running*: it does not undo anything the power installed when it was granted. Leaving them dormant meant swapping Smoke → Frost left you holding both. If you need a pool origin to remember something across swaps, keep that value on a power in your **main** origin, which does stay dormant.

Because dormant powers do not tick, a main-origin cooldown that was part-way through **pauses** while you are swapped away rather than continuing to count down, and an [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) stops firing until you swap back.

The view-origin screen follows the swap: while you are wearing a pool origin, that screen lists **its** powers, not your main origin's, so a player can always read what they currently have.

## Reacting to a swap

[`origins:action_on_swap`](/docs/datapack/origins/action_on_swap) runs an entity action whenever the player swaps, optionally filtered by which origin they swapped from or to. [`origins:swapped`](/docs/datapack/origins/swapped) tests whether the player is currently wearing a pool origin.

## Filling and emptying a pool from data

A swappable layer can ship with an empty `origins` list and be filled entirely at run time. Four ways in:

| Tool | Use it for |
| --- | --- |
| [`origins:grant_origin`](/docs/datapack/origins/grant_origin) | handing a player one named origin — the direct "unlock this form" action. On a normal layer, `"to_pool": true` puts it in that layer's pool instead of replacing their pick. |
| [`origins:revoke_origin`](/docs/datapack/origins/revoke_origin) | taking one back, or wiping the layer and pool together |
| [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin) | moving one between two players. `selection` says which of the donor's origins to take — `main`, `active`, `pool` or `all` — and `origin` names one explicitly. |
| `/origin revoke <targets> <layer> [origin]` | the operator-side equivalent, paired with `/origin set` |

Reading a pool back is the [`origins:origin`](/docs/datapack/origins/origin) condition with `"selection": "pool"`, or the `in_origin_pool(<id>)` [Expression](/docs/datapack/data-types/expression) function. `"selection": "active"` asks what the player is actually wearing right now, swapped in or not.
