---
title: "Entity Type Tag-like (Data Type)"
description: "An array of entity type IDs and entity type tags, written like the entries of a tag."
navigation_title: "Entity Type Tag-like"
---

An [Array](/docs/datapack/data-types/array) of identifiers that each name an entity type, or an entity type tag when they start with `#`, written the same way as the entries of a tag.

## Examples

```json
"entity_types": [
    "minecraft:dolphin"
]
```

This contains the `minecraft:dolphin` entity type.

```json
"entity_types": [
    "#minecraft:fall_damage_immune",
    "#minecraft:skeletons",
    "minecraft:creeper"
]
```

This contains the `#minecraft:fall_damage_immune` and `#minecraft:skeletons` entity type tags and the `minecraft:creeper` entity type.
