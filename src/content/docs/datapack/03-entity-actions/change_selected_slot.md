---
title: "Change Selected Slot (Entity Action Type)"
description: "Changes which hotbar slot the player is holding."
navigation_title: "Change Selected Slot"
aliases: ["set_selected_slot"]
---

Changes which hotbar slot the player is holding.

Type ID: `apoli:change_selected_slot`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` | [Integer](/docs/datapack/data-types/integer) | _required_ | The hotbar slot to select, from `0` on the far left to `8` on the far right. Values outside that range are clamped. With `relative: true` this is an offset instead. |
| `relative` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Adds `slot` to the current selection and wraps around, so `1` cycles right and `-1` cycles left. |

It does nothing for entities that aren't players. The new selection is sent to the client straight away, so the hotbar highlight and the held item model update on the same tick.

## Examples

```json
{
    "type": "apoli:change_selected_slot",
    "slot": 0
}
```

This puts the player back on the first hotbar slot.

```json
{
    "type": "apoli:change_selected_slot",
    "slot": 1,
    "relative": true
}
```

This cycles one slot to the right, wrapping from slot 8 back to slot 0.
