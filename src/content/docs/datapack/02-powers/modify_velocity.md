---
title: "Modify Velocity (Power Type)"
description: "Modifies all velocity in a specified axis."
navigation_title: "Modify Velocity"
---

Modifies all velocity in a specified axis.

Type ID: `apoli:modify_velocity`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`axes` | Array of Identifiers| `["x","y","z"]` | Used to specify the axes affected by this modifier. 
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will apply to velocity in the specified axes.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will apply to the specified axes.

## Examples

```json
{
  "type": "apoli:modify_velocity",
  "modifier": {
    "value": -2,
    "operation": "multiply_total"
  },
  "axes": [
    "x",
    "y",
    "z"
  ]
}
```

This example will make all of the player's velocity reversed. You'll fall upwards, your movement keys will be inverted, etc.
