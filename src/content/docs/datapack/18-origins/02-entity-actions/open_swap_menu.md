---
title: "Open Swap Menu (Entity Action Type)"
description: "Entity action — opens the swap picker screen for the player."
navigation_title: "Open Swap Menu"
---

Opens the swap picker — the Origins window showing a grid of the player's [swappable pool](/docs/datapack/origins/swapping), with their main origin in the first slot.

Type ID: `origins:open_swap_menu` — an [entity action](/docs/datapack/entity-actions).

> **Needs the Origins mod.** Registered by Origins, not core Apoli. It only works on players, and only on the server.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Which layer to show the pool for. Accepts either the target layer or the swappable layer itself. Defaults to the first layer that has a swappable pool. |

## Examples

Bind the picker to a key instead of cycling with it:

```json
{
  "type": "apoli:action_on_key_press",
  "key": {
    "key": "key.origins.primary_active"
  },
  "entity_action": {
    "type": "origins:open_swap_menu"
  }
}
```
