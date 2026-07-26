---
title: "Is Equippable"
description: "Checks if the item is equippable."
---

Checks if the item is equippable.

Type ID: `apoli:is_equippable`


## Fields

Field | Type | Default | Description
------|------|---------|------------
equipment_slot | Equipment Slot (Data Type) | *optional* | If specified, checks if the item is equippable in the specified equipment slot. Accepts `"head"`, `"chest"`, `"legs"`, `"feet"`, or `"offhand"`.


## Examples

```json
"item_condition": {
    "type": "apoli:is_equippable"
}
```

This example will check if the item is generally equippable.

```json
"item_condition": {
    "type": "apoli:is_equippable",
    "equipment_slot": "chest"
}
```

This example will check if the item can be equipped in the chest equipment slot.

