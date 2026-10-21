---
title: "Swappable Layers"
description: "A pool of origins that can stand in for a player's main origin for a while, keeping its resources and cooldowns."
navigation_title: "Swapping"
---

A swappable layer isn't a layer the player chooses an origin in. It is a pool: a set of origins the player can wear in place of their main origin for a while, and swap back out of whenever they like.

The typical use is an origin that steals or copies powers. Your main origin stays what it is, the pool holds everything you have taken from other players, and you cycle through them.

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

That is the whole minimum. A swappable layer never appears in the choose flow or as a layer of its own on the view origin screen, and never holds an origin of its own. It only supplies the pool.

The long form says which layer it swaps:

```json
"swappable": {
    "target_layer": "origins:origin",
    "shift_returns_to_main": true,
    "wrap_to_main": true
}
```

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `target_layer` | [Identifier](/docs/datapack/data-types/identifier) | _the first enabled layer that isn't swappable, by `order`_ | The layer whose origin is replaced. |
| `shift_returns_to_main` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Holding shift while pressing the swap key jumps straight back to the main origin. |
| `wrap_to_main` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Cycling past the last option returns to the main origin instead of the first option. |

More than one swappable layer can target the same layer, and their pools are merged.

## Who is in the pool

The pool is the swappable layer's available origins, the ones whose [conditioned origin](/docs/datapack/origins/layers) groups currently pass, minus whatever the player already has as their main origin.

The server works out the conditions and sends the result to the player, so a group's condition can test anything the server knows: command tags, scoreboards, advancements, resources. The swap screen and the swap key follow it within half a second.

So you don't need a separate granting system. Gate each origin on a condition the pack controls, and the pool fills and empties by itself:

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

Set `example:stolen/acid` to 1 and Acid appears in the pool. Set it back to 0 and it disappears, and if the player was wearing it, they return to their main origin automatically within half a second. The same happens when the whole swappable layer closes: once no swappable layer aimed at the target offers the player anything, and their granted list for it is empty, they go back to their main origin.

Changing the main origin also ends the swap. Choosing, being auto-chosen, having a derived layer derive again, losing the origin and using an Orb of Origin all return the player to their new main origin first, so they can never be left wearing a pool origin on top of it.

### Filling the pool with Copy and Transfer Origin

Conditions can't express "whatever origin I just copied off that player", so a swappable layer also keeps a granted list for each player. When [`origins:copy_origin`](/docs/datapack/origins/copy_origin) or [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin) names a swappable layer as its `to_layer`, the origin is added to that list instead of being set as the layer's origin:

```json
{
    "type": "origins:copy_origin",
    "from_layer": "origins:origin",
    "to_layer": "example:stolen"
}
```

A swappable layer can therefore ship with an empty `origins` list and be filled entirely at run time, giving the player a pool they had no way to reach when they started. The granted list is saved with the player and survives death and relogging.

`/origin set <player> <swappable layer> <origin>` adds an origin to that player's granted list, and `/origin set <player> <swappable layer> origins:empty` clears the list. Origins removed from the list leave the pool immediately, and a player wearing one returns to their main origin.

The pool is the granted list plus the condition-driven origins, listed alphabetically by origin display name.

> [!NOTE]
> A swappable layer is a pool, never a choice, so it holds no origin of its own. Anything that would normally set a layer's origin (`/origin set`, `apply_stored_origin`, `copy_origin`, `transfer_origin`, [`origins:grant_origin`](/docs/datapack/origins/grant_origin)) adds to the granted list instead when the layer is swappable. The randomiser and `/origin random` skip swappable layers entirely, so use [`origins:force_swap`](/docs/datapack/origins/force_swap) with `"mode": "random"` to roll a pool.

## Swapping

There are three ways to swap:

- The swap key, `V` by default and rebindable in Controls. Each press moves to the next option, from the main origin through the first option to the last and back to the main origin, or from the last option back to the first with `wrap_to_main: false`. Pressing it with shift held returns to the main origin from anywhere, and with `shift_returns_to_main: false` it cycles like a plain press. The key still works when another mod uses the same key.
- The S button on the view origin screen, which opens a grid of the pool's icons. It only appears when the pool isn't empty.
- The [`origins:force_swap`](/docs/datapack/origins/force_swap) entity action, for packs that want to drive it from a power.

## What happens to the origin you swapped away from

It depends on whether you swapped away from your main origin or from a pool origin, and the difference matters.

Your main origin goes dormant. Its powers stop completely (no ticking, attributes, flags or activation) but aren't taken away. Resource values, cooldown counters and skill purchases are all kept exactly as they were and come back untouched as soon as you swap home.

A pool origin is revoked. When you move from one pool origin to another, or back to your main origin, the one you were wearing is removed outright, exactly as if the power had been revoked. Its resource values and cooldowns are discarded and start fresh the next time you swap into it.

A power both origins have stays awake. If your main origin and the pool origin you swap into both provide the same power, directly or through the same [`apoli:multiple`](/docs/datapack/powers/multiple), it isn't dormant, because the origin you are wearing still provides it. It keeps its resource values and cooldowns through the swap, and swapping home leaves it exactly where it was.

> [!NOTE]
> Pool origins have to be revoked instead of made dormant, because dormancy only stops a power running and doesn't undo anything the power set up when it was granted. If they stayed dormant, swapping from Smoke to Frost would leave you holding both. If a pool origin needs to remember something across swaps, keep that value on a power in your main origin, which does stay dormant.

Because dormant powers don't tick, a main origin cooldown that was partway through pauses while you are swapped away instead of counting down, and an [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) stops running until you swap back.

The view origin screen follows the swap. While you are wearing a pool origin, it lists that origin's powers instead of your main origin's, so a player can always read what they currently have.

## Reacting to a swap

[`origins:action_on_swap`](/docs/datapack/origins/action_on_swap) runs an entity action whenever the player swaps, optionally filtered by which origin they swapped from or to. [`origins:swapped`](/docs/datapack/origins/swapped) checks whether the player is currently wearing a pool origin.

## Filling and emptying a pool from data

A swappable layer can ship with an empty `origins` list and be filled entirely at run time. Four tools do it:

| Tool | Use it for |
| --- | --- |
| [`origins:grant_origin`](/docs/datapack/origins/grant_origin) | Giving a player one named origin, the direct "unlock this form" action. On a normal layer, `"to_pool": true` puts it in that layer's pool instead of replacing their pick. |
| [`origins:revoke_origin`](/docs/datapack/origins/revoke_origin) | Taking one back, or clearing the layer and the pool together. |
| [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin) | Moving one between two players. `selection` says which of the donor's origins to take (`main`, `active`, `pool` or `all`), and `origin` names one explicitly. |
| `/origin revoke <targets> <layer> [origin]` | The operator equivalent, paired with `/origin set`. |

To read a pool back, use the [`origins:origin`](/docs/datapack/origins/origin) condition with `"selection": "pool"`, or the `in_origin_pool(<id>)` [Expression](/docs/datapack/data-types/expression) function. `"selection": "active"` asks what the player is wearing right now, swapped in or not.
