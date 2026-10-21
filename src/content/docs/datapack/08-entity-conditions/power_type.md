---
title: "Power Type (Entity Condition Type)"
description: "Checks whether the entity has a power of a given power type."
navigation_title: "Power Type"
---

Checks whether the entity has a power that uses a given power type.

Type ID: `apoli:power_type`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power_type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the power type to look for among the entity's powers. |

## Examples

```json
"condition": {
    "type": "apoli:power_type",
    "power_type": "apoli:active_self"
}
```

This checks whether the entity has a power that uses the Active Self power type.
