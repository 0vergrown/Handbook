---
title: "Modify XP Gain (Power Type)"
description: "Modifies how much XP the player gains when they pick up an experience orb."
navigation_title: "Modify XP Gain"
---

Modifies how much XP the player gains when they pick up an experience orb.

Type ID: `apoli:modify_xp_gain`

> Be careful not to make this go too high, as then the player would be able to gain more experience from dying.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will apply to the experience gained.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will apply to the experience gained.

## Examples

```json
{
    "type": "apoli:modify_xp_gain",
    "modifier": {
        "operation": "multiply_base",
        "value": 2.0
    }
}
```

This example will triple the gained experience from experience orbs.
