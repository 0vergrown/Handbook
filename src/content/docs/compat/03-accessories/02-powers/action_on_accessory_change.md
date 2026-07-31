---
title: "Action On Accessory Change (Power Type)"
description: "Runs an action when an accessory is equipped or unequipped."
navigation_title: "Action On Accessory Change"
aliases: ["action_on_trinket_change"]
---

Runs an action when an accessory is equipped or unequipped (alias `action_on_trinket_change`).

Type ID: `apoli:action_on_accessory_change`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `entity_action_on_equip` | entity action | _optional_ |
| `item_action_on_equip` | item action | _optional_ |
| `entity_action_on_unequip` | entity action | _optional_ |
| `item_action_on_unequip` | item action | _optional_ |
| `item_condition` | item condition | _optional_ |
| `slots` | list of slot | _optional_ |

## Example

```json
{
  "type": "apoli:action_on_accessory_change"
}
```
