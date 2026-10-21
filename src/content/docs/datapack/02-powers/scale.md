---
title: "Scale (Power Type)"
description: "Resizes the entity's hitbox, model, eye height and size-based physics while the power is held."
navigation_title: "Scale"
---

Resizes the entity for as long as it has the power. One power can drive several scale types at once, and the value can be an [Expression](/docs/datapack/data-types/expression), so size can follow health, a resource or anything else you can compute.

Type ID: `apoli:scale`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `scale_types` | [Scale Type](/docs/datapack/data-types/scale-type) or [Array](/docs/datapack/data-types/array) of them | `apoli:base` | The scale types this power multiplies. |
| `scale` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | A plain multiplier. `2` is twice the size and `0.5` is half. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A modifier applied to `scale`, or to `1.0` when there is no `scale`. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers, applied in operation order. |

`scale_type` is accepted as another spelling of `scale_types`, and the `pehkui:` namespace resolves to the matching Apoli scale type, so a Pehkui ID like `pehkui:height` works.

The power multiplies the size instead of replacing it. Two `apoli:scale` powers on the same entity both apply, and a value set with the `/apoli:scale` command multiplies on top of them.

## Examples

Twice as big while the power is held:

```json
{
    "type": "apoli:scale",
    "scale_types": "apoli:base",
    "scale": 2
}
```

Several scale types get the same factor, each measured against its own current value. This makes the model five times bigger in every direction and leaves the hitbox alone:

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

Leave the hitbox alone and only change what people see:

```json
{
    "type": "apoli:scale",
    "scale_types": ["apoli:model_width", "apoli:model_height"],
    "scale": 1.6
}
```

Make the inventory preview bigger. The preview ignores every other scale type, so on its own this leaves the entity's real size alone:

```json
{
    "type": "apoli:scale",
    "scale_types": "apoli:doll",
    "scale": 2
}
```

> [!NOTE]
> A scale that affects the hitbox moves the entity's bounding box. Shrinking is safe, and growing in a tight space pushes the entity out the way vanilla does when it stands up from crawling.
