---
title: "Self Glow (Power Type)"
description: "Makes the entity that has the power glow if certain conditions are met."
navigation_title: "Self Glow"
---

Makes the entity that has the power glow if certain conditions are met.

Type ID: `apoli:self_glow` *(alias of [`apoli:entity_glow`](/docs/datapack/powers/entity_glow) with `self_glow_target` defaulting to `true`)*

> The power works on **any entity**, including non-living ones such as projectiles — grant it to an arrow or a custom projectile and the projectile glows.


> You can use a color picker website and divide the RGB values by 255 to get the values *(e.g: ranging from 0.0 to 1.0)* to be used for the power type.


> The conditions specified in the `entity_condition` and `bientity_condition` fields are only evaluated on the **client-side**, therefore, using any condition types that only work on the server-side will not work.


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_condition` | Entity Condition Type | _optional_ | If specified, only entities that fulfill this condition will see the entity that has the power glow.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, only entities that fulfill this bi-entity condition in relation to the entity that has the power will see the entity that has the power glow.
`use_teams` | Boolean | `true` | Determines whether glowing entities should use their team's color with their glow. If set to false, the entity will instead use the `red`, `green` and `blue` fields within this power type.
`red` | Float | `1.0` | Value by which the red component of the glow will be multiplied. Range: 0.0 - 1.0.
`green` | Float | `1.0` | Value by which the green component of the glow will be multiplied. Range: 0.0 - 1.0.
`blue` | Float | `1.0` | Value by which the blue component of the glow will be multiplied. Range: 0.0 - 1.0.

## Examples

```json
{
    "type": "apoli:self_glow",
    "use_teams": false,
    "red": 0.56862745098,
    "green": 0.89019607843,
    "blue": 0.65098039215,
    "condition": {
        "type": "apoli:in_rain"
    }
}
```

This example will make the entity that has the power glow for everyone if the entity in question is in rain.

```json
{
    "type": "apoli:self_glow",
    "bientity_condition": {
        "type": "apoli:can_see"
    },
    "use_teams": false,
    "red": 1.0,
    "green": 0.0,
    "blue": 0.0
}
```

This example will make the entity that has the power glow for the entity that can see the said entity.
