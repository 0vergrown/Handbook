---
title: Skin Rendering
description: "Making 3D Skin Layers and Ears follow Apoli's model and colour powers."
---

[3D Skin Layers](https://modrinth.com/mod/3dskinlayers) and [Ears](https://modrinth.com/mod/ears) both draw extra geometry from the player's skin file instead of from the vanilla player model, so by themselves they ignore what Apoli does to that model. A player faded to 10% alpha would keep a fully opaque hat layer floating around their head. Apoli hooks both mods so their geometry follows the render powers.

This integration is behaviour-gated and adds no types. There is nothing to enable and no new JSON: install either mod and the powers you already have apply to it. Ears 1.4 and Ears 2 are both supported.

## What follows what

| Apoli feature | 3D Skin Layers | Ears |
| --- | --- | --- |
| [`apoli:model_color`](/docs/datapack/powers/model_color) on the whole model | Tinted, alpha included | Tinted, alpha included |
| `apoli:model_color` `parts` entries | Tinted for each matching body part | Tinted for each Ears feature named in `parts` |
| [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) rotation, scale and pivot | Followed | Followed |
| `apoli:modify_model_parts` `visible` | Followed | Followed |
| `apoli:modify_model_parts` `hidden` | Followed | Not applicable |
| `apoli:modify_model_parts` `visible` or `hidden` on an Ears feature name | Not applicable | That feature is hidden |
| [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) replacing the skin or model | Hidden | Hidden |
| [`apoli:modify_player_model`](/docs/datapack/powers/modify_player_model) with any model except `apoli:vanilla` | Hidden | Hidden |
| [`apoli:prevent_feature_render`](/docs/datapack/powers/prevent_feature_render) | `skin_layers_3d` | `ears`, or one feature at a time |
| A fully transparent model (alpha 0) | Hidden | Hidden |

A `render_as_overlay` custom model doesn't hide either mod. An overlay is drawn on top of the vanilla skin, so the extra geometry still belongs there.

## Body part names

Ears features have their own [body part names](/docs/datapack/data-types/body-part#wings-and-ears-features): `ears`, `right_ear`, `left_ear`, `horns`, `snout`, `tail`, `claws` and one for each claw, `wings`, `right_wing`, `left_wing`, `ears_chest` and `ears_cape`, plus `halo` and the digitigrade legs on Ears 2. Name one in the `parts` of [`apoli:model_color`](/docs/datapack/powers/model_color) to tint just that feature, or hide it with a `visible` or `hidden` transformation in [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts):

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

This hides the horns and tints the tail blue, leaving every other feature and the rest of the skin as they were. Rotation, scale and pivot transformations do nothing to an Ears feature, because Ears draws them itself, following the limb they hang from.

## Feature names

Alongside the vanilla feature layer names, [`apoli:prevent_feature_render`](/docs/datapack/powers/prevent_feature_render) accepts:

| Name | Hides |
| --- | --- |
| `skin_layers_3d` | Every 3D Skin Layers layer: hat, jacket, sleeves and trouser legs |
| `ears` | Every Ears feature |
| `ears_ears` | The ears |
| `ears_horn` | The horns |
| `ears_snout` | The snout |
| `ears_tail` | The tail |
| `ears_wings` | The wings |
| `ears_cape` | The Ears cape |
| `ears_chest` | The chest piece |
| `ears_claw_left_arm`, `ears_claw_right_arm`, `ears_claw_left_leg`, `ears_claw_right_leg` | The matching claws |
| `ears_halo` | The halo (Ears 2) |
| `ears_digitigrade_left_leg`, `ears_digitigrade_right_leg` | The matching digitigrade leg (Ears 2) |

An `apoli:prevent_feature_render` with no `feature` or `features` at all means every feature layer, and that includes both mods.

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

This flattens the skin back to two dimensions and hides the tail and wings, which helps while a form change power has the holder in a shape those features don't belong on.

> [!NOTE]
> The forced white overlay of `apoli:model_color` (`red`, `green` and `blue` all set to `1`) reaches the 3D layers but not Ears. Ears' vertex path takes no overlay coordinate, so a whitened player keeps normally coloured ears.

Both integrations run on the client. A dedicated server neither knows nor cares whether these mods are installed, so a pack using the feature names above loads either way.
