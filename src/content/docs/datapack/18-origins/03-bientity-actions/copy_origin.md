---
title: "Copy Origin (Bi-Entity Action Type)"
description: "Copies the target's chosen origin onto the actor's copy layer."
navigation_title: "Copy Origin"
---

Copies the target's chosen origin onto the actor's copy layer. An origin is a set of powers granted with its layer as the source, so this reconciles the actor's `to_layer` to the copied origin's powers in one action, with no `/origin set` command needed for every possible origin.

It is the copy-only shortcut for [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin). It runs the same transfer code, which mirrors how [`apoli:transfer`](/docs/datapack/bientity-actions/transfer) moves powers by source, with `mode: steal` and `copy: true`. Use `transfer_origin` when you also want to take the origin away from the target, or give yours to them.

Type ID: `origins:copy_origin`

> [!NOTE]
> This action comes from the Origins mod. Both the actor and the target must be players. If the target has no origin in `from_layer`, or has the empty one, nothing happens.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `from_layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer whose origin is read from the target. |
| `to_layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:copy` | The layer on the actor that is set to the copied origin. Its powers are granted with this layer as the source, so clearing the actor's `to_layer` (for example with `/origin set @s origins:copy origins:empty`) removes them again, which is the basis for a temporary copy. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Copies exactly this origin. |
| `selection` | [Selection](/docs/datapack/data-types/selection) | _see below_ | Which of the target's origins on `from_layer` to read: `main`, `active`, `pool` or `all`. |

## Notes

- The actor's `to_layer` must exist as a real origin layer. The copied origin is applied even if that layer doesn't list it, so a dedicated copy layer doesn't need to list every origin.
- To make the copy temporary, run a resource timer whose `min_action` clears `to_layer` back to `origins:empty`.

## Example

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

With this power, using another player copies their main layer origin onto your copy layer and plays an amethyst sound.

## Picking which origin to copy

Like [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin), this action takes `origin`, which copies exactly that origin, and a [`selection`](/docs/datapack/data-types/selection) that says which of the target's origins on `from_layer` to read (`main`, `active`, `pool` or `all`). Without either, it reads the target's chosen origin on `from_layer`, or that layer's swap pool when `from_layer` is itself swappable.

The copy brings the target's resource values with it, so a resource bar, cooldown or toggle arrives at the value the target has instead of its starting value. Stored `apoli:inventory` contents stay behind, since copying them would duplicate items.
