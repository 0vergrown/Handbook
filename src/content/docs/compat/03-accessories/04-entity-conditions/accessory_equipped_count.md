---
title: "Accessory Equipped Count (Entity Condition Type)"
description: "Counts the entity's equipped accessories (alias equipped_trinket_count)."
navigation_title: "Accessory Equipped Count"
aliases: ["equipped_trinket_count"]
---

Counts the entity's equipped accessories (alias `equipped_trinket_count`).

Type ID: `apoli:accessory_equipped_count`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `comparison` | comparison | **required** |
| `compare_to` | integer | **required** |
| `slots` | list of slot | _optional_ |

## Example

```json
{
  "type": "apoli:accessory_equipped_count"
}
```
