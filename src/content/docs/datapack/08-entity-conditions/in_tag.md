---
title: "origins:in_tag"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks whether the entity's entity type is in a specific tag.

Type ID: `origins:in_tag`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`tag` | Identifier | | The namespace and ID of the entity type tag the entity type needs to be in to pass the check.


## Examples

```json
"condition": {
    "type": "origins:in_tag",
    "tag": "minecraft:skeletons"
}
```

This example will check if the entity is inside the `#minecraft:skeletons` entity type tag. (`data/minecraft/tags/entity_types/skeletons.json`)

