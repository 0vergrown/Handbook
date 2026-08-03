---
title: "Custom Model Render (Power Type)"
description: "Renders a custom look on a player: either re-skinning the vanilla model with a texture (texture mode) or drawing a separate 3D model made in Blockbench that…"
navigation_title: "Custom Model Render"
---

Renders a custom look on a player: either re-skinning the vanilla model with a texture (**texture mode**) or drawing a separate 3D model made in Blockbench that follows the player's pose (**geometry mode**). Geometry mode is a JSON-defined feature renderer — no Java, no extra mods.

Type ID: `apoli:custom_model_render`

> **Breaking change:** this power replaces the old `apoli:entity_texture_overlay`. The `mode: texture` fields below are the direct successors of that power's fields; the multi-`layers` field was removed (use one power per layer instead). Rename `apoli:entity_texture_overlay` → `apoli:custom_model_render` in existing JSON.

> This is a client-side rendering power. **Texture mode** applies to players only. **Geometry mode** works on players and on the minions summoned by [apoli:summon_minion](/docs/datapack/entity-actions/summon_minion). Textures and models must be present in every viewer's resource pack.

## Shared fields (both modes)

| Field                              | Type                                                                                 | Default       | Description                                                                                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`                             | String                                                    | `texture`     | `texture` (re-skin the vanilla model) or `geometry` (draw a custom Blockbench model).                                                                                                          |
| `render_type`                      | Render Type                                          | `translucent` | Draw style — `translucent`, `cutout`, `cutout_no_cull`, `solid`, `emissive`/`glow`, `eyes`.                                                                                                    |
| `body_parts`                       | String or Array of String       | _whole model_ | In texture mode, restrict an overlay to these parts: `head`, `hat`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg` on a player, `main`, `flat2`, `flat3` on a minion. In geometry mode, render only the bones with these names — **any** bone name in your own model, not just the vanilla ones. Every bone you do not name is hidden, and hiding a bone hides everything nested under it. |
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
`render_as_overlay` | Boolean | `false` | **Minions only.** `false` replaces the minion's own model with yours; `true` draws yours on top of it. Ignored on players, where geometry is always drawn over the player model.

On resource (re)load, the log prints `Loaded N custom model(s) for custom_model_render.` — if your model isn't drawing, check `N` and confirm the file sits at one of the two paths above with the `.geo.json` extension.

**What you model is what you get.** The model is placed exactly where Blockbench shows it, relative to the player's feet: a bone at Bedrock pivot `[0, 0, 0]` sits on the ground, one at `[0, 24, 0]` sits at the head pivot. Per-cube rotations, bone rotations, bone parenting, `inflate` and `mirror` all carry over unchanged, and Box UV is packed the way Blockbench's Bedrock preview packs it — including on cubes with fractional sizes, where Blockbench rounds each dimension down before laying the six faces out.

> The UV grid is sized by the `texture_width` / `texture_height` in the `.geo.json`, which is your Blockbench project's UV size — not the pixel size of the PNG. A 64×64 PNG on a 32×32 UV project is fine (it just draws at 2×), but a PNG painted for a 64×64 UV grid on a 32×32 project will be half a texture out. Set the project's UV size before you paint.

**How geometry follows the player:** bones named `head`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg`, `hat` pick up the matching vanilla body part's animation, so the model bends with the arms and turns with the head. Any other bone (a `cape`, a `backpack`, a `tail`…) rides along with its parent bone.

Names are matched loosely, so you rarely have to rename anything Blockbench gave you. Case, spaces, `_` and `-` are ignored (`Head`, `RightArm` and `right arm` all work), and these spellings bind to the same body part:

| Body part | Also accepted |
| --- | --- |
| `head` | — |
| `hat` | `headwear`, `hat_layer`, `head_layer` |
| `body` | `torso`, `waist`, `jacket`, `body_layer` |
| `right_arm` / `left_arm` | `arm_right` / `arm_left`, `right_sleeve` / `left_sleeve`, `right_arm_layer` / `left_arm_layer` |
| `right_leg` / `left_leg` | `leg_right` / `leg_left`, `right_pants` / `left_pants`, `right_leg_layer` / `left_leg_layer` |

The animation is applied **on top of** the pose you authored, not instead of it — a bone rotates about its own pivot and stays where you put it. To attach geometry directly to a body part, build it around that part's pivot in Bedrock coordinates:

| Bone | Bedrock pivot |
| --- | --- |
| `head`, `hat`, `body` | `[0, 24, 0]` |
| `right_arm` / `left_arm` | `[-5, 22, 0]` / `[5, 22, 0]` |
| `right_leg` / `left_leg` | `[-1.9, 12, 0]` / `[1.9, 12, 0]` |

Nesting is fine: a body-part bone animates from the player whether it sits at the top level, inside a wrapper group like `bb_main`, or under your `Body` bone. It always swings the way the player's own limb swings, never twice over.

> One exception. If you give a **group above** a body-part bone a rotation of its own in Blockbench, that bone stays inside the tilted group and animates within it, rather than in the player's frame. That is almost always what you want for a tilted model — but if a limb looks like it is swinging in the wrong plane, a rotated parent group is the thing to check.

### Geometry mode on minions

Give the power to a [apoli:summon_minion](/docs/datapack/entity-actions/summon_minion) minion through that action's `powers` list and the minion is drawn as your Blockbench model instead of the default orb — a data-pack-only way to give a summon any shape you like.

The minion skeleton is `main` (the root bone) with `flat2` and `flat3` under it. A bone in your model with one of those names picks up that part's animation; every other bone keeps the pose you gave it in Blockbench. The minion never animates today, so in practice every bone keeps its authored pose — build the model standing on the Blockbench floor and it will be drawn there.

The minion's `texture` field still applies to the minion's own model, so it only matters when `render_as_overlay` is `true`. Your geometry always uses `texture_location`. `scale` on the summon still applies — the custom model is scaled with the minion.

```json
{
  "type": "apoli:summon_minion",
  "follow_owner": true,
  "follow_offset": [0.0, 1.0, -1.0],
  "max_life_ticks": 0,
  "powers": ["example:minion_wisp_model"]
}
```

```json
{
  "type": "apoli:custom_model_render",
  "mode": "geometry",
  "model_location": "example:wisp",
  "texture_location": "example:textures/entity/wisp.png",
  "render_type": "cutout_no_cull"
}
```

> `custom_model_render` is a client-side render power, so the minion never *behaves* differently — only its appearance changes.

## Behaviour & limits

- Multiple active `custom_model_render` powers stack; each is drawn. On a minion, one non-overlay geometry power is enough to hide the base model, and the rest still draw.
- Conditions on the power gate the whole render dynamically (combine with `hidden_slots` for equipment-based hiding).
- Geometry mode renders in third person only (no first-person hand model yet).
- If `model_location` fails to load, the minion falls back to its normal model rather than turning invisible.
- The Bedrock parser supports box UV **and** per-face UV (including per-cube mixing), per-cube and per-bone `pivot`/`rotation`, `inflate`, `mirror` and bone parenting. Only `minecraft:geometry[0]` is read, and `uv_rotation` (Bedrock format 1.21.0+) is not supported — a model using it logs a warning and draws that face unrotated.
- A cube with a zero-size axis is a flat plane in Bedrock too, and both of its faces land on the same plane. Blockbench shows this as z-fighting and so does the game; give the cube a small `inflate` or a non-zero thickness if it flickers.

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
