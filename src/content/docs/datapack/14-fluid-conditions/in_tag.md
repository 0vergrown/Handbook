---
title: "apoli:in_tag"
description: "Checks whether the fluid is in a specified tag."
---

Checks whether the fluid is in a specified tag.

Type ID: `apoli:in_tag`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`tag` | [Identifier](/docs/datapack/data-types/identifier) | |  ID of the tag which the fluid should be in to pass the check.

## Examples

```json
"fluid_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:water"
}
```

This example will check if the fluid is included in the `#minecraft:water` (`data\minecraft\tags\fluids`) block tag.

