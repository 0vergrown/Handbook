---
title: "Prevent Accessory Equip (Power Type)"
description: "Prevents equipping accessories (alias prevent_trinket_equip)."
navigation_title: "Prevent Accessory Equip"
aliases: ["prevent_trinket_equip"]
---

Prevents equipping accessories (alias `prevent_trinket_equip`).

Type ID: `apoli:prevent_accessory_equip`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `slots` | Array of Accessory Slot | `[]` | Which slots this applies to. Empty means every slot. |
| `item_condition` | Item Condition | _optional_ | Only apply to items that pass this condition. |
| `allow_in_creative` | Boolean | `true` | Let creative-mode players bypass the restriction. |

## Example

```json
{
  "type": "apoli:prevent_accessory_equip"
}
```
