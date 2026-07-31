---
title: "Entity Group (Entity Condition Type)"
description: "Checks whether the entity is of a specific entity group."
navigation_title: "Entity Group"
---

Checks whether the entity is of a specific entity group.

Type ID: `apoli:entity_group`

!!! note

    See [Minecraft Wiki: Mob (Classification)](https://minecraft.wiki/w/Mob#Classification) for more information about entity groups.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`group` | String | |  Entity group required for the entity to pass the check. One of `default`, `undead`, `arthropod`, `illager` and `aquatic`.

## Examples

```json
"condition": {
    "type": "apoli:entity_group",
    "group": "undead"
}
```

This example will check if the entity is included in the `undead` entity group.
