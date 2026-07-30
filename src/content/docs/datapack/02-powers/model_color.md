---
title: "apoli:model_color"
description: "Multiplies the luminosity of the base color of the texture of the entity that has the power by the specified color values."
---

Multiplies the luminosity of the base color of the texture of the entity that has the power by the specified color values.

Type ID: `apoli:model_color`

> Unlike the original Apoli, this re-implementation renders the tint in **first person** as well as third person, and can optionally tint **individual model parts** instead of the whole model (see the `parts` field).

> **White:** the tint is multiplicative, so it can only darken the texture — multiplying by white (1.0/1.0/1.0) would normally do nothing. As a special case, **explicitly** writing `"red": 1.0, "green": 1.0, "blue": 1.0` (all three must be present in the JSON) whitens the model using the vanilla white-overlay channel (the same effect as a charged creeper's flash, capped at roughly 75% white by the render pipeline). Omitting the fields (so they merely default to 1.0) does **not** trigger the whitening — an alpha-only ghost power keeps its normal colors. This works for the whole model and for individual `parts` entries alike.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`red` | Float | `1.0` | Value by which the red component of the texture will be multiplied. Range: 0.0 - 1.0.
`green` | Float | `1.0` | Value by which the green component of the texture will be multiplied. Range: 0.0 - 1.0.
`blue` | Float | `1.0` | Value by which the blue component of the texture will be multiplied. Range: 0.0 - 1.0.
`alpha` | Float | `1.0` | Value by which the alpha (= transparency) component of the texture will be multiplied. Range: 0.0 - 1.0.
`parts` | Array of Part Color | _optional_ | If specified, tints the listed model parts individually instead of the whole model. Each entry is a **Part Color** object (see below). Parts that are not listed are left untouched. The top-level `red`/`green`/`blue`/`alpha` fields are ignored when `parts` is present.

### Part Color object

Field  | Type | Default | Description
-------|------|---------|-------------
`part` | String | — | The model part to tint. One of `head`, `hat`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg` (and, for players, `right_sleeve`, `left_sleeve`, `right_pants`, `left_pants`, `jacket`). Matching ignores case and separators, so `right_arm`, `rightArm` and `rightarm` are equivalent. `head` also covers the hat layer, `body` covers the jacket, each arm covers its sleeve and each leg covers its trousers.
`red` | Float | `1.0` | Red multiplier for this part. Range: 0.0 - 1.0.
`green` | Float | `1.0` | Green multiplier for this part. Range: 0.0 - 1.0.
`blue` | Float | `1.0` | Blue multiplier for this part. Range: 0.0 - 1.0.
`alpha` | Float | `1.0` | Alpha multiplier for this part. Range: 0.0 - 1.0.

## Examples

```json
{
  	"type": "apoli:model_color",
  	"red": 0.5,
  	"green": 0.5,
  	"alpha": 0.7
}
```

This example will give the entity's whole texture a blue-ish tint and makes it slightly transparent.

```json
{
  	"type": "apoli:model_color",
  	"parts": [
    	{ "part": "head", "red": 1.0, "green": 0.2, "blue": 0.2 },
    	{ "part": "left_arm", "red": 0.2, "green": 0.4, "blue": 1.0 }
  	]
}
```

This example tints only the head red and the left arm blue, leaving the rest of the model its normal color.

## Disguises

The colour follows a [disguise](/docs/datapack/entity-actions/disguise_as): a disguised entity's replacement
model is tinted by the powers **the real entity** holds, so a disguise can be recoloured, faded out or made
translucent exactly like an undisguised one.

`parts` only applies where the disguise's model has those parts — humanoid disguises (zombie, skeleton,
another player) accept the usual `head` / `body` / arm and leg parts, while a model that has none of them, like
an Iron Golem, only takes the whole-model colour.
