---
title: "origins:gain_air"
description: "[Entity Action Type](../entityactiontypes.md)"
---

Entity Action Type

Restores breath (bubbles!) to a living entity.

Type ID: `origins:gain_air`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`value` | Integer or [Expression](/docs/datapack/data-types/expression) |  | The amount of breath to restore.


## Examples

```json
"entity_action": {
    "type": "origins:gain_air",
    "value": 20
}
```

This example will restore about 1 second of breath to the entity.

