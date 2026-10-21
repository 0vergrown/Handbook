---
title: "Moving (Entity Condition Type)"
description: "Checks whether the entity is moving, horizontally, vertically or both."
navigation_title: "Moving"
---

Checks whether the entity is moving.

Type ID: `apoli:moving`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `horizontally` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether horizontal movement counts. |
| `vertically` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether vertical movement counts. |

## Examples

```json
"condition": {
    "type": "apoli:moving"
}
```

This checks whether the entity is moving either horizontally or vertically.

```json
"condition": {
    "type": "apoli:moving",
    "horizontally": false
}
```

This checks whether the entity is moving vertically, whatever it is doing horizontally.

```json
"condition": {
    "type": "apoli:moving",
    "vertically": false
}
```

This checks whether the entity is moving horizontally, which is the check to use for a walk animation.

## How movement is measured

On the server, and on a client for an entity that client moves itself (your own player, or a boat or horse you are steering), the condition reads the entity's velocity. Everything else a client only watches, such as other players and mobs, is measured by how far it moved since the previous tick, so a render condition like a walk cycle on [apoli:custom_model_render](/docs/datapack/powers/custom_model_render) plays for other players' models too.

> [!TIP]
> An entity standing on the ground can still carry a small downward velocity from gravity, which counts as moving vertically. To tell walking from standing still, set `vertically` to `false`.
