---
title: "And (Meta Condition Type)"
description: "Checks whether all of the provided conditions are fulfilled."
navigation_title: "And"
---

Checks whether all of the provided conditions are fulfilled.

Type ID: `apoli:and`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`conditions` | [Array](/docs/datapack/data-types/array) of Condition Types | | All of these condition types have to be fulfilled in order for this condition to be fulfilled.

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

This example will check if it is both daytime, and the entity is invisible.
