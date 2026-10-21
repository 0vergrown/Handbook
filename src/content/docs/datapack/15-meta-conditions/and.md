---
title: "And (Meta Condition Type)"
description: "Checks whether every condition in a list passes."
navigation_title: "And"
---

Checks whether every condition in a list passes.

Type ID: `apoli:and`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `conditions` | [Array](/docs/datapack/data-types/array) of condition types | _required_ | All of these conditions must pass for this one to pass. |

## Examples

```json
"condition": {
    "type": "apoli:and",
    "conditions": [
        {
            "type": "apoli:sneaking"
        },
        {      
            "type": "apoli:invisible"
        }
    ]
}
```

This checks whether the entity is both sneaking and invisible.
