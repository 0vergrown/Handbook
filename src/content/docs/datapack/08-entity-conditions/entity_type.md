---
title: "Entity Type (Entity Condition Type)"
description: "Checks whether the entity is of a given entity type, or in an entity type tag."
navigation_title: "Entity Type"
---

Checks whether the entity is of a given entity type.

Type ID: `apoli:entity_type`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The entity type the entity must have. Start it with `#` to match an entity type tag instead, as in `"#minecraft:skeletons"`. |

## Examples

```json
"condition": {
    "type": "apoli:entity_type",
    "entity_type": "minecraft:creeper"
}
```

This checks whether the entity is a creeper.

```json
"condition": {
    "type": "apoli:entity_type",
    "entity_type": "#minecraft:skeletons"
}
```

This passes for any entity in the `minecraft:skeletons` tag.
