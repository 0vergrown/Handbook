---
title: "Transfer Origin (Bi-Entity Action Type)"
description: "Bi-entity action — moves (or copies) a whole origin between two players."
navigation_title: "Transfer Origin"
---

Moves (or copies) a **whole origin** between two players, the way [`apoli:transfer`](/docs/datapack/bientity-actions/transfer) moves powers by source. Because an origin is just the set of powers granted from its layer, this re-homes a player's pick on one layer onto another player's layer in a single action — steal an origin off someone, hand yours to them, or copy it across.

Type ID: `origins:transfer_origin` — a [bi-entity action](/docs/datapack/bientity-actions).

> **Needs the Origins mod.** Registered by Origins, not core Apoli. **Both** the actor and target must be players. If the donor has no origin in `from_layer`, nothing is transferred — but the `actor_action` / `target_action` follow-ups still run. A move never strips the donor unless the destination layer/origin resolves, so a bad `to_layer` can't destroy an origin.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`mode` | [String](/docs/datapack/data-types/string) | `steal` | `steal` takes the **target's** origin onto the **actor**; `give` hands the **actor's** origin to the **target**. (Determines which side is the donor and which is the recipient.)
`copy` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `false`, the origin is **moved** — the donor loses it on `from_layer` entirely. If `true`, it is **copied** (the donor keeps it); this is exactly what [`origins:copy_origin`](/docs/datapack/origins/copy_origin) does.
`from_layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer the origin is read from on the **donor**.
`to_layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer the origin is written to on the **recipient**. Use a dedicated layer (e.g. `origins:copy`) to add the origin alongside the recipient's own, or the same layer to replace it.
`origin` | [Identifier](/docs/datapack/data-types/identifier) | *optional* | Transfer exactly this origin instead of searching the donor's layer. Overrides `selection`.
`selection` | [String](/docs/datapack/data-types/string) | see below | Which of the donor's origins on `from_layer` to take: `main`, `active`, `pool` or `all`.
`random` | [Boolean](/docs/datapack/data-types/boolean) | `false` | When the selection yields more than one candidate, pick one at random rather than the first.
`actor_action` | Entity Action | *optional* | Action run on the actor after the transfer (e.g. a sound or particle).
`target_action` | Entity Action | *optional* | Action run on the target after the transfer.

### Which origin gets moved

A player can hold several origins at once — one per layer, plus everything sitting in a [swap pool](/docs/datapack/origins/swapping). `selection` says which of them the donor gives up.

| `selection` | What it reads on `from_layer` |
| --- | --- |
| `main` | the layer's chosen origin. **Default for a normal layer.** |
| `active` | whatever is currently in play there — the swapped-in origin if the player is swapped, otherwise the chosen one. |
| `pool` | the origins granted into that layer's swap pool. **Default when `from_layer` is a swappable layer.** |
| `all` | the chosen origin *and* the whole pool — every one of them is transferred. |

With more than one candidate, the first is taken; set `"random": true` to pick one at random instead. `origin` overrides the whole search: name an origin explicitly and that is what moves, no matter where the donor keeps it.

On a **move** (`copy: false`) the donor loses the origin from wherever it actually came from — the layer's pick, or that entry in the pool.

Handing an origin **to** a swappable layer adds it to the recipient's pool rather than replacing their origin, so `to_layer` decides whether this is a replacement or a new option in their swap menu.

## How it works

An origin choice is stored as `layer → origin` plus the powers granted under that layer's source (`layer/<path>`). `transfer_origin`:

1. Resolves which of the donor's origins to move (see above).
2. Reconciles the recipient's `to_layer` to that origin (the same power-grant path a normal choose uses — resources start fresh, `apoli:inventory` contents aren't disturbed).
3. On a **move** (`copy: false`), removes it from the donor — clearing the layer if it was the layer's pick, or revoking that pool entry if it came from a swap pool.
4. Broadcasts both players so the view-origin GUIs re-sync.

Removing an origin can gate off a dependent layer (e.g. a `copy`/one-for-all layer conditioned on holding it); those are revalidated automatically on both sides.

## Relationship to other actions

- [`origins:copy_origin`](/docs/datapack/origins/copy_origin) is the `copy: true`, `to_layer: origins:copy` special case — kept for back-compat and readability.
- [`apoli:transfer`](/docs/datapack/bientity-actions/transfer) is the layer-agnostic primitive that moves powers by source. Use it when you want power-level control; use `transfer_origin` when you want to think in whole origins and keep the `layer → origin` bookkeeping (GUI, badges, One-For-All gating) correct.

## Examples

Steal the target's main origin onto yourself, taking it away from them (they're left originless on `origins:origin` until they re-pick):

```json
{
    "type": "origins:transfer_origin",
    "mode": "steal",
    "copy": false,
    "from_layer": "origins:origin",
    "to_layer": "origins:origin",
    "actor_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:entity.enderman.teleport"
    }
}
```

Steal the target's origin but park it on your **copy** layer (you keep your own origin; they lose theirs):

```json
{
    "type": "origins:transfer_origin",
    "mode": "steal",
    "copy": false,
    "from_layer": "origins:origin",
    "to_layer": "origins:copy"
}
```

Give your own origin to the target as a permanent gift, losing it yourself:

```json
{
    "type": "origins:transfer_origin",
    "mode": "give",
    "copy": false
}
```

Take one random origin out of the target's swap pool and add it to yours:

```json
{
    "type": "origins:transfer_origin",
    "mode": "steal",
    "from_layer": "origins:swap/origin",
    "to_layer": "origins:swap/origin",
    "selection": "pool",
    "random": true
}
```

Give the target one specific origin as an extra swap option, keeping your own:

```json
{
    "type": "origins:transfer_origin",
    "mode": "give",
    "copy": true,
    "origin": "origins:phantom",
    "to_layer": "origins:swap/origin"
}
```
