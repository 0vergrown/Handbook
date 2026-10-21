---
title: "Modify Damage Taken (Power Type)"
description: "Changes how much damage the entity that has the power takes."
navigation_title: "Modify Damage Taken"
---

Changes how much damage the entity that has the power takes. The actor is the attacker, and the target is the entity with the power.

Type ID: `apoli:modify_damage_taken`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | If set, this action runs on the actor, the target or both whenever the modifiers are applied. |
| `self_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the target whenever the modifiers are applied. |
| `attacker_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the actor whenever the modifiers are applied. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the actions and modifiers only apply when the actor and target pass this condition. |
| `target_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, the actions and modifiers only apply when the target, the entity with the power, passes this condition. |
| `apply_armor_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, armor only reduces the damage while the target passes this condition. |
| `damage_armor_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, worn armor only takes damage while the target passes this condition. |
| `damage_condition` | [Damage Condition Type](/docs/datapack/damage-conditions) | _optional_ | If set, the modifiers and actions only apply when the damage taken passes this condition. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the damage the target takes. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the damage the target takes. |

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

The entity with the power takes 5.5 extra damage (almost 3 hearts) when the attacker holds an item with Curse of Binding or Curse of Vanishing.

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

This does the same, but checks the attacker with a bi-entity condition instead of a damage condition.
