---
title: "In Tag (Fluid Condition Type)"
description: "Checks whether the fluid is in a fluid tag."
navigation_title: "In Tag"
---

Checks whether the fluid is in a fluid tag.

Type ID: `apoli:in_tag`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the fluid tag. The leading `#` is optional. |

## Examples

```json
"fluid_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:water"
}
```

This checks whether the fluid is in the `#minecraft:water` fluid tag (`data/minecraft/tags/fluids/water.json`).
