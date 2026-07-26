---
title: "apoli:modify_accessory"
description: "Acts on the entity's equipped accessories (alias modify_trinket)."
---

Acts on the entity's equipped accessories (alias `modify_trinket`).

Type ID: `apoli:modify_accessory`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `slots` | list of slot | _optional_ |
| `item_condition` | item condition | _optional_ |
| `item_action` | item action | _optional_ |
| `entity_action` | entity action | _optional_ |
| `limit` | integer | `0` |
| `unequip` | boolean | `false` |

## Example

```json
{
  "type": "apoli:modify_accessory"
}
```
