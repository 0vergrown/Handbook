---
title: "apoli:distance"
description: "Checks the distance between the target entity and the actor entity."
---

Checks the distance between the target entity and the actor entity.

Type ID: `apoli:distance`
## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | | Determines how the distance (in blocks) between the actor and target entities should be compared to the specified value.
`compare_to` | [Float](/docs/datapack/data-types/float) | | The value at which the distance (in blocks) between the actor and target entities will be compared to.


## Examples

```json
"bientity_condition": {
    "type": "apoli:distance",
    "comparison": "<=",
    "compare_to": 30
}
```
This example will check if the target entity is within 30 blocks radius relative from the actor entity.

