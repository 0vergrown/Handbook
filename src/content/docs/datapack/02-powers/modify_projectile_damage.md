---
title: "origins:modify_projectile_damage"
description: "[Power Type](../powertypes.md)"
---

Power Type

Modifies how much damage the projectile of the entity that has the power deals.

Type ID: `origins:modify_projectile_damage`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`damage_condition` | Damage Condition Type | _optional_ | If specified, the specified modifier(s) and action(s) will only apply if the dealt damage fulfills by this condition.
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will apply to the damage amount.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will apply to the damage amount.
`target_condition` | Entity Condition Type | _optional_ | If specified, the specified modifier(s) and action(s) will only apply if the the entity that has been hit fulfills this condition.
`self_action` | Entity Action Type | _optional_ | If specified, this action will be executed on the 'actor' entity (the entity that has the power) whenever the modifier(s) are applied.
`target_action` | Entity Action Type | _optional_ | If specified, this action will be executed on the the entity that has been hit whenever the modifier(s) are applied.



## Examples

```json
{
    "type": "origins:modify_projectile_damage",
    "damage_condition": {
        "type": "origins:projectile",
        "projectile": "minecraft:spectral_arrow"
    },
    "modifier": {
        "operation": "addition",
        "value": 8.0
    }
}
```

This example will modify the damage of the Spectral Arrow projectile entity shot by the entity that has the power to deal additional 4 hearts of damage.

