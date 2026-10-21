---
title: "Saturation Level (Entity Condition Type)"
description: "Compares the player's hidden saturation level with a number."
navigation_title: "Saturation Level"
---

Compares the entity's saturation level with a number. Saturation is the hidden value that decides how full the entity is, and so how long it takes before its food level starts going down.

Type ID: `apoli:saturation_level`

> [!NOTE]
> This condition only works on players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the player's saturation level is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the saturation level is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:saturation_level",
    "comparison": "==",
    "compare_to": 0
}
```

This checks whether the player's saturation has run out.
