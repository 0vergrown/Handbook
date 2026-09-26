---
title: Skin Rendering
description: Making 3D Skin Layers and Ears follow Apoli's model and colour powers.
---

[3D Skin Layers](https://modrinth.com/mod/3dskinlayers) and [Ears](https://modrinth.com/mod/ears) both draw extra geometry from the player's skin file rather than from the vanilla player model, so out of the box they ignore what Apoli does to that model — a player faded to 10% alpha still had a fully opaque hat layer floating around their head. Apoli hooks both so their geometry follows the render powers.

This integration is **behaviour-gated and adds no types**. Nothing to enable, no new JSON syntax; install either mod and the powers you already have start applying to it. Ears 1.4 and Ears 2 are both supported.

## What follows what

| Apoli feature | 3D Skin Layers | Ears |
| --- | --- | --- |
| [`apoli:model_color`](/docs/datapack/powers/model_color) — whole model | tinted, alpha included | tinted, alpha included |
| `apoli:model_color` — `parts` entries | tinted per matching body part | tinted per Ears feature named in `parts` |
| [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) rotation / scale / pivot | followed | followed |
| `apoli:modify_model_parts` `visible` | followed | followed |
| `apoli:modify_model_parts` `hidden` | followed | — |
| `apoli:modify_model_parts` `visible` / `hidden` on an Ears feature name | — | that feature hidden |
| [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) replacing the skin or model | hidden | hidden |
| [`apoli:modify_player_model`](/docs/datapack/powers/modify_player_model) with any model but `apoli:vanilla` | hidden | hidden |
| [`apoli:prevent_feature_render`](/docs/datapack/powers/prevent_feature_render) | `skin_layers_3d` | `ears`, or one feature at a time |
| Fully transparent model (alpha 0) | hidden | hidden |

A `render_as_overlay` custom model does **not** hide either mod — an overlay is drawn on top of the vanilla skin, so the extra geometry still belongs there.

## Body part names

Ears features have their own [body part names](/docs/datapack/data-types/body-part#wings-and-ears-features) — `ears`, `right_ear`, `left_ear`, `horns`, `snout`, `tail`, `claws` and one per claw, `wings`, `right_wing`, `left_wing`, `ears_chest` and `ears_cape`, plus `halo` and the digitigrade legs on Ears 2. Name one in [`apoli:model_color`](/docs/datapack/powers/model_color) `parts` to tint just that feature, or hide it with a `visible` or `hidden` transformation in [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts):

```json
{
    "type": "apoli:multiple",
    "horns": {
        "type": "apoli:modify_model_parts",
        "transformations": [
            {"model_part": "horns", "type": "visible", "value": 0}
        ]
    },
    "tail": {
        "type": "apoli:model_color",
        "parts": [
            {"part": "tail", "red": 0.3, "green": 0.3, "blue": 1.0}
        ]
    }
}
```

Hides the horns and tints the tail blue, leaving every other feature and the rest of the skin as it was. Rotation, scale and pivot transformations do nothing to an Ears feature — Ears draws them itself, following the limb they hang from.

## Feature names

Alongside the vanilla feature-layer names, [`apoli:prevent_feature_render`](/docs/datapack/powers/prevent_feature_render) accepts:

| Name | Hides |
| --- | --- |
| `skin_layers_3d` | every 3D Skin Layers layer — hat, jacket, sleeves, trouser legs |
| `ears` | every Ears feature |
| `ears_ears` | ears |
| `ears_horn` | horns |
| `ears_snout` | the snout |
| `ears_tail` | the tail |
| `ears_wings` | wings |
| `ears_cape` | the Ears cape |
| `ears_chest` | the chest piece |
| `ears_claw_left_arm` · `ears_claw_right_arm` · `ears_claw_left_leg` · `ears_claw_right_leg` | the matching claws |
| `ears_halo` | the halo (Ears 2) |
| `ears_digitigrade_left_leg` · `ears_digitigrade_right_leg` | the matching digitigrade leg (Ears 2) |

An `apoli:prevent_feature_render` with no `feature`/`features` at all means "every feature layer", and that includes both mods.

```json
{
    "type": "apoli:prevent_feature_render",
    "features": [
        "skin_layers_3d",
        "ears_tail",
        "ears_wings"
    ]
}
```

Flattens the skin back to two dimensions and tucks the tail and wings away — handy while a form-change power has the holder in a shape those features don't belong on.

> `apoli:model_color`'s forced-white overlay (`red`, `green` and `blue` all set to `1`) reaches the 3D layers but **not** Ears — Ears' vertex path takes no overlay coordinate, so a whitened player keeps normally-coloured ears.

> Both integrations are client-side. A dedicated server neither knows nor cares whether these mods are installed, so a pack using the feature names above stays loadable either way.
