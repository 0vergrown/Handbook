---
title: "Model Color (Power Type)"
description: "Multiplies the colour of the entity's texture by the colour values you set."
navigation_title: "Model Color"
---

Multiplies the base colour of the texture of the entity that has the power by the colour values you set.

Type ID: `apoli:model_color`

The tint shows in first person as well as third person, and it can tint individual model parts instead of the whole model (see the `parts` field). Apace's Apoli does neither.

> [!NOTE]
> The tint multiplies, so it can only darken the texture, and multiplying by white (1.0, 1.0, 1.0) would normally do nothing. As a special case, writing out `"red": 1.0, "green": 1.0, "blue": 1.0`, with all three present in the JSON, whitens the model using vanilla's white overlay channel. That is the same effect as a charged creeper's flash, capped at roughly 75% white by the render pipeline. Leaving the fields out, so they only default to 1.0, doesn't whiten the model, so a power that only sets `alpha` for a ghostly look keeps its normal colours. When the three fields are expressions, the model whitens on the frames where all three come out at 1.0 or more. This works for the whole model and for individual `parts` entries alike.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `red` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | Multiplies the red component of the texture, from 0.0 to 1.0. |
| `green` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | Multiplies the green component of the texture, from 0.0 to 1.0. |
| `blue` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | Multiplies the blue component of the texture, from 0.0 to 1.0. |
| `alpha` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | Multiplies the alpha (transparency) component of the texture, from 0.0 to 1.0. |
| `parts` | [Array](/docs/datapack/data-types/array) of Part Color | _optional_ | If set, tints the listed model parts individually instead of the whole model. Each entry is a Part Color object (see below), and parts that aren't listed are left alone. The top-level `red`, `green`, `blue` and `alpha` fields are ignored when `parts` is present. |

### Part Color object

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `part` | [Body Part](/docs/datapack/data-types/body-part) | _required_ | The model part to tint: a limb such as `head` or `right_arm`, a skin layer such as `jacket`, or a group such as `arms`, `legs`, `upper`, `lower` or `whole`. `head` also covers the hat layer, `body` covers the jacket, each arm covers its sleeve and each leg covers its trousers. It can also name an Icarus wing or an Ears feature, such as `left_wing`, `wings`, `horns` and `tail`, from the [wing and Ears names](/docs/datapack/data-types/body-part#wings-and-ears-features). Where two entries cover the same part, their colours multiply. |
| `red` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | Red multiplier for this part, from 0.0 to 1.0. |
| `green` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | Green multiplier for this part, from 0.0 to 1.0. |
| `blue` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | Blue multiplier for this part, from 0.0 to 1.0. |
| `alpha` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | Alpha multiplier for this part, from 0.0 to 1.0. |
| `condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, this entry only tints while the entity with the power passes the condition. |

### Expressions

Any of the four channels can be an [expression](/docs/datapack/data-types/expression) instead of a number. It is evaluated every frame, on the viewer's client, against the entity with the power, so it can follow anything the client knows about that entity: its health, its synced attributes (`attribute[...]`), its resources or the time of day. Plain numbers cost nothing extra.

## Examples

```json
{
  	"type": "apoli:model_color",
  	"red": 0.5,
  	"green": 0.5,
  	"alpha": 0.7
}
```

This gives the entity's whole texture a blueish tint and makes it slightly transparent.

```json
{
  	"type": "apoli:model_color",
  	"parts": [
    	{ "part": "head", "red": 1.0, "green": 0.2, "blue": 0.2 },
    	{ "part": "left_arm", "red": 0.2, "green": 0.4, "blue": 1.0 }
  	]
}
```

This tints only the head red and the left arm blue, and leaves the rest of the model its normal colour.

```json
{
  	"type": "apoli:model_color",
  	"green": "clamp(health / max_health, 0.2, 1)",
  	"blue": "clamp(health / max_health, 0.2, 1)",
  	"alpha": "if(attribute[minecraft:generic.armor] > 10, 1, 0.6)"
}
```

This drains the green and blue out of the model as the entity loses health, so it turns redder the more hurt it is, and makes it translucent while its armor value is 10 or less.

## Disguises

The colour follows a [disguise](/docs/datapack/entity-actions/disguise_as). A disguised entity's replacement model is tinted by the powers the real entity has, so a disguise can be recoloured, faded out or made translucent like an undisguised entity.

`parts` only applies where the disguise's model has those parts. Humanoid disguises (a zombie, a skeleton or another player) accept the usual `head`, `body`, arm and leg parts, while a model with none of them, like an iron golem, only takes the whole-model colour.
