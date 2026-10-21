---
title: "Or (Meta Condition Type)"
description: "Checks whether at least one condition in a list passes."
navigation_title: "Or"
---

Checks whether at least one condition in a list passes.

Type ID: `apoli:or`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `conditions` | [Array](/docs/datapack/data-types/array) of condition types | _required_ | At least one of these conditions must pass for this one to pass. |

## Examples

```json
"condition": {
    "type": "apoli:or",
    "conditions": [
        {
            "type": "apoli:status_effect",
            "effect": "minecraft:poison"
        },
        {    
            "type": "apoli:status_effect",
            "effect": "minecraft:wither"
        }
    ]
}
```

This checks whether the entity has Poison or Wither.
