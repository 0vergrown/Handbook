---
title: "In Tag (Biome Condition Type)"
description: "Checks whether the biome is in a biome tag."
navigation_title: "In Tag"
---

Checks whether the biome is in a biome tag.

Type ID: `apoli:in_tag`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the biome tag. The leading `#` is optional. |

## Examples

```json
"condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:allows_surface_slime_spawn"
}
```

This checks whether the biome is in the `#minecraft:allows_surface_slime_spawn` biome tag (`data/minecraft/tags/worldgen/biome/allows_surface_slime_spawn.json`).

```json
"condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:is_forest",
    "inverted": true
}
```

This checks whether the biome is anything other than a biome in the `#minecraft:is_forest` biome tag (`data/minecraft/tags/worldgen/biome/is_forest.json`).
