---
title: "origins:in_tag"
description: "[Biome Condition Type](../biomeconditiontypes.md)"
---

Biome Condition Type

Checks whether the biome is in a specified tag.

Type ID: `origins:in_tag`


## Fields

Field | Type | Default | Description
------|------|---------|------------
`tag` | Identifier | | The namespace and ID of the tag which the biome should be in to pass the check.


## Examples

```json
"condition": {
    "type": "origins:in_tag",
    "tag": "minecraft:allows_surface_slime_spawn"
}
```

This example will check if the biome is included in the `#minecraft:allows_surface_slime_spawn` (`data/minecraft/tags/worldgen/biome/allows_surface_slime_spawn.json`) biome tag.



```json
"condition": {
    "type": "origins:in_tag",
    "tag": "minecraft:is_forest",
    "inverted": true
}
```

This example will check if the biome is **not** included in the `#minecraft:is_forest` (`data/minecraft/tags/worldgen/biome/is_forest.json`) biome tag.

