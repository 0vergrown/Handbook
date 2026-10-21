---
title: "Dimension (Entity Condition Type)"
description: "Checks whether the entity is in a given dimension."
navigation_title: "Dimension"
---

Checks whether the entity is in a given dimension.

Type ID: `apoli:dimension`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `dimension` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the dimension the entity must be in. The vanilla dimensions are `minecraft:overworld`, `minecraft:the_nether` and `minecraft:the_end`, and the IDs of modded or custom dimensions work too. |

## Examples

```json
"condition": {
    "type": "apoli:dimension",
    "dimension": "minecraft:overworld",
    "inverted": true
}
```

This checks whether the entity is anywhere other than the Overworld.
