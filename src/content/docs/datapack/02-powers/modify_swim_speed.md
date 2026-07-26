---
title: "origins:modify_swim_speed"
description: "[Power Type](../powertypes.md)"
---

Power Type

Modifies how fast the entity that has the power swims.

Type ID: `origins:modify_swim_speed`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will apply to the swim speed.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will apply to the swim speed.



## Examples

```json
{
    "type": "origins:modify_swim_speed",
    "modifier": {
        "operation": "addition",
        "value": 0.025
    }
}
```

This power will make the entity that has the power swim/walk significantly faster in water.

