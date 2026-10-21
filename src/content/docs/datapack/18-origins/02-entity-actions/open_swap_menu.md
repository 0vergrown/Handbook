---
title: "Open Swap Menu (Entity Action Type)"
description: "Opens the swap picker screen for the player."
navigation_title: "Open Swap Menu"
---

Opens the swap picker, the Origins window with a grid of the player's [swappable pool](/docs/datapack/origins/swapping) and their main origin in the first slot.

Type ID: `origins:open_swap_menu`

> [!NOTE]
> This action comes from the Origins mod. It only works on players, and only on the server.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The layer to show the pool for, either the target layer or the swappable layer itself. Defaults to the first layer that has a swappable pool. |

## Example

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

This power opens the picker on a key press, instead of cycling through the pool with the swap key.
