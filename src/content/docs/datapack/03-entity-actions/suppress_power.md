---
title: "Suppress Power (Entity Action Type)"
description: "Temporarily disables a power without removing it."
navigation_title: "Suppress Power"
---

Temporarily disables one or more powers without removing them. The power stays granted — its resources, cooldowns and stored data survive — it just stops doing anything until it is [unsuppressed](/docs/datapack/entity-actions/unsuppress_power).

Type ID: `apoli:suppress_power`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `power` | identifier **or array of identifiers** | **required** | The power(s) to suppress. |
| `source` | identifier **or array of identifiers** | `apoli:suppressed` | The tag(s) the suppression is filed under. Unsuppressing must name the same source. |

Both fields take either a single identifier or an array, so one action can suppress several powers at once. Every listed power is suppressed under every listed source. `powers` and `sources` are accepted as spellings of the same fields.

## Examples

```json
{
  "type": "apoli:suppress_power",
  "power": "example:flight"
}
```

Suppresses one power under the default `apoli:suppressed` source.

```json
{
  "type": "apoli:suppress_power",
  "power": [
    "example:flight",
    "example:water_breathing",
    "example:night_vision"
  ],
  "source": "example:power_dampener"
}
```

Suppresses three powers under one source — a single `apoli:unsuppress_power` naming `example:power_dampener` lifts all three.

> **Sources are a counter, not a switch.** A power stays suppressed until *every* source that suppressed it has been lifted, so two effects can suppress the same power without one cancelling the other. Give each effect its own source and unsuppress with that same source; if you omit `source` on both, they share `apoli:suppressed` and the first unsuppress re-enables the power for both.
