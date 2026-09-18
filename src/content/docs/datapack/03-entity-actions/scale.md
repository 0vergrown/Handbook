---
title: "Scale (Entity Action Type)"
description: "Sets, changes or animates one of the entity's stored scales."
navigation_title: "Scale"
---

Changes a scale that is **stored on the entity** — it survives relogs, dimension changes and the power being revoked, exactly like a value set with [/apoli:scale](/docs/datapack/commands/scale). Use [apoli:scale](/docs/datapack/powers/scale) instead when the size should only last as long as the power.

Type ID: `apoli:scale`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `scale_types` | [Scale Type](/docs/datapack/data-types/scale-type) or [Array](/docs/datapack/data-types/array) of them | `apoli:base` | Which scales to change. |
| `operation` | [String](/docs/datapack/data-types/string) | `set` | `set`, `add`, `subtract`, `multiply`, `divide` or `power`. |
| `scale` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1` | The right-hand side of the operation. |
| `ticks` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | How long the change takes. `0` snaps immediately. |
| `easing` | [String](/docs/datapack/data-types/string) | `linear` | How the change is spread over `ticks`. See [Scale Type](/docs/datapack/data-types/scale-type) for the list. |

`scale_type` is accepted as a spelling of `scale_types`.

## Examples

Shrink to a quarter over two seconds:

```json
{
    "type": "apoli:scale",
    "scale_types": "apoli:base",
    "operation": "set",
    "scale": 0.25,
    "ticks": 40,
    "easing": "ease_out_cubic"
}
```

Grow by ten percent each time the action runs:

```json
{
    "type": "apoli:scale",
    "operation": "multiply",
    "scale": 1.1,
    "ticks": 10
}
```

Put it back:

```json
{
    "type": "apoli:scale",
    "operation": "set",
    "scale": 1
}
```
