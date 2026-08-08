---
title: "Force Swap (Entity Action Type)"
description: "Entity action — swaps the player to another origin from their swappable pool."
navigation_title: "Force Swap"
---

Swaps the player to another origin from their [swappable pool](/docs/datapack/origins/swapping), exactly as if they had pressed the swap key.

Type ID: `origins:force_swap` — an [entity action](/docs/datapack/entity-actions).

> **Needs the Origins mod.** Registered by Origins, not core Apoli. It only works on players, and only on the server.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `mode` | String — `linear`, `random` or `main` | `linear` | `linear` advances to the next option in order; `random` picks a different one at random; `main` returns to the main origin. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Which layer to swap on. Accepts either the target layer or the swappable layer itself. Defaults to the first layer that has a swappable pool. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Swap directly to this origin, ignoring `mode`. Does nothing if it is not in the player's pool. |
| `include_main` | [Boolean](/docs/datapack/data-types/boolean) | `true` | In `random` mode, whether the main origin is one of the possible results. |

Does nothing when the pool is empty.

## Examples

Scramble the player's origin on a timer:

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

Force them back to their own origin when a resource runs out:

```json
{
    "type": "origins:force_swap",
    "mode": "main"
}
```
