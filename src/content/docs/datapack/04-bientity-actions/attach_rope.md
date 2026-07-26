---
title: "apoli:attach_rope"
description: "Attaches a rope between the actor and the target."
---

Attaches a rope between the actor and the target.

Type ID: `apoli:attach_rope`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `from` | RopeEndpointSource | _optional_ |
| `to` | RopeEndpointSource | _optional_ |
| `slot` | string | _optional_ |
| `texture` | identifier | _optional_ |
| `toggle` | boolean | `true` |

## Example

```json
{
  "type": "apoli:attach_rope"
}
```
