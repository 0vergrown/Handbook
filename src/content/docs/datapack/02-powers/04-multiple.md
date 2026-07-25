---
title: apoli:multiple
description: Bundle several powers into one, so a single grant hands out many effects.
---

`apoli:multiple` groups several powers under one id. Granting the multiple grants all of its children; revoking it revokes them. It's how a single origin trait — "you are aquatic" — can be one power that quietly contains a dozen behaviours.

## Two ways to write children

**Inline (the common way).** Every field *other* than the [shared power fields](/docs/datapack/powers/overview#the-shape-of-a-power) is treated as a named sub-power, defined right there:

```json
{
  "type": "apoli:multiple",
  "gills": {
    "type": "apoli:prevent_death",
    "condition": { "type": "apoli:in_rain" }
  },
  "fast_swim": {
    "type": "apoli:swim_speed",
    "modifier": { "operation": "multiply_total_multiplicative", "value": 0.5 }
  }
}
```

At load time each inline child becomes its own power (`my_pack:aquatic_gills`, `my_pack:aquatic_fast_swim`), and the multiple holds the list. You never grant the children directly — they come and go with the parent.

**By reference.** If the powers already exist, list their ids with `sub_powers`:

```json
{
  "type": "apoli:multiple",
  "sub_powers": [
    "my_pack:night_vision",
    "my_pack:slow_falling"
  ]
}
```

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `sub_powers` | list of identifier | `[]` | Ids of existing powers to include. |
| *(any other key)* | power | — | An inline sub-power, named by its key. |

## Why bundle at all?

- **One grant, many effects** — hand out a whole kit with a single `/power grant` or one origin entry.
- **Tidy revokes** — remove the parent and every child goes with it, cleanly.
- **Shared identity** — the children read as one thing in menus (and you can `hidden: true` the noisy ones).

> Sub-powers are full powers: each can have its own `condition`, its own `name`, and can even be another `apoli:multiple`. Nesting is fine.

## See also

- [Powers overview](/docs/datapack/powers/overview)
- [Origins » Layers](/docs/datapack/origins/layers) — where bundled powers usually end up.
