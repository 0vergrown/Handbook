---
title: "In Tag (Fluid Condition Type)"
description: "Checks whether the fluid is in a specified tag."
navigation_title: "In Tag"
---

Checks whether the fluid is in a specified tag.

Type ID: `apoli:in_tag`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`tag` | [Identifier](/docs/datapack/data-types/identifier) | |  ID of the tag which the fluid should be in to pass the check. The leading `#` is optional.

## Examples

```json
"fluid_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:water"
}
```

This example will check if the fluid is included in the `#minecraft:water` (`data\minecraft\tags\fluids`) block tag.
