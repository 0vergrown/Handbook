---
title: "Is Equippable (Item Condition Type)"
description: "Checks whether the item can be equipped, optionally in a given slot."
navigation_title: "Is Equippable"
aliases: ["equippable"]
---

Checks whether the item can be equipped, optionally in a given slot.

Type ID: `apoli:is_equippable`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `equipment_slot` | Equipment Slot | _optional_ | Checks whether the item can be equipped in this slot: `"head"`, `"chest"`, `"legs"`, `"feet"` or `"offhand"`. |

## Examples

```json
"item_condition": {
    "type": "apoli:is_equippable"
}
```

This checks whether the item can be equipped at all.

```json
"item_condition": {
    "type": "apoli:is_equippable",
    "equipment_slot": "chest"
}
```

This checks whether the item can be equipped in the chest slot.
