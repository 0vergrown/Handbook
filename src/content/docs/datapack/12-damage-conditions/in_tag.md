---
title: "In Tag (Damage Condition Type)"
description: "Checks whether the type of this damage is in a specified tag."
navigation_title: "In Tag"
---

Checks whether the type of this damage is in a specified tag.

Type ID: `apoli:in_tag`

## Fields

| Field | Type                   | Default | Description                                                                           |
|-------|------------------------|---------|---------------------------------------------------------------------------------------|
| `tag` | [Identifier](/docs/datapack/data-types/identifier) |         | The namespace and ID of the tag which the damage type should be in to pass the check. The leading `#` is optional. |

## Examples

```json
"damage_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:is_drowning"
}
```
This example will check if the damage is considered drowning damage.
