---
title: "Health (Entity Condition Type)"
description: "Compares the entity's current health with a number."
navigation_title: "Health"
---

Compares the entity's current health with a number.

Type ID: `apoli:health`

> [!NOTE]
> `compare_to` is an absolute health value in half hearts, so a player at full health is `20`. For a fraction of maximum health, use [apoli:relative_health](/docs/datapack/entity-conditions/relative_health).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the entity's health is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the health is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:health",
    "comparison": "<",
    "compare_to": 20
}
```

This checks whether the entity has less than 10 hearts (20 health points).
