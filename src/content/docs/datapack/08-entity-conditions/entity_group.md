---
title: "Entity Group (Entity Condition Type)"
description: "Checks whether the entity belongs to an entity group, such as undead or arthropod."
navigation_title: "Entity Group"
---

Checks whether the entity belongs to an entity group, such as undead or arthropod.

Type ID: `apoli:entity_group`

> [!TIP]
> [Minecraft Wiki: Mob (Classification)](https://minecraft.wiki/w/Mob#Classification) explains the entity groups.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `group` | [String](/docs/datapack/data-types/string) | _required_ | The group the entity must be in: `default`, `undead`, `arthropod`, `illager` or `aquatic`. |

## Examples

```json
"condition": {
    "type": "apoli:entity_group",
    "group": "undead"
}
```

This checks whether the entity is in the `undead` group.
