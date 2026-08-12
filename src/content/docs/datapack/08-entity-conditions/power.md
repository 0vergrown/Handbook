---
title: "Power (Entity Condition Type)"
description: "Checks whether the entity has a specified power. Mostly used for Origin conditions in layers"
navigation_title: "Power"
---

Checks whether the entity has a specified power. Mostly used for Origin conditions in layers

Type ID: `apoli:power`

> Make sure to use the [apoli:living](/docs/datapack/entity-conditions/living) to check if the entity is a "living entity", otherwise, the game will crash since only living entities can have powers.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`power` | Identifier | | The namespace and ID of the power the entity needs to have to pass the check.
`source` | Identifier | _optional_ | If specified, the condition will check if the power is from the specified power source.

## Examples

```json
"condition": {
    "type": "apoli:power",
    "power": "origins:damage_from_potions"
}
```

This example will check if the player has the [`origins:damage_from_potions`](https://github.com/apace100/origins-fabric/blob/master/src/main/resources/data/origins/powers/damage_from_potions.json) power in its origin.
