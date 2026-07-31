---
title: "Gain Air (Entity Action Type)"
description: "Restores breath (bubbles!) to a living entity."
navigation_title: "Gain Air"
---

Restores breath (bubbles!) to a living entity.

Type ID: `apoli:gain_air`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`value` | Integer or [Expression](/docs/datapack/data-types/expression) |  | The amount of breath to restore.

## Examples

```json
"entity_action": {
    "type": "apoli:gain_air",
    "value": 20
}
```

This example will restore about 1 second of breath to the entity.
