---
title: "In Tag (Damage Condition Type)"
description: "Checks whether the damage type is in a damage type tag."
navigation_title: "In Tag"
---

Checks whether the damage's type is in a damage type tag.

Type ID: `apoli:in_tag`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the damage type tag. The leading `#` is optional. |

## Examples

```json
"damage_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:is_drowning"
}
```

This checks whether the damage counts as drowning damage.
