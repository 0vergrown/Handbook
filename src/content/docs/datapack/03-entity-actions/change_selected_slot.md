---
title: "Change Selected Slot (Entity Action Type)"
description: "Changes which hotbar slot the player is holding."
navigation_title: "Change Selected Slot"
aliases: ["set_selected_slot"]
---

Changes which hotbar slot the player is holding.

Type ID: `apoli:change_selected_slot`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `slot` | Integer | **required** | The hotbar slot to select — `0` is the far left, `8` the far right. Out-of-range values are clamped. With `relative: true` this is an offset instead. |
| `relative` | Boolean | `false` | Add `slot` to the current selection and wrap around, so `1` cycles right and `-1` cycles left. |

Does nothing for entities that are not players. The new selection is pushed to the client immediately, so the hotbar highlight and held-item model update on the same tick.

## Examples

```json
{
    "type": "apoli:change_selected_slot",
    "slot": 0
}
```

Forces the player back to the first hotbar slot.

```json
{
    "type": "apoli:change_selected_slot",
    "slot": 1,
    "relative": true
}
```

Cycles one slot to the right, wrapping from slot 8 back to slot 0.
