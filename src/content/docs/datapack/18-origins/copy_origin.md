---
title: "origins:copy_origin"
description: "Bi-entity action — copies the target's chosen origin onto the actor's copy layer."
---

Copies the **target's** chosen origin onto the **actor's** copy layer. Because an origin is just a set of powers granted from its layer as source, this reconciles the actor's `to_layer` to the copied origin's powers in one action — replacing the old approach of scripting a `/origin set` command per possible origin.

This is the copy-only convenience over [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin): it delegates to the same origin-transfer core (which mirrors how [`apoli:transfer`](/docs/datapack/bientity-actions/transfer) moves powers by source) with `mode: steal`, `copy: true`. Reach for `transfer_origin` when you also want to **take** the origin away from the target, or hand yours to them.

Type ID: `origins:copy_origin` — a [bi-entity action](/docs/datapack/bientity-actions).

> **Needs the Origins mod.** Registered by Origins, not core Apoli. Both the actor and the target must be players. If the target has no origin (or it's the "blank"/empty one) in `from_layer`, nothing happens.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`from_layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer whose origin is read from the **target**.
`to_layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:copy` | The layer set on the **actor** to the copied origin. Its powers are granted from this layer's source, so clearing the actor's `to_layer` (e.g. `/origin set @s origins:copy <blank>`) removes them again — the basis for a temporary copy.

## Notes

- The actor's `to_layer` must exist as a real origin layer. The copied origin is applied even if the layer doesn't formally list it, so a dedicated "copy" layer needs no per-origin enumeration.
- Only the origin's power **grants** are copied (via the layer reconcile), not live resource/cooldown values — the actor's copy starts fresh.
- To make the copy temporary, drive a resource timer whose `min_action` clears `to_layer` back to your blank origin.

## Example

Used inside an `action_on_entity_use` so sneaking + using a player copies their main-layer origin onto your copy layer:

```json
{
  "type": "apoli:action_on_entity_use",
  "bientity_action": {
    "type": "apoli:and",
    "actions": [
      {
        "type": "origins:copy_origin",
        "from_layer": "origins:origin",
        "to_layer": "origins:copy"
      },
      {
        "type": "apoli:actor_action",
        "action": {
          "type": "apoli:play_sound",
          "sound": "minecraft:block.amethyst_cluster.break"
        }
      }
    ]
  }
}
```

## See also

- [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin) — the full steal/give/copy origin action; `copy_origin` is its `copy: true` shorthand.
- [`apoli:transfer`](/docs/datapack/bientity-actions/transfer) — the lower-level, layer-agnostic power move/copy action. `copy_origin` is the Origins-aware convenience built on the same source system.
- [Layers](/docs/datapack/origins/layers) — setting up the dedicated copy layer this writes to.

