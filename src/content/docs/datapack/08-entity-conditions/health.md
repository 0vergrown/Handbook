---
title: "Health (Entity Condition Type)"
description: "Checks the current health value of the entity."
navigation_title: "Health"
---

Checks the current health value of the entity.

Type ID: `apoli:health`

> `compare_to` is an **absolute** health value in half-hearts, not a fraction — a full-health player is `20`. For a fraction of maximum health use [apoli:relative_health](/docs/datapack/entity-conditions/relative_health).

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | Comparison | | Determines how the current health of the entity should be compared to the specified value.
`compare_to` | Float | | The value at which the current health of the entity will be compared to.

## Examples

```json
"condition": {
    "type": "apoli:health",
    "comparison": "<",
    "compare_to": 20
}
```

This example will check if the entity's health is less than 10 hearts (or 20 health points).
