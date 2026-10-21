---
title: "Overlay (Power Type)"
description: "Draws textures on the player's screen, either as full-screen tints or as placed and sized HUD elements."
navigation_title: "Overlay"
---

Draws a texture on the player's screen. On its own it stretches to fill the screen, which gives the classic tint or vignette. Give it a position and a size and it becomes a HUD element, such as a counter, an indicator, a frame or a status icon. One power can carry a whole list of them, each with its own condition.

Type ID: `apoli:overlay`

## Fields

Write the fields directly on the power for a single overlay, or put a list of overlay objects under `overlays`. Both spellings take the same fields.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `texture` | [Identifier](/docs/datapack/data-types/identifier) or keyword | _required_ | The texture to draw. It also takes a live keyword instead of a texture ID. See [Live textures](#live-textures). |
| `strength` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | In `texture` mode, the alpha the texture is drawn at. In `nausea` mode, how far it is stretched (`1.0` is the screen size). Range 0.0 to 1.0. |
| `red`, `green`, `blue` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | Multiplied into the matching colour channel. Range 0.0 to 1.0. |
| `draw_mode` | [String](/docs/datapack/data-types/string) | `texture` | `texture` draws it as it is. `nausea` uses the additive, stretching blend of the vanilla nausea overlay, which treats black as transparent. |
| `draw_phase` | [String](/docs/datapack/data-types/string) | `above_hud` | `below_hud` or `above_hud`. |
| `hide_with_hud` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Hides it when the HUD is hidden with F1. |
| `visible_in_third_person` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Keeps drawing it in third person. |
| `gui_scale_lock` | [Integer](/docs/datapack/data-types/integer) | `0` | Draws at this fixed GUI scale instead of the viewer's. `0` follows the viewer's setting. |
| `x`, `y` | [Expression](/docs/datapack/data-types/expression) | `0` | Offset in GUI pixels from the anchor. `y` grows downward. |
| `width`, `height` | [Expression](/docs/datapack/data-types/expression) | the whole screen | Size of the drawn quad in GUI pixels. Leave both out for the full-screen behaviour. |
| `anchor` | [String](/docs/datapack/data-types/string) | `top_left` | The point of the screen `x` and `y` are measured from: `top_left`, `top_center`, `top_right`, `left`, `center`, `right`, `bottom_left`, `bottom_center` or `bottom_right`. |
| `u`, `v` | [Expression](/docs/datapack/data-types/expression) | `0` | The top-left corner inside the texture to start drawing from. This is how you pick one sprite out of a sheet. |
| `texture_width`, `texture_height` | [Integer](/docs/datapack/data-types/integer) | `width`, `height` | The full size of the texture file. Needed whenever `u` or `v` is used, so the game knows how to map the sheet. |
| `region_width`, `region_height` | [Integer](/docs/datapack/data-types/integer) | `width`, `height` | The size of the patch cut out of the texture, when it differs from the size it is drawn at. This is what scales an 8×8 sprite up to a 64×64 quad. |
| `selector` | [String](/docs/datapack/data-types/string) | `"@s"` | Whose texture a live keyword resolves to: `@s` (the power holder) or `@p` (the player looking at the screen). |
| `set` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | An [apoli:entity_set](/docs/datapack/powers/entity_set) power. Draws the overlay once per member of that set. See [Live textures](#live-textures). |
| `condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | A condition for one overlay, inside `overlays` only. It is checked every frame, and an overlay whose condition fails is skipped while the rest keep drawing. With a single overlay, the power's own `condition` does this job. |
| `overlays` | array of overlay objects | _optional_ | Several overlays in one power. Every one whose condition passes is drawn, in order, so they stack as layers. |

The power's own top-level `condition` still gates the whole power, and the per-overlay `condition` decides each layer inside `overlays`. Writing both `overlays` and the flat fields on one power isn't an error, but only `overlays` is used.

`x`, `y`, `width`, `height`, `u`, `v`, `strength`, `red`, `green` and `blue` are [expressions](/docs/datapack/data-types/expression), so they can read resources and entity state. That makes counters, meters and fading tints possible without one power per step.

A plain number in any of those fields is folded once when the pack loads and costs nothing to draw, so `"strength": 0.6` is a constant that is never evaluated. A real expression is evaluated once per overlay entry per frame, which is a handful of arithmetic. That is fine for a tint that follows a resource, but keep it to arithmetic on resources and entity state, and do the expensive work in the power's `condition`.

## Locking the GUI scale

By default an overlay is laid out in the viewer's GUI scale units, so the same power fills a different amount of screen depending on each player's video settings. `gui_scale_lock` pins it to one scale: the overlay is positioned and sized as if the GUI scale were that number, whatever the viewer has chosen.

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

At `gui_scale_lock: 2` that ring is 96 real pixels across on every client. Lower numbers give a smaller, sharper overlay on a big monitor, and higher numbers give a chunkier one. It applies to the whole entry, so `x`, `y`, `width`, `height` and `anchor` are all measured in the locked units.

Use it for anything that has to be a consistent physical size: a reticle, a vignette that must not swallow the screen at GUI scale 4, or a frame designed against a fixed pixel grid. Leave it at `0` for HUD elements that sit alongside the vanilla hotbar and hearts, which follow the viewer's scale.

## Animated textures

An overlay texture animates the same way a block or item texture does: stack the frames vertically in one PNG and put a `.png.mcmeta` file with an `animation` section next to it. The power itself stays the same.

```json
{
  "animation": {
    "frametime": 4
  }
}
```

Saved as `assets/mypack/textures/overlay/pulse.png.mcmeta` beside a 64×256 `pulse.png`, this plays its four 64×64 frames in order, each held for 4 ticks. Every vanilla `animation` option works: `frames` for a custom order or per-frame timing, `interpolate` to blend between frames, and `width` and `height` for frames that aren't square.

Each frame counts as the whole texture. `u`, `v`, `region_width`, `region_height`, `texture_width` and `texture_height` are all measured within one frame, so a sprite sheet laid out for a still image keeps working when it becomes a frame. Like vanilla animations, frames advance on game ticks, 20 per second. A couple of seconds after an animated overlay leaves the screen it stops advancing, and it carries on from the same frame when it is shown again.

> [!WARNING]
> Every frame change uploads one frame to the graphics card, the same work a vanilla animated block does. A full-screen overlay with a `frametime` of `1` does that every tick, so keep large animations small in pixels or slow.

## Live textures

`texture` also accepts a keyword instead of a texture ID, and the game resolves it every frame against a real entity:

| Keyword | Draws |
| --- | --- |
| `player` | The subject's skin file. |
| `player_face` | The subject's face: the 8×8 head patch with the hat layer over it. `u`, `v`, `region_width`, `region_height` and the texture size all default to the right values for a skin, so you only give it a size and a place. |
| `player_cape` | The subject's cape, if they have one. |
| `entity` | Whatever texture that entity's renderer uses. Works on mobs as well as players. |
| `held_item` / `offhand_item` | The item in that hand, drawn as an item icon instead of a flat texture. |

`selector` says who the subject is. `@s` is the power holder and `@p` is the player whose screen this is. They are the same for a normal power and only differ inside `set`.

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

`set` turns one overlay into one per member. Name an [apoli:entity_set](/docs/datapack/powers/entity_set) power and the overlay is drawn once for every entity in that set, with the [expression](/docs/datapack/data-types/expression) variables `index` (zero-based) and `count` bound, so `x` or `y` can lay them out in a row:

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

`set` names the [apoli:entity_set](/docs/datapack/powers/entity_set) power ID, and `*:*` expands to the ID of the file it is written in. `"*:*_set"` inside `powers/party_hud.json` means `example:party_hud_set`, and the entity set power must have exactly that ID. If the IDs don't line up, the overlay draws nothing and Apoli logs one line naming the ID it couldn't find.

> [!NOTE]
> Live textures resolve on the client, so `selector` only takes `@s` and `@p`. A full entity selector can't be evaluated there. A `set` overlay reads only the viewing player's own sets: if someone else owns the set, that viewer sees nothing. Members resolve to players (their skin is available even out of render range), and a member that isn't a player is skipped.

## Examples

A full-screen tint:

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

One digit, picked out of a strip by a resource. The strip is 80×16 (ten 8×16 digits side by side), so `u` steps eight pixels per unit of the resource:

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

> [!WARNING]
> Every overlay in the list is evaluated each frame, condition included. Keep the conditions cheap. A resource comparison or a `power_active` check is fine, and a raycast isn't.
