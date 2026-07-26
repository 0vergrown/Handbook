---
title: "apoli:custom_model_render"
description: "Renders a custom look on a player: either re-skinning the vanilla model with a texture (texture mode) or drawing a separate 3D model made in Blockbench that…"
---

Renders a custom look on a player: either re-skinning the vanilla model with a texture (**texture mode**) or drawing a separate 3D model made in Blockbench that follows the player's pose (**geometry mode**). Geometry mode is a JSON-defined feature renderer — no Java, no extra mods.

Type ID: `apoli:custom_model_render`

> **Breaking change:** this power replaces the old `apoli:entity_texture_overlay`. The `mode: texture` fields below are the direct successors of that power's fields; the multi-`layers` field was removed (use one power per layer instead). Rename `apoli:entity_texture_overlay` → `apoli:custom_model_render` in existing JSON.

> This is a client-side rendering power and applies to **players** only. Textures and models must be present in every viewer's resource pack.

## Shared fields (both modes)

| Field                              | Type                                                                                 | Default       | Description                                                                                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`                             | String                                                    | `texture`     | `texture` (re-skin the vanilla model) or `geometry` (draw a custom Blockbench model).                                                                                                          |
| `render_type`                      | Render Type                                          | `translucent` | Draw style — `translucent`, `cutout`, `cutout_no_cull`, `solid`, `emissive`/`glow`, `eyes`.                                                                                                    |
| `body_parts`                       | String or Array of String       | _whole model_ | In texture mode, restrict an overlay to these parts. In geometry mode, only render the bones with these names. Names: `head`, `hat`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg`. |
| `red` / `green` / `blue` / `alpha` | Float                                                      | `1.0`         | Colour/opacity multipliers (0.0 – 1.0).                                                                                                                                                        |
| `scale`                            | Float                                                      | `1.0`         | Scales the drawn geometry outward from the model origin (aura/shell effect above 1.0).                                                                                                         |
| `hidden_slots`                     | Array of Equipment Slot | _none_        | Hide this render whenever any listed slot is occupied — e.g. `["head"]` hides a custom hat model when a real helmet is worn.                                                                   |
| `show_first_person`                | Boolean                                                  | `false`       | Texture mode only: also apply to the holder's own arm in first person.                                                                                                                         |

## Texture-mode fields (`mode: texture`)

Field | Type | Default | Description
------|------|---------|-------------
`wide_texture_location` | Identifier | _required_ | Texture for the wide (Steve) model.
`slim_texture_location` | Identifier | = wide | Texture for the slim (Alex) model.
`render_as_overlay` | Boolean | `false` | `false` replaces the skin; `true` draws the texture as an overlay layer honouring `render_type`, `body_parts` and the tint.
`hide_cape` | Boolean | `false` | Hide the holder's cape while active.

## Geometry-mode fields (`mode: geometry`)

Field | Type | Default | Description
------|------|---------|-------------
`model_location` | Identifier | _required_ | The Blockbench model. `mymod:cape` resolves to `assets/mymod/geo/cape.geo.json` (the standard Blockbench/GeckoLib folder) — `assets/mymod/models/apoli/cape.geo.json` also works. Export from Blockbench as **Bedrock geometry** (`.geo.json`).
`texture_location` | Identifier | _required_ | The texture that UV-maps onto the model, e.g. `mymod:textures/entity/cape.png`.

On resource (re)load, the log prints `Loaded N custom model(s) for custom_model_render.` — if your model isn't drawing, check `N` and confirm the file sits at one of the two paths above with the `.geo.json` extension.

**How geometry follows the player:** bones named `head`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg`, `hat` inherit the matching vanilla body part's live pose, so the model bends with the arms and turns with the head. Any other bone (a `cape`, a `backpack`, a `tail`…) rides along with its parent bone. Model the humanoid skeleton in Blockbench with those bone names and attach your extra geometry as child bones.

## Behaviour & limits

- Multiple active `custom_model_render` powers stack; each is drawn.
- Conditions on the power gate the whole render dynamically (combine with `hidden_slots` for equipment-based hiding).
- Geometry mode renders in third person only (no first-person hand model yet).
- The Bedrock parser supports box-UV cubes (the Blockbench default), `inflate`, per-bone `pivot`/`rotation` and bone parenting. Per-face UV cubes fall back to their north-face UV — prefer box UV for now.

## Examples

Replace the skin in third person (was `entity_texture_overlay` replace mode):

```json
{
  "type": "apoli:custom_model_render",
  "mode": "texture",
  "wide_texture_location": "example:textures/entity/husk_wide.png",
  "slim_texture_location": "example:textures/entity/husk_slim.png"
}
```

Glowing eyes on the head only, over the normal skin:

```json
{
  "type": "apoli:custom_model_render",
  "mode": "texture",
  "render_as_overlay": true,
  "render_type": "eyes",
  "body_parts": "head",
  "wide_texture_location": "example:textures/entity/glowing_eyes.png"
}
```

A custom cape model that follows the body, hidden when a chestplate is worn:

```json
{
  "type": "apoli:custom_model_render",
  "mode": "geometry",
  "model_location": "example:cape",
  "texture_location": "example:textures/entity/cape.png",
  "render_type": "cutout_no_cull",
  "hidden_slots": ["chest"]
}
```

## See also

- [Render Type](/docs/datapack/data-types/render-type) — the draw styles for `render_type`.
- Equipment Slot (Data Type) — values for `hidden_slots`.
- [[apoli:model_color](/docs/datapack/powers/model_color)](/docs/datapack/powers/model_color) — per-part tinting of the existing skin.
- [[apoli:modify_player_model](/docs/datapack/powers/modify_player_model)](/docs/datapack/powers/modify_player_model) — swap the whole player model for a Java/Figura model.

