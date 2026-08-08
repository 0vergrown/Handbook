---
title: Skin Rendering
description: Making 3D Skin Layers and Ears follow Apoli's model and colour powers.
---

[3D Skin Layers](https://modrinth.com/mod/3dskinlayers) and [Ears](https://modrinth.com/mod/ears) both draw extra geometry from the player's skin file rather than from the vanilla player model, so out of the box they ignore what Apoli does to that model — a player faded to 10% alpha still had a fully opaque hat layer floating around their head. Apoli hooks both so their geometry follows the render powers.

This integration is **behaviour-gated and adds no types**. Nothing to enable, no new JSON syntax; install either mod and the powers you already have start applying to it.

## What follows what

| Apoli feature | 3D Skin Layers | Ears |
| --- | --- | --- |
| [`apoli:model_color`](/docs/datapack/powers/model_color) — whole model | tinted, alpha included | tinted, alpha included |
| `apoli:model_color` — `parts` entries | tinted per matching body part | whole-model colour only |
| [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) rotation / scale / pivot | followed | followed |
| `apoli:modify_model_parts` `visible` | followed | followed |
| `apoli:modify_model_parts` `hidden` | followed | — |
| [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) replacing the skin or model | hidden | hidden |
| [`apoli:modify_player_model`](/docs/datapack/powers/modify_player_model) | hidden | hidden |
| [`apoli:prevent_feature_render`](/docs/datapack/powers/prevent_feature_render) | `skin_layers_3d` | `ears`, or one feature at a time |
| Fully transparent model (alpha 0) | hidden | hidden |

A `render_as_overlay` custom model does **not** hide either mod — an overlay is drawn on top of the vanilla skin, so the extra geometry still belongs there.

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
