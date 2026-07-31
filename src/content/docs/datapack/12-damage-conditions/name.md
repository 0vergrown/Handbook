---
title: "Name (Damage Condition Type)"
description: "Checks whether the damage source uses a specific name."
navigation_title: "Name"
---

Checks whether the damage source uses a specific name.

Type ID: `apoli:name`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`name` | String | |  Name the damage source should have to pass the check. See List of Damage Source Names for possible values.

## Examples

```json
"damage_condition": {
    "type": "apoli:name",
    "name": "inWall"
}
```

This example will check if the damage source name is `inWall`, meaning that the condition will evaluate to true if the entity is suffocating in a block.
