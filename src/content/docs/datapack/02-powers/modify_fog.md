---
title: "Modify Fog (Power Type)"
description: "Changes where the holder's fog starts and ends, and what colour it is."
navigation_title: "Modify Fog"
aliases: ["blindness"]
---

Changes the fog the holder sees: how far away it starts, how far away it becomes solid, and what colour it is. Every field is optional, and anything you leave out keeps whatever the game was already going to draw — so a power can recolour fog without touching its distance, or pull fog in close without touching its colour.

Type ID: `apoli:modify_fog`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `s` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Fog **start** distance in blocks — how far you can see before fog begins. |
| `v` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Fog **end** distance in blocks — where fog becomes fully opaque. |
| `r` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Red channel of the fog colour, `0`–`1`. |
| `g` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Green channel of the fog colour, `0`–`1`. |
| `b` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Blue channel of the fog colour, `0`–`1`. |
| `fade_in` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | Seconds to ease **into** this power's fog when it starts applying. |
| `fade_out` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | Seconds to ease **out of** this power's fog when it stops applying. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | Which power wins when two of them set the same field. Higher wins. |

`apoli:blindness` is a legacy id for this power and still resolves to it.

## How several powers combine

Each field is decided **on its own**. A power only takes part in the contest for a field it actually sets, so two powers can share the work without fighting:

```json
{ "type": "apoli:modify_fog", "s": 0, "v": 6 }
```
```json
{ "type": "apoli:modify_fog", "r": 0.4, "g": 0.0, "b": 0.5 }
```

Together those give thick fog six blocks out, tinted purple. Neither needs to know about the other.

When two powers *do* set the same field, the higher `priority` wins; on a tie the first one to be read wins. `fade_in` and `fade_out` are taken as a pair, from whichever active power has the highest priority.

## Fading

Fog moves to a new target over `fade_out` (of the fog you are leaving) plus `fade_in` (of the fog you are arriving at) **seconds**. With both left at `0` the change is instant. A power whose `condition` stops holding fades back out to whatever the game would otherwise draw, which is why a `fade_out` on the power that is ending is the one that matters.

## Examples

Near-blindness — the replacement for a blindness effect you cannot see through:

```json
{
  "type": "apoli:modify_fog",
  "s": 0,
  "v": 4,
  "fade_in": 0.5,
  "fade_out": 1.5
}
```

Red haze while a resource is high, colour only:

```json
{
  "type": "apoli:modify_fog",
  "r": 0.6,
  "g": 0.05,
  "b": 0.05,
  "fade_in": 2,
  "fade_out": 2,
  "condition": {
    "type": "apoli:resource",
    "resource": "example:rage",
    "comparison": ">=",
    "compare_to": 50
  }
}
```

Sight that closes in as air runs out:

```json
{
  "type": "apoli:modify_fog",
  "s": "air / 20",
  "v": "air / 6",
  "priority": 1
}
```

## Notes

- This is a **client-side view change**. It alters nothing the server knows about — it does not affect mob sight, spawning or rendering distance, only what the holder sees.
- Fog distances are in blocks and are not clamped to the render distance. `v` larger than the render distance simply means no fog.
- The fog is resolved once per client tick and eased between frames, so expressions here are evaluated 20 times a second rather than per frame.
