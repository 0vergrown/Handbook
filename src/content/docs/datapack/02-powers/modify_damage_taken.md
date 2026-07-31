---
title: "Modify Damage Taken (Power Type)"
description: "Modifies how much damage the entity that has the power takes."
navigation_title: "Modify Damage Taken"
---

Modifies how much damage the entity that has the power takes.

Type ID: `apoli:modify_damage_taken`

> In the context of this power type, the '**actor**' entity is the entity that did the attacking whilst the '**target**' entity is the entity that has the power.

## Fields

| Field                    | Type                                     | Default    | Description                                                                                                                                                             |
|--------------------------|------------------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bientity_action`        | Bi-entity Action Type                    | _optional_ | If specified, this action will be executed on either or both the '**actor**' and '**target**' entities whenever the modifier(s) is/are applied.                         |
| `self_action`            | Entity Action Type                       | _optional_ | If specified, this action will be executed on the '**target**' entity whenever the modifier(s) is/are applied.                                                          |
| `attacker_action`        | Entity Action Type                       | _optional_ | If specified, this action will be executed on the '**actor**' entity whenever the modifier(s) is/are applied.                                                           |
| `bientity_condition`     | Bi-entity Condition Type                 | _optional_ | If specified, the specified action(s)/modifier(s) will only be executed/applied if this condition is fulfilled by either or both '**actor**' and '**target**' entities. |
| `apply_armor_condition`  | Entity Condition Type                    | _optional_ | If specified, armor will only be applied to the damage taken if this condition is fulfilled by the '**target**' entity.                                                 |
| `damage_armor_condition` | Entity Condition Type                    | _optional_ | If specified, worn armor will only be damaged if this condition is fulfilled by the '**target**' entity.                                                                |
| `damage_condition`       | Damage Condition Type                    | _optional_ | If specified, the specified modifiers(s) and/or action(s) will only apply if the taken damage fulfills this condition.                                                  |
| `modifier`               | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier)           | _optional_ | If specified, this modifier will be applied to the damage taken by the '**target**' entity.                                                                             |
| `modifiers`              | [Array](/docs/datapack/data-types/array) of Attribute Modifiers | _optional_ | If specified, these modifiers will be applied to the damage taken by the '**target**' entity.                                                                           |

## Examples

```json
{
    "type": "apoli:modify_damage_taken",
    "damage_condition": {
        "type": "apoli:attacker",
        "entity_condition": {
            "type": "apoli:equipped_item",
            "equipment_slot": "mainhand",
            "item_condition": {
                "type": "apoli:or",
                "conditions": [
                    {
                        "type": "apoli:enchantment",
                        "enchantment": "minecraft:binding_curse",
                        "comparison": ">=",
                        "compare_to": 1
                    },
                    {
                        "type": "apoli:enchantment",
                        "enchantment": "minecraft:vanishing_curse",
                        "comparison": ">=",
                        "compare_to": 1
                    }
                ]
            }
        }
    },
    "modifier": {
        "operation": "addition",
        "value": 5.5
    }
}
```
This example will make the entity that has the power take 2 and a half additional hearts of damage if the attacker is holding an item with either the Curse of Binding, or Curse of Vanishing enchantments.

```json
{
    "type": "apoli:modify_damage_taken",
    "bientity_condition": {
        "type": "apoli:actor_condition",
        "condition": {
            "type": "apoli:equipped_item",
            "equipment_slot": "mainhand",
            "item_condition": {
                "type": "apoli:or",
                "conditions": [
                    {
                        "type": "apoli:enchantment",
                        "enchantment": "minecraft:binding_curse",
                        "comparison": ">=",
                        "compare_to": 1
                    },
                    {
                        "type": "apoli:enchantment",
                        "enchantment": "minecraft:vanishing_curse",
                        "comparison": ">=",
                        "compare_to": 1
                    }
                ]
            }
        }
    },
    "modifier": {
        "operation": "addition",
        "value": 5.5
    }
}
```
This example is an updated version of the first example.
