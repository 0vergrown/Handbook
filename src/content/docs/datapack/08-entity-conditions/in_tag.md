---
title: "In Tag (Entity Condition Type)"
description: "Checks whether the entity's type is in an entity type tag."
navigation_title: "In Tag"
---

Checks whether the entity's type is in an entity type tag.

Type ID: `apoli:in_tag`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the entity type tag. The leading `#` is optional. |

## Examples

```json
"condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:skeletons"
}
```

This checks whether the entity is in the `#minecraft:skeletons` entity type tag (`data/minecraft/tags/entity_types/skeletons.json`).
