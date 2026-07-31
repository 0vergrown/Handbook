---
title: "Overlay Layer (Data Type)"
description: "One render layer of an Entity Texture Overlay power — a single texture drawn over the player model with its own draw style, tint and target body parts. A power's layers field is an array of these, each independent and drawn in order on top of the base overlay."
navigation_title: "Overlay Layer"
---

One render layer of an Entity Texture Overlay power — a single texture drawn over the player model with its own draw style, tint and target body parts. A power's `layers` field is an array of these, each independent and drawn in order on top of the base overlay.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`texture_location` | Identifier | _inherit_ | Texture used for both models. Used when a model-specific texture is not given. If omitted entirely, the layer inherits the power's base `wide`/`slim` texture (handy for re-styling one part without repeating the texture).
`wide_texture_location` | Identifier | `texture_location` | Texture for the wide (Steve) model.
`slim_texture_location` | Identifier | `texture_location` | Texture for the slim (Alex) model.
`render_type` | Render Type | `translucent` | How this layer is drawn — `translucent`, `cutout`, `cutout_no_cull`, `solid`, `emissive`/`glow`, or `eyes`. See Render Type.
`body_parts` | String or Array of String | _whole model_ | Restrict this layer to specific model parts (e.g. `"head"` or `["head", "body"]`). When omitted, the layer covers the whole model. Part names follow [Model Color](/docs/datapack/powers/model_color): `head`, `hat`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg` (plus `jacket`, the sleeves and the trousers). Matching ignores case and separators.
`red` | Float | `1.0` | Red multiplier for this layer. Range: 0.0 - 1.0.
`green` | Float | `1.0` | Green multiplier for this layer. Range: 0.0 - 1.0.
`blue` | Float | `1.0` | Blue multiplier for this layer. Range: 0.0 - 1.0.
`alpha` | Float | `1.0` | Alpha (opacity) multiplier for this layer. Range: 0.0 - 1.0.
`show_first_person` | Boolean | `false` | If `true`, this layer is also drawn on the holder's own first-person arm (only the arm/sleeve parts are affected in first person).
`scale` | Float | `1.0` | Scales this layer's geometry outward from the model origin — the same idea as Sync's Energy Swirl `size`. Above `1.0` puffs the texture out past the skin (an aura/shell), below `1.0` pulls it inside. `1.0` sits flush on the body.

> The `eyes` render type ignores the tint and is always full-bright; `emissive` (alias `glow`) keeps the tint but renders unlit (glowing). See Render Type.

## Example

A glowing, cyan-tinted emblem drawn over the body, inheriting nothing from the base power:

```json
{
  "texture_location": "example:textures/entity/emblem.png",
  "render_type": "emissive",
  "body_parts": "body",
  "red": 0.2,
  "green": 0.9,
  "blue": 1.0
}
```

A layer that re-styles just the head using the power's own base texture (no `texture_location` given), drawn as opaque cutout:

```json
{
  "render_type": "cutout",
  "body_parts": ["head"]
}
```
