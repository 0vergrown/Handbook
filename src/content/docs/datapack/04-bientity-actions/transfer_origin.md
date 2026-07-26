---
title: "origins:transfer_origin"
description: "Moves (or copies) a whole origin between two players, the way [apoli:transfer](Transfer%20%28Bi-entity%20Action%20Type%29.md) moves powers by source."
---

Moves (or copies) a **whole origin** between two players, the way [`apoli:transfer`](/docs/datapack/bientity-actions/transfer) moves powers by source. Because an origin is just the set of powers granted from its layer, this re-homes a player's pick on one layer onto another player's layer in a single action — steal an origin off someone, hand yours to them, or copy it across.

Type ID: `origins:transfer_origin`

> This is an Origins addon action (not core Apoli). **Both** the actor and target must be players. If the donor has no origin in `from_layer`, nothing is transferred — but the `actor_action` / `target_action` follow-ups still run. A move never strips the donor unless the destination layer/origin resolves, so a bad `to_layer` can't destroy an origin.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`mode` | [String](/docs/datapack/data-types/string) | `steal` | `steal` takes the **target's** origin onto the **actor**; `give` hands the **actor's** origin to the **target**. (Determines which side is the donor and which is the recipient.)
`copy` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `false`, the origin is **moved** — the donor loses it on `from_layer` entirely. If `true`, it is **copied** (the donor keeps it); this is exactly what [`origins:copy_origin`](/docs/datapack/bientity-actions/copy_origin) does.
`from_layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer the origin is read from on the **donor**.
`to_layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer the origin is written to on the **recipient**. Use a dedicated layer (e.g. `origins:copy`) to add the origin alongside the recipient's own, or the same layer to replace it.
`actor_action` | Entity Action | *optional* | Action run on the actor after the transfer (e.g. a sound or particle).
`target_action` | Entity Action | *optional* | Action run on the target after the transfer.

## How it works

An origin choice is stored as `layer → origin` plus the powers granted under that layer's source (`layer/<path>`). `transfer_origin`:

1. Reads the donor's origin on `from_layer`.
2. Reconciles the recipient's `to_layer` to that origin (the same power-grant path a normal choose uses — resources start fresh, `apoli:inventory` contents aren't disturbed).
3. On a **move** (`copy: false`), strips the donor's `from_layer` — its powers and its pick both go.
4. Broadcasts both players so the view-origin GUIs re-sync.

Removing an origin can gate off a dependent layer (e.g. a `copy`/one-for-all layer conditioned on holding it); those are revalidated automatically on both sides.

## Relationship to other actions

- [`origins:copy_origin`](/docs/datapack/bientity-actions/copy_origin) is the `copy: true`, `to_layer: origins:copy` special case — kept for back-compat and readability.
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
        "type": "origins:play_sound",
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

