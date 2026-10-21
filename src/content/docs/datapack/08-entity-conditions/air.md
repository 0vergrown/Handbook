---
title: "Air (Entity Condition Type)"
description: "Compares how much air the entity has left with a number."
navigation_title: "Air"
---

Compares how much air (breath) the entity has left, in ticks, with a number.

Type ID: `apoli:air`

> [!NOTE]
> Players and most mobs have a maximum of 300 ticks of air, dolphins have 4800 and axolotls have 6000. One bubble is the maximum divided by 10 (`max / 10 = value`).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the entity's air, in ticks, is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the air is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:air",
    "comparison": "==",
    "compare_to": 0
}
```

This checks whether the entity has no air left.
