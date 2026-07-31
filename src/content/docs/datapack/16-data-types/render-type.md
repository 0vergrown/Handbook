---
title: "Render Type (Data Type)"
description: "Selects how a texture is drawn onto the model — the blend/cull/lighting style of a render layer."
navigation_title: "Render Type"
---

Selects how a texture is drawn onto the model — the blend/cull/lighting style of a render layer. Used by the `render_type` field of Entity Texture Overlay and Overlay Layer. Given as a String; matching ignores case and separators.

## Values

| `render_type`      | Description                                                                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `translucent`      | Standard semi-transparent draw (back faces culled-free, alpha blended). The default, and the classic overlay look. Honours the tint and alpha.                                     |
| `translucent_cull` | Like `translucent` but with back-face culling. Slightly cheaper; use when the texture has no see-through interior faces.                                                           |
| `cutout`           | Hard-edged: each pixel is either fully opaque or fully transparent (no partial alpha). Good for crisp re-textures and decals.                                                      |
| `cutout_no_cull`   | `cutout` without back-face culling, so thin/flat geometry is visible from both sides.                                                                                              |
| `solid`            | Fully opaque draw; the alpha channel is ignored.                                                                                                                                   |
| `emissive`         | Glowing: drawn unlit (full-bright) and alpha-blended, but still tinted. Aliases: `glow`, `translucent_emissive`. Great for auras and energy effects that should shine in the dark. |
| `eyes`             | The vanilla "eyes" style — always full-bright and **untinted** (the tint fields are ignored). Classic glowing-eyes / mob-eyes look.                                                |

> `emissive` keeps your `red`/`green`/`blue`/`alpha` tint while glowing; `eyes` is brighter and additive but ignores tint. Pick `emissive` when you want a coloured glow, `eyes` for a pure overlay glow.

## Example

```json
{
  "type": "apoli:entity_texture_overlay",
  "wide_texture_location": "example:textures/entity/visor.png",
  "render_as_overlay": true,
  "render_type": "emissive",
  "body_parts": "head",
  "red": 1.0,
  "green": 0.3,
  "blue": 0.3
}
```

A red, glowing visor over the head.
