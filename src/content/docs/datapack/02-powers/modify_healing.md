---
title: "Modify Healing (Power Type)"
description: "Modifies the amount of health you get from all sources of healing (e.g natural regen, instant health effect, regeneration effect)"
navigation_title: "Modify Healing"
---

Modifies the amount of health you get from all sources of healing _(e.g natural regen, instant health effect, regeneration effect)_

Type ID: `apoli:modify_healing`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will be applied to your healing bonus.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will be applied to your healing bonus.

## Examples

```json
{
    "type": "apoli:modify_healing",
    "modifier": {
        "operation": "multiply_total",
        "value": 1
    }
}
```

This example will double the effectiveness of all healing used on you.
```json
{
    "type": "apoli:modify_healing",
    "modifier": {
        "operation": "multiply_total",
        "value": -0.5
    }
}
```

This example will half the effectiveness of all healing used on you.
