---
title: "Force Swap (Entity Action Type)"
description: "Swaps the player to another origin from their swap pool."
navigation_title: "Force Swap"
---

Swaps the player to another origin from their [swappable pool](/docs/datapack/origins/swapping), exactly as if they had pressed the swap key.

Type ID: `origins:force_swap`

> [!NOTE]
> This action comes from the Origins mod. It only works on players, and only on the server.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | [String](/docs/datapack/data-types/string) | `linear` | `linear` moves to the next option in order, wrapping the way the layer's `wrap_to_main` says. `random` picks a different option at random, and `main` returns to the main origin. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The layer to swap on, either the target layer or the swappable layer itself. Defaults to the first layer that has a swappable pool. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Swaps straight to this origin, ignoring `mode`. Does nothing if it isn't in the player's pool. |
| `include_main` | [Boolean](/docs/datapack/data-types/boolean) | `true` | In `random` mode, whether the main origin is one of the possible results. |

The action does nothing when the pool is empty.

## Examples

```json
{
    "type": "apoli:action_over_time",
    "interval": 600,
    "entity_action": {
        "type": "origins:force_swap",
        "mode": "random"
    }
}
```

This power swaps the player to a random origin from their pool every 600 ticks (30 seconds).

```json
{
    "type": "origins:force_swap",
    "mode": "main"
}
```

This action sends the player back to their own origin, for example when a resource runs out.
