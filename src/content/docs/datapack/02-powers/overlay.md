---
title: "Overlay (Power Type)"
description: "Draws one or more textures on the player's screen — full-screen tints, or placed and sized elements like counters, indicators and screen blocks."
navigation_title: "Overlay"
---

Draws a texture on the player's screen. Left alone it stretches to fill the screen, which is the classic tint or vignette; give it a position and a size and it becomes an HUD element — a counter, an indicator, a frame, a status icon. A single power can carry a whole list of them, each with its own condition.

Type ID: `apoli:overlay`

## Fields

Write the fields directly on the power for a single overlay, or put a list of overlay objects under `overlays`. Both spellings take the same fields.

Field | Type | Default | Description
------|------|---------|-------------
`texture` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The texture to draw.
`strength` | [Float](/docs/datapack/data-types/float) | `1.0` | In `texture` mode, the alpha the texture is drawn at. In `nausea` mode, how far it is stretched (`1.0` = screen size). Range 0.0–1.0.
`red`, `green`, `blue` | [Float](/docs/datapack/data-types/float) | `1.0` | Multiplied into the matching colour channel. Range 0.0–1.0.
`draw_mode` | [String](/docs/datapack/data-types/string) | `texture` | `texture` draws it as-is; `nausea` uses the additive, stretching blend the vanilla nausea overlay uses, which treats black as transparent.
`draw_phase` | [String](/docs/datapack/data-types/string) | `above_hud` | `below_hud` or `above_hud`.
`hide_with_hud` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Hide it when the HUD is hidden with F1.
`visible_in_third_person` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Keep drawing it in third person.
`x`, `y` | [Expression](/docs/datapack/data-types/expression) | `0` | Offset in GUI pixels from the anchor. `y` grows downward.
`width`, `height` | [Expression](/docs/datapack/data-types/expression) | the whole screen | Size of the drawn quad in GUI pixels. Leave both out for the full-screen behaviour.
`anchor` | [String](/docs/datapack/data-types/string) | `top_left` | Which point of the screen `x`/`y` are measured from: `top_left`, `top_center`, `top_right`, `left`, `center`, `right`, `bottom_left`, `bottom_center`, `bottom_right`.
`u`, `v` | [Expression](/docs/datapack/data-types/expression) | `0` | Top-left corner **inside the texture** to start drawing from — how you pick one sprite out of a sheet.
`texture_width`, `texture_height` | [Integer](/docs/datapack/data-types/integer) | `width`, `height` | The full size of the texture file. Needed whenever `u`/`v` are used, so the game knows how to map the sheet.
`condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | Per-overlay condition, **inside `overlays` only**. Checked every frame; an overlay whose condition fails is skipped while the rest keep drawing. On the single-overlay spelling the power's own `condition` already does this job.
`overlays` | array of overlay objects | _optional_ | Several overlays in one power. **All** of them whose condition passes are drawn, in order, so this is a stack of layers rather than a pick-one.

The power's own top-level `condition` still gates the whole thing; the per-overlay `condition` decides each layer inside `overlays`. Writing both `overlays` and the flat fields on one power is not an error, but only `overlays` is used.

`x`, `y`, `width`, `height`, `u` and `v` are [Expressions](/docs/datapack/data-types/expression), so they can read resources and entity state. That is what makes counters and meters possible without a power per digit.

## Examples

A full-screen tint — the original behaviour, unchanged:

```json
{
    "type": "apoli:overlay",
    "texture": "minecraft:textures/block/ice.png",
    "strength": 1.0,
    "draw_phase": "below_hud",
    "hide_with_hud": false
}
```

A 32×32 icon in the top-right corner, sixteen pixels in from each edge:

```json
{
    "type": "apoli:overlay",
    "texture": "example:textures/gui/charged.png",
    "anchor": "top_right",
    "x": -16,
    "y": 16,
    "width": 32,
    "height": 32
}
```

Negative `x` moves it left, away from the right edge it is anchored to.

### A counter

One digit, picked out of a 10-wide strip by a resource. The strip is 80×16 (ten 8×16 digits side by side), so `u` steps eight pixels per unit of the resource:

```json
{
    "type": "apoli:overlay",
    "texture": "example:textures/gui/digits.png",
    "anchor": "bottom_center",
    "x": 0,
    "y": -40,
    "width": 8,
    "height": 16,
    "u": "resource('example:charges') * 8",
    "v": 0,
    "texture_width": 80,
    "texture_height": 16
}
```

### A stack of indicators

Three layers in one power, each with its own condition, all drawn at once when they apply:

```json
{
    "type": "apoli:overlay",
    "overlays": [
        {
            "texture": "example:textures/gui/erased.png",
            "condition": { "type": "apoli:power_active", "power": "example:erased" }
        },
        {
            "texture": "example:textures/gui/low_stamina.png",
            "anchor": "bottom_left",
            "x": 8,
            "y": -8,
            "width": 64,
            "height": 16,
            "condition": {
                "type": "apoli:resource",
                "resource": "example:stamina",
                "comparison": "<",
                "compare_to": 20
            }
        },
        {
            "texture": "example:textures/gui/vignette.png",
            "draw_phase": "below_hud",
            "strength": 0.6
        }
    ]
}
```

> Every overlay in the list is evaluated each frame, condition included. Keep the conditions cheap — a resource comparison or a `power_active` check is fine, a raycast is not.
