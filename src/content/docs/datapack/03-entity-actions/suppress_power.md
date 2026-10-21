---
title: "Suppress Power (Entity Action Type)"
description: "Turns a power off for a while without removing it."
navigation_title: "Suppress Power"
---

Turns one or more powers off without removing them. The power stays granted and its resources, cooldowns and stored data survive, but it does nothing until it is [unsuppressed](/docs/datapack/entity-actions/unsuppress_power).

Type ID: `apoli:suppress_power`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Identifier](/docs/datapack/data-types/identifier) or array of identifiers | _optional_ | The powers to suppress, by ID. |
| `tags` | [String](/docs/datapack/data-types/string) or array of strings | _optional_ | Suppresses every power the entity holds that carries one of these [power tags](/docs/datapack/introduction/powers#tagging-powers). |
| `source` | [Identifier](/docs/datapack/data-types/identifier) or array of identifiers | `apoli:suppressed` | The tags the suppression is filed under. Unsuppressing must name the same source. |

Give `power`, `tags` or both, and everything named by either is acted on. Each field takes a single value or an array, so one action can suppress several powers at once. Every listed power is suppressed under every listed source. `powers` and `sources` are accepted as other spellings of the same fields.

## Examples

```json
{
  "type": "apoli:suppress_power",
  "power": "example:flight"
}
```

This suppresses one power under the default `apoli:suppressed` source.

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

This suppresses three powers under one source, so a single `apoli:unsuppress_power` naming `example:power_dampener` lifts all three.

> [!IMPORTANT]
> Each source counts separately. A power stays suppressed until every source that suppressed it has been lifted, so two effects can suppress the same power without one cancelling the other. Give each effect its own source and unsuppress with that same source. If you leave `source` out on both, they share `apoli:suppressed` and the first unsuppress turns the power back on for both.

## Suppression follows granted powers

Suppressing a power also suppresses everything that power granted. That makes it useful on an [`apoli:multiple`](/docs/datapack/powers/multiple): a `multiple` does nothing itself, and all of its behaviour lives in the sub-powers it grants, so naming the parent turns the whole bundle off in one action.

```json
{
  "type": "apoli:suppress_power",
  "power": "example:phantom"
}
```

If `example:phantom` is a `multiple`, its sub-powers (`example:phantom_phasing`, `example:phantom_invisibility` and the rest) all stop too, and they come back when the parent is unsuppressed. The rule is general: anything granted with a suppressed power as its source is suppressed with it, through any number of nested `multiple` powers.

A sub-power suppressed directly keeps its own suppression. Lifting the parent doesn't turn it back on until its own source is lifted as well.

> [!NOTE]
> Powers that install lasting state, such as [`apoli:attribute`](/docs/datapack/powers/attribute) modifiers, [`apoli:creative_flight`](/docs/datapack/powers/creative_flight) and [`apoli:game_event_listener`](/docs/datapack/powers/game_event_listener), undo that state while suppressed and apply it again when lifted. Resources, cooldowns and stored NBT are left alone.
