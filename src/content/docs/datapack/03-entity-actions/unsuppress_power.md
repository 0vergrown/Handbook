---
title: "Unsuppress Power (Entity Action Type)"
description: "Re-enables a power previously suppressed."
navigation_title: "Unsuppress Power"
---

Lifts a suppression applied by [apoli:suppress_power](/docs/datapack/entity-actions/suppress_power). The power resumes with its resources and cooldowns intact.

Type ID: `apoli:unsuppress_power`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `power` | identifier **or array of identifiers** | **required** | The power(s) to unsuppress. |
| `source` | identifier **or array of identifiers** | `apoli:suppressed` | The source(s) to lift. Must match what suppressed the power. |

Both fields take either a single identifier or an array. Every listed source is lifted from every listed power. `powers` and `sources` are accepted as spellings of the same fields.

## Examples

```json
{
  "type": "apoli:unsuppress_power",
  "power": [
    "example:flight",
    "example:water_breathing",
    "example:night_vision"
  ],
  "source": "example:power_dampener"
}
```

Lifts the `example:power_dampener` suppression from all three powers.

> The `source` must match the one used to suppress. Unsuppressing with a source that never suppressed that power does nothing — it is not an error, so a typo here fails silently. If a power seems stuck off, check that both actions name the same source.

Name the same power you suppressed. Sub-powers of an [`apoli:multiple`](/docs/datapack/powers/multiple) are suppressed *through* their parent, so lifting the parent brings the whole bundle back — you cannot lift one sub-power out of a suppressed parent, and unsuppressing a sub-power directly does nothing while the parent is still off.
