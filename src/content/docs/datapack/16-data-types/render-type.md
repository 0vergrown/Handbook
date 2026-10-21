---
title: "Render Type (Data Type)"
description: "Picks how a texture is drawn onto the model: the blending, culling and lighting of a render layer."
navigation_title: "Render Type"
---

Picks how a texture is drawn onto the model: the blending, culling and lighting style of a render layer. It is used by the `render_type` field of [apoli:custom_model_render](/docs/datapack/powers/custom_model_render), and is given as a string. Matching ignores case and separators.

## Values

| `render_type` | Description |
| --- | --- |
| `translucent` | The standard semi-transparent draw, with back faces drawn and alpha blended. The default, and the classic overlay look. It uses the tint and alpha. |
| `translucent_cull` | Like `translucent`, but with back faces culled. Slightly cheaper, so use it when the texture has no see-through faces inside. |
| `cutout` | Hard-edged: each pixel is either fully opaque or fully transparent, with no partial alpha. Good for crisp textures and decals. |
| `cutout_no_cull` | `cutout` without back face culling, so thin or flat geometry shows from both sides. |
| `solid` | A fully opaque draw that ignores the alpha channel. |
| `emissive` | Glowing: drawn unlit at full brightness and alpha blended, but still tinted. Aliases: `glow` and `translucent_emissive`. Good for auras and energy effects that should shine in the dark. |
| `eyes` | The vanilla eyes style, always at full brightness and untinted, so the tint fields are ignored. The classic glowing eyes look. |
| `energy_swirl` | The aura of a charged creeper or wither armour: added on top of what is underneath so it glows, tinted, with the texture sliding across the model at the power's `scroll_speed`. Alias: `swirl`. |

> [!TIP]
> `emissive` keeps your `red`, `green`, `blue` and `alpha` tint while glowing, and `eyes` is brighter and additive but ignores the tint. Pick `emissive` for a coloured glow, `eyes` for a plain overlay glow and `energy_swirl` for a moving shimmer.

On a [geometry mode model](/docs/datapack/powers/custom_model_render#geometry-mode-fields-mode-geometry), which stands on its own, `emissive` and `eyes` hide whatever is behind them like any solid model does, so water, stained glass and other see-through blocks behind a glowing model stay behind it instead of showing through. As an overlay on the entity's own model they don't block anything themselves, because the model underneath already does.

## Example

```json
{
  "type": "apoli:custom_model_render",
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
