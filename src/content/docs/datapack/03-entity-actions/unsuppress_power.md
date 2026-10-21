---
title: "Unsuppress Power (Entity Action Type)"
description: "Lifts a suppression from a power, so it works again."
navigation_title: "Unsuppress Power"
---

Lifts a suppression applied by [apoli:suppress_power](/docs/datapack/entity-actions/suppress_power). The power resumes with its resources and cooldowns intact.

Type ID: `apoli:unsuppress_power`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Identifier](/docs/datapack/data-types/identifier) or array of identifiers | _optional_ | The powers to unsuppress, by ID. |
| `tags` | [String](/docs/datapack/data-types/string) or array of strings | _optional_ | Unsuppresses every power the entity holds that carries one of these [power tags](/docs/datapack/introduction/powers#tagging-powers). |
| `source` | [Identifier](/docs/datapack/data-types/identifier) or array of identifiers | `apoli:suppressed` | The sources to lift. They must match what suppressed the power. |

Give `power`, `tags` or both, and everything named by either is acted on. Each field takes a single value or an array. Every listed source is lifted from every listed power. `powers` and `sources` are accepted as other spellings of the same fields.

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

This lifts the `example:power_dampener` suppression from all three powers.

> [!WARNING]
> The `source` must match the one used to suppress. Unsuppressing with a source that never suppressed that power does nothing and isn't an error, so a typo here fails silently. If a power seems stuck off, check that both actions name the same source.

Name the same power you suppressed. Sub-powers of an [`apoli:multiple`](/docs/datapack/powers/multiple) are suppressed through their parent, so lifting the parent brings the whole bundle back. You can't lift one sub-power out of a suppressed parent, and unsuppressing a sub-power directly does nothing while the parent is still off.
