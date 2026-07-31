---
title: "Prevent Accessory Unequip (Power Type)"
description: "Prevents unequipping accessories (alias prevent_trinket_unequip)."
navigation_title: "Prevent Accessory Unequip"
aliases: ["prevent_trinket_unequip"]
---

Prevents unequipping accessories (alias `prevent_trinket_unequip`).

Type ID: `apoli:prevent_accessory_unequip`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `slots` | Array of Accessory Slot | `[]` | Which slots this applies to. Empty means every slot. |
| `item_condition` | Item Condition | _optional_ | Only apply to items that pass this condition. |
| `allow_in_creative` | Boolean | `true` | Let creative-mode players bypass the restriction. |

## Example

```json
{
  "type": "apoli:prevent_accessory_unequip"
}
```
