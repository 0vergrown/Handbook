---
title: "Scale (Power Type)"
description: "Resizes the entity — hitbox, model, eye height and the physics that follow from size — for as long as the power is held."
navigation_title: "Scale"
---

Resizes the entity for as long as the power is held. One power can drive several scale types at once, and the value can be an [Expression](/docs/datapack/data-types/expression), so size can follow health, a resource, or anything else you can compute.

Type ID: `apoli:scale`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `scale_types` | [Scale Type](/docs/datapack/data-types/scale-type) or [Array](/docs/datapack/data-types/array) of them | `apoli:base` | Which scale types this power multiplies. |
| `scale` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | A straight multiplier. `2` is twice the size, `0.5` is half. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A modifier applied to `scale` (or to `1.0` when `scale` is absent). |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers, applied in operation order. |

`scale_type` is accepted as a spelling of `scale_types`, and a `pehkui:` namespace resolves to the matching Apoli scale type, so a Pehkui-flavoured id like `pehkui:height` works.

The power **multiplies**; it never replaces. Two `apoli:scale` powers on the same entity both apply, and a `/apoli:scale` value set by a command multiplies on top of them.

## Examples

Twice as big while the power is held:

```json
{
    "type": "apoli:scale",
    "scale_types": "apoli:base",
    "scale": 2
}
```

Several scales at once — every type in the list gets the same factor, measured against its own current
value, so this makes the model five times bigger in every direction and leaves the hitbox alone:

```json
{
    "type": "apoli:scale",
    "scale_types": [
        "apoli:model_width",
        "apoli:model_height"
    ],
    "scale": 5
}
```

Shrink as you lose health, using an expression:

```json
{
    "type": "apoli:scale",
    "scale_types": ["apoli:width", "apoli:height"],
    "modifier": {
        "operation": "set_total",
        "amount": "clamp(health / max_health, 0.35, 1)"
    }
}
```

Keep the hitbox alone and only change what people see:

```json
{
    "type": "apoli:scale",
    "scale_types": ["apoli:model_width", "apoli:model_height"],
    "scale": 1.6
}
```

> A scale that affects the hitbox moves the entity's bounding box. Shrinking is safe; growing inside a tight space pushes the entity the way vanilla does when it stands up from a crawl.
