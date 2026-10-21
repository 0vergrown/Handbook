---
title: "Transfer Origin (Bi-Entity Action Type)"
description: "Moves or copies a whole origin between two players."
navigation_title: "Transfer Origin"
---

Moves or copies a whole origin between two players, the way [`apoli:transfer`](/docs/datapack/bientity-actions/transfer) moves powers by source. An origin is the set of powers granted from its layer, so this moves a player's pick on one layer onto another player's layer in a single action: take an origin from someone, give yours to them, or copy it across.

Type ID: `origins:transfer_origin`

> [!NOTE]
> This action comes from the Origins mod. Both the actor and the target must be players. If the donor has no origin in `from_layer`, nothing is transferred, but `actor_action` and `target_action` still run. A move never takes the origin from the donor unless the destination layer and origin resolve, so a wrong `to_layer` can't destroy an origin.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | [String](/docs/datapack/data-types/string) | `steal` | `steal` takes the target's origin for the actor, and `give` hands the actor's origin to the target. This decides which side is the donor and which is the recipient. |
| `copy` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `false`, the origin is moved and the donor loses it on `from_layer`. With `true`, it is copied and the donor keeps it, which is what [`origins:copy_origin`](/docs/datapack/origins/copy_origin) does. |
| `from_layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer the origin is read from on the donor. |
| `to_layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer the origin is written to on the recipient. Use a separate layer (such as `origins:copy`) to add the origin alongside the recipient's own, or the same layer to replace it. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Transfers exactly this origin instead of searching the donor's layer. It overrides `selection`. |
| `selection` | [Selection](/docs/datapack/data-types/selection) | _see below_ | Which of the donor's origins on `from_layer` to take: `main`, `active`, `pool` or `all`. |
| `random` | [Boolean](/docs/datapack/data-types/boolean) | `false` | When the selection gives more than one candidate, picks one at random instead of the first. |
| `actor_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the actor after the transfer, such as a sound or particles. |
| `target_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the target after the transfer. |

### Which origin gets moved

A player can hold several origins at once: one per layer, plus everything in a [swap pool](/docs/datapack/origins/swapping). `selection` says which of them the donor gives up.

| `selection` | What it reads on `from_layer` |
| --- | --- |
| `main` | The layer's chosen origin. This is the default for a normal layer. |
| `active` | Whatever is in play there: the swapped-in origin if the player is swapped, otherwise the chosen one. |
| `pool` | The origins granted into that layer's swap pool. This is the default when `from_layer` is a swappable layer. |
| `all` | The chosen origin and the whole pool, all of which are transferred. |

With more than one candidate, the first is taken. Set `"random": true` to pick one at random instead. `origin` overrides the whole search: when it names an origin, that origin moves, wherever the donor keeps it.

On a move (`copy: false`), the donor loses the origin from wherever it came from, either the layer's pick or that entry in the pool.

Giving an origin to a swappable layer adds it to the recipient's pool instead of replacing their origin, so `to_layer` decides whether this is a replacement or a new option in their swap menu.

## How it works

An origin choice is stored as a layer and its origin, plus the powers granted with that layer's source (`layer/<path>`). `transfer_origin`:

1. Works out which of the donor's origins to move (see above).
2. Reconciles the recipient's `to_layer` to that origin, using the same power grant path as a normal choice.
3. Copies the donor's resource values for that origin's powers onto the recipient, so a half-spent resource bar, a cooldown or a toggle arrives in the state the donor had it in instead of at its starting value. Powers the recipient already held keep their own values only if the donor doesn't have that power. Stored `apoli:inventory` contents are never copied, because that would duplicate items.
4. On a move (`copy: false`), removes the origin from the donor, clearing the layer if it was the layer's pick or revoking that pool entry if it came from a swap pool.
5. Syncs both players so their view origin screens update.

Removing an origin can close off a dependent layer, such as a copy layer conditioned on holding it, and those layers are revalidated automatically on both sides.

## Related actions

- [`origins:copy_origin`](/docs/datapack/origins/copy_origin) is the `copy: true`, `to_layer: origins:copy` special case, which reads better when copying is all you need.
- [`apoli:transfer`](/docs/datapack/bientity-actions/transfer) moves single powers by source and knows nothing about layers. Use it for control over single powers, and use `transfer_origin` to work with whole origins while keeping each layer's record of its origin correct for the screens, badges and gated layers.

## Examples

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

This takes the target's main origin for yourself and plays a teleport sound. The target is left without an origin on `origins:origin` until they pick again.

```json
{
    "type": "origins:transfer_origin",
    "mode": "steal",
    "copy": false,
    "from_layer": "origins:origin",
    "to_layer": "origins:copy"
}
```

This takes the target's origin but puts it on your copy layer, so you keep your own origin and they lose theirs.

```json
{
    "type": "origins:transfer_origin",
    "mode": "give",
    "copy": false
}
```

This gives your own origin to the target for good, and you lose it.

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

This takes one random origin from the target's swap pool and adds it to yours.

```json
{
    "type": "origins:transfer_origin",
    "mode": "give",
    "copy": true,
    "origin": "origins:phantom",
    "to_layer": "origins:swap/origin"
}
```

This gives the target `origins:phantom` as an extra swap option, and you keep your own origin.
