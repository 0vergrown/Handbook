---
title: "Modify Damage Dealt (Power Type)"
description: "Changes how much melee damage the entity that has the power deals."
navigation_title: "Modify Damage Dealt"
---

Changes how much melee damage the entity that has the power deals. The actor is the entity with the power, and the target is the entity that was hit.

Type ID: `apoli:modify_damage_dealt`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | If set, this action runs on the actor, the target or both whenever the modifiers are applied. |
| `self_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the actor whenever the modifiers are applied. |
| `target_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the target whenever the modifiers are applied. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the actions and modifiers only apply when the actor and target pass this condition. |
| `target_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, the actions and modifiers only apply when the target passes this condition. |
| `damage_condition` | [Damage Condition Type](/docs/datapack/damage-conditions) | _optional_ | If set, the actions and modifiers only apply when the damage the actor deals passes this condition. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the damage the actor deals. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the damage the actor deals. |

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

This cancels the damage the entity deals to entities it owns, so it can't hurt its own pets.
