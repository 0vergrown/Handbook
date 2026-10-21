---
title: "Submerged In (Entity Condition Type)"
description: "Checks whether the entity's eyes are in a fluid from a fluid tag."
navigation_title: "Submerged In"
---

Checks whether the entity's eyes are in a fluid from a given fluid tag.

Type ID: `apoli:submerged_in`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `fluid` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the fluid tag to check, most often `minecraft:water` or `minecraft:lava`. The leading `#` is optional. |

## Examples

```json
"condition": {
    "type": "apoli:submerged_in",
    "fluid": "minecraft:water"
}
```

This checks whether the entity is underwater.
