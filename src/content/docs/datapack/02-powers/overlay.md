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
`texture` | [Identifier](/docs/datapack/data-types/identifier) or keyword | **required** | The texture to draw. Besides a texture id it takes a live keyword — see [Live textures](#live-textures).
`strength` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | In `texture` mode, the alpha the texture is drawn at. In `nausea` mode, how far it is stretched (`1.0` = screen size). Range 0.0–1.0.
`red`, `green`, `blue` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | Multiplied into the matching colour channel. Range 0.0–1.0.
`draw_mode` | [String](/docs/datapack/data-types/string) | `texture` | `texture` draws it as-is; `nausea` uses the additive, stretching blend the vanilla nausea overlay uses, which treats black as transparent.
`draw_phase` | [String](/docs/datapack/data-types/string) | `above_hud` | `below_hud` or `above_hud`.
`hide_with_hud` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Hide it when the HUD is hidden with F1.
`visible_in_third_person` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Keep drawing it in third person.
`gui_scale_lock` | [Integer](/docs/datapack/data-types/integer) | `0` | Draw at this fixed GUI scale instead of the viewer's. `0` follows the viewer's setting.
`x`, `y` | [Expression](/docs/datapack/data-types/expression) | `0` | Offset in GUI pixels from the anchor. `y` grows downward.
`width`, `height` | [Expression](/docs/datapack/data-types/expression) | the whole screen | Size of the drawn quad in GUI pixels. Leave both out for the full-screen behaviour.
`anchor` | [String](/docs/datapack/data-types/string) | `top_left` | Which point of the screen `x`/`y` are measured from: `top_left`, `top_center`, `top_right`, `left`, `center`, `right`, `bottom_left`, `bottom_center`, `bottom_right`.
`u`, `v` | [Expression](/docs/datapack/data-types/expression) | `0` | Top-left corner **inside the texture** to start drawing from — how you pick one sprite out of a sheet.
`texture_width`, `texture_height` | [Integer](/docs/datapack/data-types/integer) | `width`, `height` | The full size of the texture file. Needed whenever `u`/`v` are used, so the game knows how to map the sheet.
`region_width`, `region_height` | [Integer](/docs/datapack/data-types/integer) | `width`, `height` | The size of the patch cut out of the texture, when it differs from the size it is drawn at. This is what scales an 8×8 sprite up to a 64×64 quad.
`selector` | [String](/docs/datapack/data-types/string) | `"@s"` | Whose texture a live keyword resolves to: `@s` (the power holder) or `@p` (the player looking at the screen).
`set` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | An [apoli:entity_set](/docs/datapack/powers/entity_set) power. Draws the overlay once per member of that set — see [Live textures](#live-textures).
`condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | Per-overlay condition, **inside `overlays` only**. Checked every frame; an overlay whose condition fails is skipped while the rest keep drawing. On the single-overlay spelling the power's own `condition` already does this job.
`overlays` | array of overlay objects | _optional_ | Several overlays in one power. **All** of them whose condition passes are drawn, in order, so this is a stack of layers rather than a pick-one.

The power's own top-level `condition` still gates the whole thing; the per-overlay `condition` decides each layer inside `overlays`. Writing both `overlays` and the flat fields on one power is not an error, but only `overlays` is used.

`x`, `y`, `width`, `height`, `u`, `v`, `strength`, `red`, `green` and `blue` are [Expressions](/docs/datapack/data-types/expression), so they can read resources and entity state. That is what makes counters, meters and fading tints possible without a power per step.

A plain number in any of those fields is folded once when the pack loads and costs nothing to draw, so `"strength": 0.6` is a constant, not an evaluation. A real expression is evaluated once per overlay entry per frame, which is a handful of arithmetic — fine for a tint that follows a resource, but the usual rule applies: keep it to arithmetic on resources and entity state, and do the expensive thinking in the power's `condition`.

## Locking the GUI scale

By default an overlay is laid out in the viewer's GUI-scale units, so the same power fills a different amount of screen depending on each player's video settings. `gui_scale_lock` pins it to one scale instead: the overlay is positioned and sized as if the GUI scale were that number, whatever the viewer has chosen.

```json
{
    "type": "apoli:overlay",
    "texture": "example:textures/gui/crosshair_ring.png",
    "gui_scale_lock": 2,
    "anchor": "center",
    "width": 48,
    "height": 48
}
```

At `gui_scale_lock: 2` that ring is 96 real pixels across on every client. Lower numbers give a smaller, sharper overlay on a big monitor; higher numbers give a chunkier one. It applies to the whole entry — `x`, `y`, `width`, `height` and `anchor` are all measured in the locked units.

Use it for anything that has to be a consistent physical size — a reticle, a vignette that must not swallow the screen at GUI scale 4, a frame designed against a fixed pixel grid. Leave it at `0` for HUD elements that should sit alongside the vanilla hotbar and hearts, which do follow the viewer's scale.

## Live textures

`texture` also accepts a keyword instead of a texture id, and the game resolves it per frame against a real entity:

| Keyword | Draws |
| --- | --- |
| `player` | The subject's skin file. |
| `player_face` | The subject's face — the 8×8 head patch, with the hat layer over it. `u`, `v`, `region_width`, `region_height` and the texture size all default to the right values for a skin, so you only give it a size and a place. |
| `player_cape` | The subject's cape, if they have one. |
| `entity` | Whatever texture that entity's renderer uses — works on mobs, not just players. |
| `held_item` / `offhand_item` | The item in that hand, drawn as an item icon rather than a flat texture. |

`selector` says who the subject is. `@s` is the power holder; `@p` is the player whose screen this is, which is the same thing for a normal power and differs only inside `set`.

A 215×215 portrait of your own face in the middle of the screen:

```json
{
  "type": "apoli:overlay",
  "texture": "player_face",
  "selector": "@s",
  "anchor": "center",
  "x": 0,
  "y": 0,
  "width": 215,
  "height": 215
}
```

`set` turns one overlay into one-per-member. Name an [apoli:entity_set](/docs/datapack/powers/entity_set) power and the overlay is drawn once for every entity in that set, with the [Expression](/docs/datapack/data-types/expression) variables `index` (zero-based) and `count` bound — so `x` or `y` can lay them out in a row:

```json
{
  "type": "apoli:overlay",
  "texture": "player_face",
  "set": "*:*_set",
  "anchor": "top_left",
  "x": "8 + index * 24",
  "y": 8,
  "width": 20,
  "height": 20
}
```

`set` names the [apoli:entity_set](/docs/datapack/powers/entity_set) **power id**, and `*:*` expands to the id of the file it is written in — so `"*:*_set"` inside `powers/party_hud.json` means `example:party_hud_set`, and the entity-set power must actually have that id. If the ids do not line up, the overlay draws nothing and Apoli logs one line naming the id it could not find.

> Live textures resolve on the client, so `selector` only takes `@s` and `@p` — a full entity selector cannot be evaluated there. A `set` overlay reads only the **viewing player's own** sets: if the set is owned by someone else, that viewer sees nothing. Members resolve to players (their skin is available even out of render range); a member that is not a player is skipped.

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
