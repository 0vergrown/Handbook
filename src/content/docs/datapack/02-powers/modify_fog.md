---
title: "Modify Fog (Power Type)"
description: "Changes where the player's fog starts and ends, and what colour it is."
navigation_title: "Modify Fog"
aliases: ["blindness"]
---

Changes the fog the player with the power sees: how far away it starts, how far away it becomes solid, and what colour it is. Every field is optional, and anything you leave out keeps whatever the game would have drawn, so a power can recolour fog without changing its distance, or pull fog in close without changing its colour.

Type ID: `apoli:modify_fog`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `s` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The fog's start distance in blocks, meaning how far you can see before fog begins. |
| `v` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The fog's end distance in blocks, where fog becomes fully opaque. |
| `r` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The red channel of the fog colour, from `0` to `1`. |
| `g` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The green channel of the fog colour, from `0` to `1`. |
| `b` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The blue channel of the fog colour, from `0` to `1`. |
| `fade_in` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | Seconds to ease into this power's fog when it starts applying. |
| `fade_out` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | Seconds to ease out of this power's fog when it stops applying. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | Which power wins when two of them set the same field. Higher wins. |

`apoli:blindness` is a legacy ID for this power and still resolves to it.

## How several powers combine

Each field is decided separately. A power only competes for the fields it sets, so two powers can split the work without conflict:

```json
{ "type": "apoli:modify_fog", "s": 0, "v": 6 }
```

```json
{ "type": "apoli:modify_fog", "r": 0.4, "g": 0.0, "b": 0.5 }
```

Together those give thick fog six blocks out, tinted purple, and neither power needs to know about the other.

When two powers set the same field, the higher `priority` wins, and on a tie the first one read wins. `fade_in` and `fade_out` are taken as a pair, from whichever active power has the highest priority.

## Fading

Fog moves to a new target over `fade_out` seconds (from the fog you are leaving) plus `fade_in` seconds (from the fog you are arriving at). With both left at `0` the change is instant. When a power's `condition` stops holding, its fog fades back out to whatever the game would otherwise draw, so the `fade_out` of the power that is ending is the one that matters.

## Examples

Near blindness, as a blindness effect you can't see through:

```json
{
  "type": "apoli:modify_fog",
  "s": 0,
  "v": 4,
  "fade_in": 0.5,
  "fade_out": 1.5
}
```

A red haze while a resource is high, changing only the colour:

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

- This only changes the player's view on the client. Nothing the server knows about changes, so mob sight, spawning and render distance are unaffected.
- Fog distances are in blocks and are not clamped to the render distance. A `v` larger than the render distance means no fog.
- The fog is worked out once per client tick and eased between frames, so expressions here are evaluated 20 times a second, not every frame.
