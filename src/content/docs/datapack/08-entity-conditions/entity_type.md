---
title: "Entity Type (Entity Condition Type)"
description: "Checks whether the entity is of a specific entity type."
navigation_title: "Entity Type"
---

Checks whether the entity is of a specific entity type.

Type ID: `apoli:entity_type`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_type` | [Identifier](/docs/datapack/data-types/identifier) | | The entity type the entity needs to have. Prefix with `#` to match an entity type tag instead — `"#minecraft:skeletons"`.

## Examples

```json
"condition": {
    "type": "apoli:entity_type",
    "entity_type": "minecraft:creeper"
}
```

This example will check if the entity is a Creeper.

```json
"condition": {
    "type": "apoli:entity_type",
    "entity_type": "#minecraft:skeletons"
}
```

This example passes for any entity in the `minecraft:skeletons` tag.
