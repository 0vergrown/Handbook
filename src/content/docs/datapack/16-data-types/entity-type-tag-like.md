---
title: "Entity Type Tag-like (Data Type)"
description: "Entity Type Tag-likes are an Array of Identifiers that refers to an entity type or an entity type tag (if prefixed with #), similar to how entries in a tag…"
navigation_title: "Entity Type Tag-like"
---

Entity Type Tag-likes are an [Array](/docs/datapack/data-types/array) of Identifiers (Data Type) that refers to an entity type or an entity type tag (if prefixed with `#`), similar to how entries in a tag are defined.

## Examples

```json
"entity_types": [
    "minecraft:dolphin"
]
```

This example defines an entity type tag-like that contains the `minecraft:dolphin` entity type.

```json
"entity_types": [
    "#minecraft:fall_damage_immune",
    "#minecraft:skeletons",
    "minecraft:creeper"
]
```

This example defines an entity type tag-like that contains the `#minecraft:fall_damage_immune` and `#minecraft:skeletons` entity type tags, and the `minecraft:creeper` entity type.
