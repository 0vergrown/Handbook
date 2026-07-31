---
title: "Modify Damage Dealt (Power Type)"
description: "Modifies how much mêlée damage the entity that has the power deals."
navigation_title: "Modify Damage Dealt"
---

Modifies how much mêlée damage the entity that has the power deals.

Type ID: `apoli:modify_damage_dealt`

> In the context of this power type, the '**actor**' entity is the entity that has the power whilst the '**target**' entity is the entity that was hit.

## Fields

| Field                | Type                                     | Default    | Description                                                                                                                                                             |
|----------------------|------------------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bientity_action`    | Bi-entity Action Type                    | _optional_ | If specified, this action will be executed on either or both the '**actor**' and '**target**' entities whenever the modifier(s) is/are applied.                         |
| `self_action`        | Entity Action Type                       | _optional_ | If specified, this action will be executed on the '**actor**' entity whenever the modifier(s) is/are applied.                                                           |
| `target_action`      | Entity Action Type                       | _optional_ | If specified, this action will be executed on the '**target**' entity whenever the modifier(s) is/are applied.                                                          |
| `bientity_condition` | Bi-entity Condition Type                 | _optional_ | If specified, the specified action(s)/modifier(s) will only be executed/applied if this condition is fulfilled by either or both '**actor**' and '**target**' entities. |
| `target_condition`   | Entity Condition Type                    | _optional_ | If specified, the specified actions/modifiers will only be executed/applied if this condition is fulfilled by the '**target**' entity.                                  |
| `damage_condition`   | Damage Condition Type                    | _optional_ | If specified, the specified actions/modifiers will only be executed/applied if this condition is fulfilled by the damage dealt by the '**actor**' entity.               |
| `modifier`           | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier)           | _optional_ | If specified, this modifier will be applied to the damage dealt by the '**actor**' entity.                                                                              |
| `modifiers`          | [Array](/docs/datapack/data-types/array) of Attribute Modifiers | _optional_ | If specified, these modifiers will be applied t othe damage dealt by the '**actor**' entity.                                                                            |

## Examples

```json
{
    "type": "apoli:modify_damage_dealt",
    "bientity_condition": {
        "type": "apoli:owner"
    },
    "modifier": {
        "operation": "multiply_total",
        "value": -1
    }
}
```
This example will nullify the damage dealt to an entity if that entity is owned by the entity that has the power. (Essentially, dealing no damage to one's pets and such.)
