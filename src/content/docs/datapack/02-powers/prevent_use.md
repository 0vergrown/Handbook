---
title: "apoli:prevent_use"
description: "Prevents the general use / right-click interaction."
---

Prevents the general use / right-click interaction.

Type ID: `apoli:prevent_use`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `bientity_action` | bientity action | _optional_ |
| `held_item_action` | item action | _optional_ |
| `result_item_action` | item action | _optional_ |
| `bientity_condition` | bientity condition | _optional_ |
| `item_condition` | item condition | _optional_ |
| `hands` | list of list | _optional_ |
| `result_stack` | item stack | _optional_ |
| `target_used` | boolean | `false` |

## Example

```json
{
  "type": "apoli:prevent_use"
}
```
