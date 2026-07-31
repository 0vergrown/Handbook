---
title: "Wings (Power Type)"
description: "Grants flapping wings with a stamina bar (needs the Icarus mod)."
navigation_title: "Wings"
---

Grants flapping wings with a stamina bar (needs the Icarus mod).

Type ID: `apoli:wings`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `wings_type` | WINGS_TYPE_CODEC | **required** |
| `armor_slows` | boolean | _optional_ |
| `max_slowed_multiplier` | number | _optional_ |
| `wings_speed` | number | _optional_ |
| `exhaustion_amount` | number | _optional_ |
| `max_height_above_world` | integer | _optional_ |
| `stamina` | number | _optional_ |

## Example

```json
{
  "type": "apoli:wings"
}
```
