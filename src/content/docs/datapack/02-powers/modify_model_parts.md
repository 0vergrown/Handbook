---
title: "apoli:modify_model_parts"
description: "Transforms parts of the holder's biped model — rotation, scale, pivot offset and visibility — every frame."
---

Transforms parts of the holder's biped model — rotation, scale, pivot offset and visibility — every frame.

Type ID: `apoli:modify_model_parts`

> This is a client-side rendering power and only affects biped models (players and humanoid mobs). On players, an edit to a base part (e.g. `body`) is also applied to its skin-overlay layer (e.g. the jacket).

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`transformations` | Array of Model Part Transformation | — | The list of edits to apply. Each entry targets one part and one property.

## Examples

```json
{
   "type":"apoli:modify_model_parts",
   "transformations":[
      {
         "model_part":"head",
         "type":"x_scale",
         "value":0.5
      },
      {
         "model_part":"head",
         "type":"y_scale",
         "value":0.5
      },
      {
         "model_part":"head",
         "type":"z_scale",
         "value":0.5
      },
      {
         "model_part":"right_arm",
         "type":"pitch",
         "value":-1.2,
         "override_animation":true
      }
   ]
}
```

This grows the head by 50% on every axis and locks the right arm to a fixed raised pitch, ignoring the walking/idle animation.

```json
{
   "type":"apoli:modify_model_parts",
   "transformations":[
      {
         "model_part":"left_leg",
         "type":"visible",
         "value":0
      }
   ]
}
```

This hides the left leg.
