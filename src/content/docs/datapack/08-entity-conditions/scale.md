---
title: "Scale (Entity Condition Type)"
description: "Compares one of the entity's scales against a number."
navigation_title: "Scale"
---

Compares one of the entity's scales — the final value, with every power, stored value and parent scale folded in — against a number.

Type ID: `apoli:scale`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `scale_type` | [Scale Type](/docs/datapack/data-types/scale-type) | `apoli:base` | Which scale to read. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | — | How to compare. |
| `compare_to` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | — | What to compare against. |

## Examples

```json
{
    "type": "apoli:scale",
    "scale_type": "apoli:base",
    "comparison": "<",
    "compare_to": 0.5
}
```

Only let a power run while the holder still fits through a door:

```json
{
    "type": "apoli:scale",
    "scale_type": "apoli:height",
    "comparison": "<=",
    "compare_to": 1
}
```
