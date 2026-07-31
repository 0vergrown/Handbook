---
title: "Modify Swim Speed (Power Type)"
description: "Modifies how fast the entity that has the power swims."
navigation_title: "Modify Swim Speed"
---

Modifies how fast the entity that has the power swims.

Type ID: `apoli:modify_swim_speed`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will apply to the swim speed.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will apply to the swim speed.

## Examples

```json
{
    "type": "apoli:modify_swim_speed",
    "modifier": {
        "operation": "addition",
        "value": 0.025
    }
}
```

This power will make the entity that has the power swim/walk significantly faster in water.
