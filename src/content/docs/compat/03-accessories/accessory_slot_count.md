---
title: "apoli:accessory_slot_count"
description: "Counts the entity's accessory slots (alias trinket_slot_count)."
---

Counts the entity's accessory slots (alias `trinket_slot_count`).

Type ID: `apoli:accessory_slot_count`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `comparison` | comparison | **required** |
| `compare_to` | integer | **required** |
| `slots` | list of slot | _optional_ |

## Example

```json
{
  "type": "apoli:accessory_slot_count"
}
```
