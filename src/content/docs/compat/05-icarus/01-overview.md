---
title: Icarus
description: The apoli:wings flight power, backed by Icarus.
---

With [Icarus](https://modrinth.com/mod/icarus) installed, Apoli registers one extra power type: [`apoli:wings`](/docs/compat/icarus/wings) — flapping flight with Icarus's stamina bar, granted by a power instead of by an equipped item.

This type is **registration-gated**: it only exists when Icarus is loaded. A data pack that uses it without Icarus will fail to load that power.

## Wings as body parts

Icarus wings answer to the [body part names](/docs/datapack/data-types/body-part#wings-and-ears-features) `right_wing`, `left_wing` and `wings` — or `icarus_right_wing`, `icarus_left_wing` and `icarus_wings`, the names Figura uses for them — whether they come from an equipped item or from `apoli:wings`. That part is **behaviour-gated**: the names parse without Icarus and simply have nothing to act on.

```json
{
    "type": "apoli:modify_model_parts",
    "transformations": [
        {"model_part": "right_wing", "type": "visible", "value": 0},
        {"model_part": "left_wing", "type": "x_scale", "value": -0.5},
        {"model_part": "left_wing", "type": "y_scale", "value": -0.5},
        {"model_part": "left_wing", "type": "z_scale", "value": -0.5}
    ]
}
```

Hides the right wing and draws the left one at half size, still rooted to the back. Every transformation type works on a wing, and [`apoli:model_color`](/docs/datapack/powers/model_color) can tint one through its `parts`.

Wings drawn by the [Icarus: Re-Winged](https://modrinth.com/mod/icarus-rewinged) add-on take the same edits and tints, both its own wing items and the Icarus wings it redraws. The edits happen while the model is drawn, so they need Apoli on the viewing player's client.

## Types

| Type | Kind | What it does |
| --- | --- | --- |
| [`apoli:wings`](/docs/compat/icarus/wings) | Power | Grants flapping wings with a stamina bar. |
