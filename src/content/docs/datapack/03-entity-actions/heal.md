---
title: "Heal (Entity Action Type)"
description: "Restores a specified amount of health to the entity."
navigation_title: "Heal"
---

Restores a specified amount of health to the entity.

Type ID: `apoli:heal`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`amount` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) |  | The amount of health to restore.

## Examples

```json
"entity_action": {
    "type": "apoli:heal",
    "amount": 6
}
```

This example will restore about 3 hearts to the entity.
